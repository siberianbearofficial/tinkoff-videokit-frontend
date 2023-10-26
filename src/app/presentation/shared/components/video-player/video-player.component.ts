import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styles: [``]
})
export class VideoPlayerComponent {
  @Input() posterUrl?: string;
  @Input() videoUrl?: string;
  @Input() width?: string;
}
