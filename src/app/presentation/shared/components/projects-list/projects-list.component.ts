import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Project} from "../../../../core/domain/entities/project";

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent {
  @Input() projects?: Project[];
  @Output() projectDeletionEvent: EventEmitter<Project> = new EventEmitter<Project>();

  public onDeleteClick(project: Project): void {
    this.projectDeletionEvent.emit(project);
  }
}
