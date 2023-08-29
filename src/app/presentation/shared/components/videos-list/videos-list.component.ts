import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Video} from "../../../../core/domain/entities/video";

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.scss']
})
export class VideosListComponent {
  @Input() videos?: Video[];
  @Output() videoDeletionEvent: EventEmitter<Video> = new EventEmitter<Video>();

  public onDeleteClick(video: Video): void {
    this.videoDeletionEvent.emit(video);
  }
}
