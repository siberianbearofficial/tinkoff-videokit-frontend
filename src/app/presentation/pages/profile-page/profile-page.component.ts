import {Component, OnDestroy, OnInit} from '@angular/core';
import {Dialog} from "@angular/cdk/dialog";
import {catchError, Observable, of, Subscription, switchMap} from "rxjs";
import {DeleteAccountModalComponent} from "../../shared/components/delete-account-modal/delete-account-modal.component";
import {AuthenticationService} from "../../../core/usecases/interactors/authentication.service";
import {UserService} from "../../../core/usecases/interactors/user.service";
import {RedirectService} from "../../../infrastructure/adapters/services/redirect.service";
import {signInPageUrl} from "../../../app-routing.module";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  public error: string = '';
  public success: string = '';
  public admin: boolean = false;
  public disabled: boolean = true;

  private isSignedInSubscription!: Subscription;
  private deleteCurrentUserSubscription!: Subscription;
  private signOutSubscription!: Subscription;
  private modalRefOnCloseSubscription!: Subscription;

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private redirectService: RedirectService,
              private modalService: Dialog) {
  }

  public ngOnInit(): void {
    this.isSignedInSubscription = this.authenticationService.isSignedIn()
      .pipe(
        catchError(() => {
          this.disabled = false;
          return of(false);
        }),
        switchMap((isSignedIn: boolean): Observable<boolean> => {
          return this.redirectService.redirectIf(!isSignedIn, signInPageUrl);
        }),
        switchMap((redirectedToSignIn: boolean): Observable<boolean> => {
          if (!redirectedToSignIn)
            return this.authenticationService.isAdmin();
          return of(false);
        })
      )
      .subscribe((isAdmin: boolean): void => {
        this.admin = isAdmin;
        this.disabled = false;
      });
  }

  public openModal(): void {
    if (!this.disabled) {
      this.modalRefOnCloseSubscription = this.modalService.open(DeleteAccountModalComponent).closed
        .subscribe(
          (data): void => {
            if (data)
              this.onSubmit();
          }
        );
    }
  }

  public onSubmit(): void {
    this.disabled = true;
    this.deleteCurrentUserSubscription = this.authenticationService.getUuid()
      .pipe(
        catchError((error) => {
          this.disabled = false;
          this.showError(error);
          return of(false);
        }),
        switchMap((uuid) => {
          if (typeof uuid != 'boolean')
            return this.userService.deleteUserByUuid(uuid);
          return of(false);
        }),
        catchError((error) => {
          this.disabled = false;
          this.showError(error);
          return of(false);
        }),
        switchMap((status) => {
          if (status != false)
            return this.authenticationService.signOut();
          return of(false);
        }),
        switchMap((status) => {
          if (status != false) {
            this.hideError();
            this.showSuccess();
            return this.redirectService.redirectAfterTimeout(3000, signInPageUrl);
          }
          return of(false);
        })
      )
      .subscribe();
  }

  public onSignOutClick(): void {
    if (!this.disabled) {
      this.disabled = true;
      this.signOutSubscription = this.authenticationService.signOut()
        .pipe(
          catchError((error) => {
            this.disabled = false;
            this.showError(error);
            return of(false);
          }),
          switchMap((status) => {
            return this.redirectService.redirectIf(status != false, signInPageUrl);
          })
        )
        .subscribe();
    }
  }

  private showError(error: Error): void {
    this.error = error.message;
  }

  private hideError(): void {
    this.error = '';
  }

  private showSuccess(): void {
    this.success = 'Аккаунт успешно удален';
  }

  public ngOnDestroy(): void {
    if (this.isSignedInSubscription)
      this.isSignedInSubscription.unsubscribe();
    if (this.deleteCurrentUserSubscription)
      this.deleteCurrentUserSubscription.unsubscribe();
    if (this.signOutSubscription)
      this.signOutSubscription.unsubscribe();
    if (this.modalRefOnCloseSubscription)
      this.modalRefOnCloseSubscription.unsubscribe();
  }
}
