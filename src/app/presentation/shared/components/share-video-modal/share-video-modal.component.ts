import {Component} from '@angular/core';
import {DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-share-video-modal',
  templateUrl: './share-video-modal.component.html',
  styleUrls: ['./share-video-modal.component.scss']
})
export class ShareVideoModalComponent {
  public rateStarSelected: number = 0;

  constructor(public modalRef: DialogRef) {
  }

  public setRateStarSelected(selected: number): void {
    this.rateStarSelected = selected;
  }
}
