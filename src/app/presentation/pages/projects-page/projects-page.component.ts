import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, concatMap, of, Subscription, switchMap, timer} from "rxjs";
import {ProjectsService} from "../../../core/usecases/interactors/projects.service";
import {Project} from "../../../core/domain/entities/project";
import * as lodash from "lodash";
import * as moment from "moment";
import {CodeEnterModalComponent} from "../../shared/components/code-enter-modal/code-enter-modal.component";
import {Dialog} from "@angular/cdk/dialog";

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit, OnDestroy {
  private projectsPollingSubscription!: Subscription;
  private deleteVideoSubscription!: Subscription;

  public error: string = '';

  public projects?: Project[];
  public processedProjects?: Project[];
  public unprocessedProjects?: Project[];

  constructor(private projectsService: ProjectsService,
              private modalService: Dialog) {
  }

  public ngOnInit(): void {
    this.projectsPollingSubscription = timer(0, 1000)
      .pipe(
        concatMap(_ => this.projectsService.getProjects()),
        catchError((error: Error) => {
          this.showError(error);
          return of(false);
        })
      )
      .subscribe((projects: Project[] | boolean): void => {
        if (typeof projects != 'boolean') {
          if (!this.projects || (this.projects && !this.projectsEquals(this.projects, projects)))
            this.setProjects(projects);
          this.hideError();
        }
      });
  }

  public projectEquals(project1: Project, project2: Project): boolean {
    return lodash.isEqual(project1, project2);
  }

  public projectsEquals(projects1: Project[], projects2: Project[]): boolean {
    if (projects1.length != projects2.length)
      return false;
    for (let i: number = 0; i < projects1.length; i++)
      if (!this.projectEquals(projects1[i], projects2[i]))
        return false;
    return true;
  }

  public showError(error: Error): void {
    this.error = error.message;
  }

  public hideError(): void {
    this.error = '';
  }

  private processedFilter(project: Project): boolean {
    return project.status == 'DONE';
  }

  private unprocessedFilter(project: Project): boolean {
    return project.status != 'DONE' && project.status != 'ERROR';
  }

  public setProjects(projects: Project[]): void {
    this.projects = projects;
    this.processedProjects = projects ? this.projects.filter(this.processedFilter).sort(this.comparator) : undefined;
    this.unprocessedProjects = projects ? this.projects.filter(this.unprocessedFilter).sort(this.comparator) : undefined;
  }

  private comparator(a: Project, b: Project): number {
    return moment(b.updatedAt).unix() - moment(a.updatedAt).unix();
  }

  public getProjectId(id: string): string {
    return `${id.slice(id.length - 3, id.length)}`;
  }

  public getProjectDate(updatedAt: string): string {
    const timeDate = moment(updatedAt).toDate();
    timeDate.setUTCHours(timeDate.getUTCHours() + 3);
    return `${timeDate.getDate()} ${this.getMonth(timeDate.getMonth())}`;
  }

  private getMonth(month: number): string {
    const months: string[] = ['Янв', 'Фев', 'Мар', 'Апр', 'Мая', 'Июня', 'Июля', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
    return months[month];
  }

  public getProjectTime(updatedAt: string): string {
    const moscowTime = moment(updatedAt).toDate();
    moscowTime.setUTCHours(moscowTime.getUTCHours() + 3);
    const timeString = moscowTime.toTimeString();
    return `${timeString.slice(0, timeString.indexOf(':', 3))}`;
  }

  public onDeleteButtonClick(project: Project): void {
    this.deleteVideoSubscription = this.modalService.open(CodeEnterModalComponent, {
      panelClass: 'modal-container',
      width: "40%"
    }).closed
      .pipe(
        switchMap((code) => {
          if (code && project)
            return this.projectsService.deleteProject(project, code as string);
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

  public ngOnDestroy(): void {
    if (this.projectsPollingSubscription)
      this.projectsPollingSubscription.unsubscribe();
    if (this.deleteVideoSubscription)
      this.deleteVideoSubscription.unsubscribe();
  }

  protected readonly moment = moment;
}
