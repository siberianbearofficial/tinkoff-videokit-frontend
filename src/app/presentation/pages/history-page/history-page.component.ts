import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, Observable, of, Subscription, switchMap} from "rxjs";
import {RedirectService} from "../../../infrastructure/adapters/services/redirect.service";
import {AuthenticationService} from "../../../core/usecases/interactors/authentication.service";
import {ProjectsService} from "../../../core/usecases/interactors/projects.service";
import {signInPageUrl} from "../../../app-routing.module";
import {Project} from "../../../core/domain/entities/project";

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  private onInitApiCallsSubscription!: Subscription;
  private onVideoDeleteSubscription!: Subscription;

  public videos?: Project[];
  public error: string = '';

  constructor(private redirectService: RedirectService,
              private authenticationService: AuthenticationService,
              private generateVideoService: ProjectsService) {
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
        // switchMap((isRedirectedToSignIn: boolean) => {
        //   if (!isRedirectedToSignIn)
        //     return this.generateVideoService.getVideos();
        //   return of(false);
        // }),
        catchError((error) => {
          this.showError(error);
          return of(false);
        }),
      )
      .subscribe((result): void => {
        // if (typeof result != 'boolean') {
        //   this.videos = result;
        //   this.hideError();
        // }
      });
  }

  public onVideoDelete(video: Project): void {
    // this.onVideoDeleteSubscription = this.generateVideoService.deleteVideo(video)
    //   .pipe(
    //     catchError((error) => {
    //       this.showError(error);
    //       return of(false);
    //     }),
    //     switchMap((result) => {
    //       if (result != false)
    //         return this.generateVideoService.getVideos();
    //       return of(false);
    //     }),
    //     catchError((error) => {
    //       this.showError(error);
    //       return of(false);
    //     })
    //   )
    //   .subscribe((result) => {
    //     if (typeof result != 'boolean') {
    //       this.videos = result;
    //       this.hideError();
    //     }
    //   });
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
    if (this.onVideoDeleteSubscription)
      this.onVideoDeleteSubscription.unsubscribe();
  }
}
