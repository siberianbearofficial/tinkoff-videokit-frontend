import {Component, OnDestroy, OnInit} from '@angular/core';
import {GenerateVideoService} from "../../../core/usecases/interactors/generate-video.service";
import {catchError, Observable, of, Subscription, switchMap} from "rxjs";
import {RedirectService} from "../../../infrastructure/adapters/services/redirect.service";
import {signInPageUrl} from "../../../app-routing.module";
import {AuthenticationService} from "../../../core/usecases/interactors/authentication.service";
import {Video} from "../../../core/domain/entities/video";


@Component({
  selector: 'app-generate-video-page',
  templateUrl: './generate-video-page.component.html',
  styleUrls: ['./generate-video-page.component.scss']
})
export class GenerateVideoPageComponent implements OnInit, OnDestroy {

  private isSignedInSubscription!: Subscription;
  private generateVideoSubscription!: Subscription;

  public step: number = 0;
  public error: string = '';

  public videoUrl: string = '';

  public rateStarSelected: number = 0;

  public avatars = [
    {
      image_url: '/static/images/avatars/avatar1.png'
    },
    {
      image_url: '/static/images/avatars/avatar2.png'
    },
    {
      image_url: '/static/images/avatars/avatar3.png'
    },
    {
      image_url: '/static/images/avatars/avatar4.png'
    }
  ];
  public avatarIndex: number = 0;

  public backgrounds = [
    {
      image_url: '/static/images/backgrounds/background1.jpg'
    },
    {
      image_url: '/static/images/backgrounds/background2.jpg'
    },
    {
      image_url: '/static/images/backgrounds/background3.jpg'
    }
  ];
  public backgroundIndex: number = 0;

  public voices: string[] = [
    'бодрый',
    'нейтральный',
    'спокойный',
    'уверенный'
  ];
  public voiceIndex: number = 0;

  public musicBlob?: Blob;
  public chooseMusic: string = 'Выберите аудио-файл';

  public alignmentIndex: number = 1;

  constructor(private generateVideoService: GenerateVideoService,
              private redirectService: RedirectService,
              private authenticationService: AuthenticationService) {
  }

  public ngOnInit(): void {
    this.isSignedInSubscription = this.authenticationService.isSignedIn()
      .pipe(
        catchError(() => {
          return of(false);
        }),
        switchMap((isSignedIn: boolean): Observable<boolean> => {
          return this.redirectService.redirectIf(!isSignedIn, signInPageUrl);
        })
      )
      .subscribe();
  }

  public showError(error: Error) {
    this.error = error.message;
  }

  public onChangeVoiceButtonClick() {
    this.voiceIndex = (this.voiceIndex == this.voices.length - 1) ? 0 : (this.voiceIndex + 1);
  }

  public onGenerateButtonClick(description: string) {
    this.generateVideoSubscription = this.generateVideoService.generateVideo(this.avatarIndex, this.alignmentIndex, description, this.backgroundIndex, this.musicBlob, this.voiceIndex)
      .pipe(
        catchError((error) => {
          this.showError(error);
          return of(false);
        }),
        switchMap((status) => {
          if (status != false) {
            this.step = 1;
            this.videoUrl = (status as Video).videoUrl;
          }
          return of(status);
        })
      )
      .subscribe();
  }

  public onRephraseButtonClick(description: string) {

  }

  public onTranslateButtonClick(description: string) {

  }

  public onAlignButtonClick(alignmentIndex: number) {
    this.alignmentIndex = alignmentIndex;
  }

  public onMusicChange(event: Event): void {
    if (event.target) {
      let target = (event.target as HTMLInputElement).files;
      if (target) {
        this.musicBlob = target[0];
        this.chooseMusic = target[0].name;
      }
    }
  }

  public setRateStarSelected(rateStarSelected: number) {
    this.rateStarSelected = rateStarSelected;
  }

  public setAvatarIndex(avatarIndex: number) {
    this.avatarIndex = avatarIndex;
  }

  public setBackgroundIndex(backgroundIndex: number) {
    this.backgroundIndex = backgroundIndex;
  }

  public ngOnDestroy() {
    if (this.isSignedInSubscription)
      this.isSignedInSubscription.unsubscribe();
    if (this.generateVideoSubscription)
      this.generateVideoSubscription.unsubscribe();
  }
}
