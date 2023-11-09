import {Observable} from "rxjs";
import {Project} from "../../entities/project";

export interface ProjectsServiceInterface {
  getProjects: () => Observable<Project[]>;
  getProject: (id: string) => Observable<Project>;
  updateProject: (project: Project) => Observable<void>;
  deleteProject: (project: Project, code: string) => Observable<void>;
}
