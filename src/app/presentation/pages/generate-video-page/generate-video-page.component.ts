import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectsService} from "../../../core/usecases/interactors/projects.service";
import {catchError, concatMap, of, Subscription, switchMap, timer} from "rxjs";
// import {signInPageUrl} from "../../../app-routing.module";
// import {AuthenticationService} from "../../../core/usecases/interactors/authentication.service";
import {Project} from "../../../core/domain/entities/project";
// import {RedirectService} from "../../../infrastructure/adapters/services/redirect.service";
import {Dialog} from "@angular/cdk/dialog";
import {VideoModalComponent} from "../../shared/components/video-modal/video-modal.component";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ShareVideoModalComponent} from "../../shared/components/share-video-modal/share-video-modal.component";
import {Point} from "@angular/cdk/drag-drop";
import {Slide} from "../../../core/domain/entities/slide";


const EPS: number = 0.001;

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
  private projectPollingSubscription!: Subscription;

  public error: string = '';

  public project?: Project;
  public notEditedProject?: Project;

  public currentSlideIndex: number = 0;

  public editingDisabled: boolean = true;

  constructor(private projectsService: ProjectsService,
              // private redirectService: RedirectService,
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
          this.notEditedProject = this.copyProject(project);
          this.hideError();
          this.editingDisabled = false;

          if (!this.project.processed)
            this.startProjectPolling(project);
        }
      })
  }

  private startProjectPolling(project: Project): void {
    this.editingDisabled = true;
    this.projectPollingSubscription = timer(0, 1000)
      .pipe(
        concatMap(_ => this.projectsService.getProject(project.id)),
        catchError((error: Error) => {
          this.showError(error);
          return of(false);
        })
      )
      .subscribe((project: Project | boolean): void => {
        if (typeof project != 'boolean') {
          if (!this.project || (this.project && !this.projectEquals(this.project, project))) {
            this.project = project;
            this.notEditedProject = this.copyProject(project);
          }

          this.hideError();

          if (project.processed) {
            this.projectPollingSubscription.unsubscribe();
            this.editingDisabled = false;
          }
        }
      });
  }

  public onGenerateButtonClick(): void {
    if (this.project) {
      this.editingDisabled = true;
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
          if (typeof result != 'boolean') {
            this.hideError();
            if (this.project)
              this.startProjectPolling(this.project);
          }
        });
    }
  }

  public onRollbackButtonClick(): void {
    if (this.project && this.notEditedProject) {
      this.project = this.copyProject(this.notEditedProject);
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

  public pointEquals(point1: Point, point2: Point): boolean {
    return (point1.x - point2.x < EPS) && (point1.y - point2.y < EPS);
  }

  public slideEquals(slide1: Slide, slide2: Slide): boolean {
    if (!this.pointEquals(slide1.avatarPosition, slide2.avatarPosition))
      return false;
    if (slide1.backgroundImage != slide2.backgroundImage)
      return false;
    if (slide1.durationMs - slide2.durationMs >= EPS)
      return false;
    if (slide1.avatarScale - slide2.avatarScale >= EPS)
      return false;
    if (slide1.createdAt != slide2.createdAt)
      return false;
    if (slide1.updatedAt != slide2.updatedAt)
      return false;
    if (slide1.text != slide2.text)
      return false;
    if (slide1.avatarType != slide2.avatarType)
      return false;
    return true;
  }

  public projectEquals(project1: Project, project2: Project): boolean {
    if (project1.id != project2.id)
      return false;
    if (project1.slides.length != project2.slides.length)
      return false;
    for (let i: number = 0; i < project1.slides.length; i++)
      if (!this.slideEquals(project1.slides[i], project2.slides[i]))
        return false;
    if (project1.processed != project2.processed)
      return false;
    if (project1.processedVideo != project2.processedVideo)
      return false;
    if (project1.updatedAt != project2.updatedAt)
      return false;
    if (project1.createdAt != project2.createdAt)
      return false;
    if (project1.gptScenario != project2.gptScenario)
      return false;
    if (project1.mjImages.length != project2.mjImages.length)
      return false;
    for (let i: number = 0; i < project1.mjImages.length; i++)
      if (project1.mjImages[i] != project2.mjImages[i])
        return false;
    if (project1.userPrompt != project2.userPrompt)
      return false;
    if (project1.userId != project2.userId)
      return false;
    return true;
  }

  public copySlide(slide: Slide): Slide {
    return {
      avatarPosition: {
        x: slide.avatarPosition.x,
        y: slide.avatarPosition.y
      },
      backgroundImage: slide.backgroundImage,
      durationMs: slide.durationMs,
      avatarScale: slide.avatarScale,
      createdAt: slide.createdAt,
      updatedAt: slide.updatedAt,
      text: slide.text,
      avatarType: slide.avatarType
    };
  }

  public copyProject(project: Project): Project {
    let slides: Slide[] = [];
    project.slides.forEach((slide: Slide) => {
      slides.push(this.copySlide(slide));
    });
    let mjImages: string[] = [];
    project.mjImages.forEach((mjImage: string) => {
      mjImages.push(mjImage);
    });
    return {
      id: project.id,
      processed: project.processed,
      processedVideo: project.processedVideo,
      updatedAt: project.updatedAt,
      createdAt: project.createdAt,
      gptScenario: project.gptScenario,
      userPrompt: project.userPrompt,
      userId: project.userId,
      slides: slides,
      mjImages: mjImages
    };
  }

  public onAvatarPositionChange(position: Point): void {
    if (this.project && this.project.slides)
      this.project.slides[this.currentSlideIndex].avatarPosition = position;
  }

  public getBackgroundUrlIndex(): number {
    return this.project ? this.project.mjImages.findIndex((el: string): boolean => el === this.project?.slides[this.currentSlideIndex].backgroundImage) : 0;
  }

  public onBackgroundImageChange(index: number): void {
    if (this.project)
      this.project.slides[this.currentSlideIndex].backgroundImage = this.project.mjImages[index];
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
    if (this.projectPollingSubscription)
      this.projectPollingSubscription.unsubscribe();
  }
}
