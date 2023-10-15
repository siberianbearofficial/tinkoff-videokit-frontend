import {Component, OnDestroy, OnInit} from '@angular/core';
import {GenerateVideoService} from "../../../core/usecases/interactors/generate-video.service";
import {catchError, Observable, of, Subscription, switchMap} from "rxjs";
import {RedirectService} from "../../../infrastructure/adapters/services/redirect.service";
// import {signInPageUrl} from "../../../app-routing.module";
// import {AuthenticationService} from "../../../core/usecases/interactors/authentication.service";
import {Video} from "../../../core/domain/entities/video";


@Component({
  selector: 'app-generate-video-page',
  templateUrl: './generate-video-page.component.html',
  styleUrls: ['./generate-video-page.component.scss']
})
export class GenerateVideoPageComponent implements OnInit, OnDestroy {

  // private isSignedInSubscription!: Subscription;
  private generateVideoSubscription!: Subscription;

  // public step: number = 0;
  public error: string = '';

  // public videoUrl: string = '';

  // public rateStarSelected: number = 0;

  // public avatars = [
  //   {
  //     image_url: '/static/images/avatars/avatar1.png'
  //   },
  //   {
  //     image_url: '/static/images/avatars/avatar2.png'
  //   },
  //   {
  //     image_url: '/static/images/avatars/avatar3.png'
  //   },
  //   {
  //     image_url: '/static/images/avatars/avatar4.png'
  //   }
  // ];
  // public avatarIndex: number = 0;

  public images = [
    {
      image_url: 'src/assets/images/backgrounds/background1.jpg'
    },
    {
      image_url: 'src/assets/images/backgrounds/background2.jpg'
    },
    {
      image_url: 'src/assets/images/backgrounds/background3.jpg'
    }
  ];
  public imageIndex: number = 0;

  public avatarPositions: string[] = [
    'слева снизу',
    'в центре',
    'справа'
  ];
  public avatarPositionIndex: number = 1;

  constructor(private generateVideoService: GenerateVideoService,
              private redirectService: RedirectService,
              /*private authenticationService: AuthenticationService*/) {
  }

  public ngOnInit(): void {
    // this.isSignedInSubscription = this.authenticationService.isSignedIn()
    //   .pipe(
    //     catchError(() => {
    //       return of(false);
    //     }),
    //     switchMap((isSignedIn: boolean): Observable<boolean> => {
    //       return this.redirectService.redirectIf(!isSignedIn, signInPageUrl);
    //     })
    //   )
    //   .subscribe();
  }

  public showError(error: Error): void {
    this.error = error.message;
  }

  public onChangeAvatarPositionButtonClick(): void {
    this.avatarPositionIndex = (this.avatarPositionIndex == this.avatarPositions.length - 1) ? 0 : (this.avatarPositionIndex + 1);
  }

  // public onGenerateButtonClick(description: string) {
  //   this.generateVideoSubscription = this.generateVideoService.generateVideo(this.avatarIndex, this.alignmentIndex, description, this.backgroundIndex, this.musicBlob, this.avatarPositionIndex)
  //     .pipe(
  //       catchError((error) => {
  //         this.showError(error);
  //         return of(false);
  //       }),
  //       switchMap((status) => {
  //         if (status != false) {
  //           this.step = 1;
  //           this.videoUrl = (status as Video).videoUrl;
  //         }
  //         return of(status);
  //       })
  //     )
  //     .subscribe();
  // }

  // public setRateStarSelected(rateStarSelected: number) {
  //   this.rateStarSelected = rateStarSelected;
  // }

  public setImageIndex(imageIndex: number): void {
    this.imageIndex = imageIndex;
  }

  public ngOnDestroy() {
    // if (this.isSignedInSubscription)
    //   this.isSignedInSubscription.unsubscribe();
    if (this.generateVideoSubscription)
      this.generateVideoSubscription.unsubscribe();
  }
}
