import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, concatMap, of, Subscription, timer} from "rxjs";
import {ProjectsService} from "../../../core/usecases/interactors/projects.service";
import {Project} from "../../../core/domain/entities/project";
import * as lodash from "lodash";
import * as moment from "moment";

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit, OnDestroy {
  private projectsPollingSubscription!: Subscription;

  public error: string = '';

  public projects?: Project[];
  public processedProjects?: Project[];
  public unprocessedProjects?: Project[];

  constructor(private projectsService: ProjectsService) {
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
    return project.status != 'DONE';
  }

  public setProjects(projects: Project[]): void {
    this.projects = projects;
    this.processedProjects = projects ? this.projects.filter(this.processedFilter).sort(this.comparator) : undefined;
    this.unprocessedProjects = projects ? this.projects.filter(this.unprocessedFilter).sort(this.comparator) : undefined;
  }

  private comparator(a: Project, b: Project): number {
    return moment(a.updatedAt).unix() - moment(b.updatedAt).unix();
  }

  public getProjectId(id: string): string {
    return `${id.slice(id.length - 3, id.length)}`;
  }

  public getProjectDate(updatedAt: string): string {
    const timeDate = moment(updatedAt).toDate();
    return `${timeDate.getDay()}.${timeDate.getMonth()}`;
  }

  public getProjectTime(updatedAt: string): string {
    const timeString = moment(updatedAt).toDate().toTimeString();
    return `${timeString.slice(0, timeString.indexOf(':', 3))}`;
  }

  public ngOnDestroy(): void {
    if (this.projectsPollingSubscription)
      this.projectsPollingSubscription.unsubscribe();
  }

  protected readonly moment = moment;
}
