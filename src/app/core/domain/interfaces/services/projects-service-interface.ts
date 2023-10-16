import {Observable} from "rxjs";
import {Project} from "../../entities/project";

export interface ProjectsServiceInterface {
  getProjectIds: () => Observable<string[]>;
  getProject: (id: string) => Observable<Project>;
  updateProject: (project: Project) => Observable<void>;
  deleteProject: (project: Project) => Observable<void>;
}
