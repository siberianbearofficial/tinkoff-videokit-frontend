import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectsService} from "../../../core/usecases/interactors/projects.service";
import {catchError, Observable, of, Subscription, switchMap} from "rxjs";
// import {signInPageUrl} from "../../../app-routing.module";
// import {AuthenticationService} from "../../../core/usecases/interactors/authentication.service";
import {Project} from "../../../core/domain/entities/project";
import {RedirectService} from "../../../infrastructure/adapters/services/redirect.service";
import {Dialog} from "@angular/cdk/dialog";
import {VideoModalComponent} from "../../shared/components/video-modal/video-modal.component";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ShareVideoModalComponent} from "../../shared/components/share-video-modal/share-video-modal.component";
import {Point} from "@angular/cdk/drag-drop";


@Component({
  selector: 'app-generate-video-page',
  templateUrl: './generate-video-page.component.html',
  styleUrls: ['./generate-video-page.component.scss']
})
export class GenerateVideoPageComponent implements OnInit, OnDestroy {

  // private isSignedInSubscription!: Subscription;
  private getProjectSubscription!: Subscription;
  private updateProjectSubscription!: Subscription;
  private videoModalOnCloseSubscription!: Subscription;
  private shareVideoModalOnCloseSubscription!: Subscription;

  public error: string = '';

  public project?: Project;

  public avatarTypes: string[] = [
    'слева снизу',
    'в центре',
    'справа'
  ];

  public selectedBackground: number = 0;

  public currentSlideIndex: number = 0;

  constructor(private projectsService: ProjectsService,
              private redirectService: RedirectService,
              private modalService: Dialog,
              private route: ActivatedRoute
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
    this.getProjectSubscription = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const id: string | null = params.get('id');
          if (id)
            return this.projectsService.getProject(id);
          throw new Error('Необходимо передать ID проекта');
        }),
        catchError((error: Error) => {
          this.showError(error);
          return of(false);
        })
      )
      .subscribe((project: Project | boolean): void => {
        if (typeof project != 'boolean') {
          this.project = project;
          this.hideError();
        }
      })
  }

  public onGenerateButtonClick() {
    if (this.project) {
      this.updateProjectSubscription = this.projectsService.updateProject(this.project)
        .pipe(
          catchError((error: Error) => {
            this.showError(error);
            return of(false);
          }),
          // switchMap((result: boolean | void) => {
          //   return this.redirectService.redirectIf(typeof result != 'boolean', '/projects');
          // }),
          // catchError((error: Error) => {
          //   this.showError(error);
          //   return of(false);
          // })
        )
        .subscribe((result: boolean | void): void => {
          if (typeof result != 'boolean')
            this.hideError();
        });
    }
  }

  public onPlayButtonClick(): void {
    if (this.project) {
      this.videoModalOnCloseSubscription = this.modalService.open(VideoModalComponent, {
        panelClass: 'modal-container',
        width: "70%",
        data: {
          'video_url': this.project.processedVideo
        }
      }).closed.subscribe();
    }
  }

  public onQrButtonClick(): void {
    if (this.project) {
      this.shareVideoModalOnCloseSubscription = this.modalService.open(ShareVideoModalComponent, {
        panelClass: 'modal-container',
        width: "40%",
        data: {
          'video_url': this.project.processedVideo
        }
      }).closed.subscribe();
    }
  }

  public onChangeAvatarPositionButtonClick(): void {
    if (this.project && this.project.slides) {
      if (this.project.slides[this.currentSlideIndex].avatarType < this.avatarTypes.length - 1)
        this.project.slides[this.currentSlideIndex].avatarType++;
      else
        this.project.slides[this.currentSlideIndex].avatarType = 0;
    }
  }

  public onAvatarPositionChange(position: Point): void {
    if (this.project && this.project.slides)
      this.project.slides[this.currentSlideIndex].avatarPosition = position;
  }

  public getBackgroundUrlIndex(): number {
      return this.project ? this.project.mjImages.findIndex((el: string): boolean => el === this.project?.slides[this.currentSlideIndex].background) : 0;
  }

  public onBackgroundImageChange(index: number): void {
    if (this.project)
      this.project.slides[this.currentSlideIndex].background = this.project.mjImages[index];
  }

  public showError(error: Error): void {
    this.error = error.message;
  }

  public hideError(): void {
    this.error = '';
  }

  public ngOnDestroy() {
    // if (this.isSignedInSubscription)
    //   this.isSignedInSubscription.unsubscribe();
    if (this.getProjectSubscription)
      this.getProjectSubscription.unsubscribe();
    if (this.updateProjectSubscription)
      this.updateProjectSubscription.unsubscribe();
    if (this.videoModalOnCloseSubscription)
      this.videoModalOnCloseSubscription.unsubscribe();
    if (this.shareVideoModalOnCloseSubscription)
      this.shareVideoModalOnCloseSubscription.unsubscribe();
  }
}
