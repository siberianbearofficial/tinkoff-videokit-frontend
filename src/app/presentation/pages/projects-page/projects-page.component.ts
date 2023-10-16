import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, of, Subscription} from "rxjs";
import {ProjectsService} from "../../../core/usecases/interactors/projects.service";

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit, OnDestroy {
  private onInitSubscription!: Subscription;

  public error: string = '';

  public projectIds?: string[];

  constructor(private projectsService: ProjectsService) {
  }

  public ngOnInit(): void {
    this.onInitSubscription = this.projectsService.getProjectIds()
      .pipe(
        catchError((error: Error) => {
          this.showError(error);
          return of(false);
        })
      )
      .subscribe((projectIds: string[] | boolean) => {
        if (typeof projectIds != 'boolean') {
          this.projectIds = projectIds;
          this.hideError();
        }
      });
  }

  public showError(error: Error): void {
    this.error = error.message;
  }

  public hideError(): void {
    this.error = '';
  }

  public ngOnDestroy(): void {
    if (this.onInitSubscription)
      this.onInitSubscription.unsubscribe();
  }
}
