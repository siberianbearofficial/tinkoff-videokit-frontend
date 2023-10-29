import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, concatMap, of, Subscription, timer} from "rxjs";
import {ProjectsService} from "../../../core/usecases/interactors/projects.service";
import {Project} from "../../../core/domain/entities/project";
import {Point} from "@angular/cdk/drag-drop";
import {Slide} from "../../../core/domain/entities/slide";

const EPS: number = 0.001;

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
