import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, concatMap, of, Subscription, timer} from "rxjs";
import {ProjectsService} from "../../../core/usecases/interactors/projects.service";
import {Project} from "../../../core/domain/entities/project";
import * as lodash from "lodash";

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit, OnDestroy {
  private projectsPollingSubscription!: Subscription;

  public error: string = '';

  public projects?: Project[];

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
            this.projects = projects;
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

  public ngOnDestroy(): void {
    if (this.projectsPollingSubscription)
      this.projectsPollingSubscription.unsubscribe();
  }
}
