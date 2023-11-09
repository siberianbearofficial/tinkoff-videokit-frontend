import {Component} from '@angular/core';
import {DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-code-enter-modal',
  templateUrl: './code-enter-modal.component.html',
  styleUrls: ['./code-enter-modal.component.scss']
})
export class CodeEnterModalComponent {
  constructor(public modalRef: DialogRef) {
  }

  public codeInput?: string;
}
