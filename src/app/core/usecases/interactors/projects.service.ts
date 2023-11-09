import {Injectable} from '@angular/core';
import {ProjectsServiceInterface} from "../../domain/interfaces/services/projects-service-interface";
import {Observable, of} from "rxjs";
import {ProjectsAdapterService} from "../../../infrastructure/adapters/services/projects-adapter.service";
import {Project} from "../../domain/entities/project";


@Injectable({
  providedIn: 'root'
})
export class ProjectsService implements ProjectsServiceInterface {

  constructor(private projectsAdapter: ProjectsAdapterService) {
  }

  public getProjects(): Observable<Project[]> {
    return this.projectsAdapter.getProjects();
  }

  public getProject(id: string): Observable<Project> {
    return this.projectsAdapter.getProject(id);
  }

  public updateProject(project: Project): Observable<void> {
    return this.projectsAdapter.updateProject(project);
  }

  public deleteProject(project: Project, code: string): Observable<void> {
    return project.id ? this.projectsAdapter.deleteProjectById(project.id, code) : of(void 0);
  }
}
