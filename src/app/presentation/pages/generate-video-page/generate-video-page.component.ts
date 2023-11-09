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
import * as lodash from "lodash";
import {Rectangle} from "../../../core/domain/entities/rectangle";
import {CodeEnterModalComponent} from "../../shared/components/code-enter-modal/code-enter-modal.component";

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
  private deleteVideoSubscription!: Subscription;

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

          if (this.project.status != 'DONE')
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

          if (project.status == 'DONE') {
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
            if (this.project) {
              this.project.status = 'CREATED';
              this.startProjectPolling(this.project);
            }
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
          'video_url': this.project.videoPath
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
          'video_url': this.project.videoLink
        }
      }).closed.subscribe();
    }
  }

  public onDeleteButtonClick(): void {
    if (this.project) {
      this.deleteVideoSubscription = this.modalService.open(CodeEnterModalComponent, {
        panelClass: 'modal-container',
        width: "40%"
      }).closed
        .pipe(
          switchMap((code) => {
            if (code && this.project)
              return this.projectsService.deleteProject(this.project, code as string);
            return of(void 0);
          }),
          catchError((error: Error) => {
            this.showError(error);
            return of(false);
          })
        )
        .subscribe((result: boolean | void): void => {
          if (typeof result != 'boolean')
            this.hideError();
        });
    }
  }

  public deepCopy(obj: any) {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    let copy: any = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
      if (obj[key] && typeof obj[key] === 'object') {
        copy[key] = this.deepCopy(obj[key]);
      } else {
        copy[key] = obj[key];
      }
    }

    return copy;
  }

  public projectEquals(project1: Project, project2: Project): boolean {
    return lodash.isEqual(project1, project2);
  }

  public copyProject(project: Project): Project {
    return this.deepCopy(project) as Project;
  }

  public onAvatarRectangleChange(rectangle: Rectangle): void {
    if (this.project && this.project.slides)
      this.project.slides[this.currentSlideIndex].avatarPosition = rectangle.topLeftPoint;
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
    if (this.deleteVideoSubscription)
      this.deleteVideoSubscription.unsubscribe();
  }
}
