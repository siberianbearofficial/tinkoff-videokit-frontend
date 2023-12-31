import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../core/domain/entities/user";
import {catchError, Observable, of, Subscription, switchMap} from "rxjs";
import {RedirectService} from "../../../infrastructure/adapters/services/redirect.service";
import {AuthenticationService} from "../../../core/usecases/interactors/authentication.service";
import {UserService} from "../../../core/usecases/interactors/user.service";
import {signInPageUrl} from "../../../app-routing.module";
import {DeleteUserModalComponent} from "../../shared/components/delete-user-modal/delete-user-modal.component";
import {Dialog} from "@angular/cdk/dialog";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit, OnDestroy {
  private onInitApiCallsSubscription!: Subscription;
  private onUserDeleteSubscription!: Subscription;
  private changeUserSubscription!: Subscription;

  public users?: User[];
  public disabledUsersUuids?: string[];
  public error: string = '';

  constructor(private redirectService: RedirectService,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private modalService: Dialog) {
  }

  public ngOnInit(): void {
    this.onInitApiCallsSubscription = this.authenticationService.isSignedIn()
      .pipe(
        catchError(() => {
          return of(false);
        }),
        switchMap((isSignedIn: boolean): Observable<boolean> => {
          return this.redirectService.redirectIf(!isSignedIn, signInPageUrl);
        }),
        switchMap((isRedirectedToSignIn: boolean): Observable<boolean> => {
          if (!isRedirectedToSignIn)
            return this.authenticationService.isAdmin();
          return of(false);
        }),
        switchMap((isAdmin: boolean) => {
          if (isAdmin)
            return this.userService.getUsers();
          return this.redirectService.redirect('');
        }),
        catchError((error) => {
          this.showError(error);
          return of(false);
        }),
        switchMap((result: boolean | User[]) => {
          if (typeof result != 'boolean') {
            this.users = result;
            return this.authenticationService.getUuid();
          }
          return of(false);
        })
      )
      .subscribe((result): void => {
        if (typeof result != 'boolean') {
          this.disabledUsersUuids = [result];
          this.hideError();
        }
      });
  }

  public onUserDelete(user: User): void {
    this.onUserDeleteSubscription = this.modalService.open(DeleteUserModalComponent).closed
      .pipe(
        switchMap((data) => {
          if (data)
            return this.userService.deleteUser(user);
          return of(false);
        }),
        catchError((error) => {
          this.showError(error);
          return of(false);
        }),
        switchMap((result) => {
          if (result != false)
            return this.userService.getUsers();
          return of(false);
        }),
        catchError((error) => {
          this.showError(error);
          return of(false);
        })
      )
      .subscribe((result): void => {
        if (typeof result != 'boolean') {
          this.users = result;
          this.hideError();
        }
      });
  }

  public onUserChange(user: User): void {
    this.changeUserSubscription = this.userService.updateUser(user)
      .pipe(
        catchError((error) => {
          this.showError(error);
          return of(false);
        }),
        switchMap((result) => {
          if (result != false)
            return this.userService.getUsers();
          return of(false);
        }),
        catchError((error) => {
          this.showError(error);
          return of(false);
        })
      )
      .subscribe((result): void => {
        if (typeof result != 'boolean') {
          this.users = result;
          this.hideError();
        }
      });
  }

  private showError(error: Error): void {
    this.error = error.message;
  }

  private hideError(): void {
    this.error = '';
  }

  public ngOnDestroy(): void {
    if (this.onInitApiCallsSubscription)
      this.onInitApiCallsSubscription.unsubscribe();
    if (this.onUserDeleteSubscription)
      this.onUserDeleteSubscription.unsubscribe();
    if (this.changeUserSubscription)
      this.changeUserSubscription.unsubscribe();
  }
}
