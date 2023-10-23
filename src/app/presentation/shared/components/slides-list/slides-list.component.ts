import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Slide} from "../../../../core/domain/entities/slide";

@Component({
  selector: 'app-slides-list',
  templateUrl: './slides-list.component.html',
  styleUrls: ['./slides-list.component.scss']
})
export class SlidesListComponent {
  @Input() slides: Slide[] = [];
  @Input() selectedIndex: number = 0;
  @Output() selectedIndexChange = new EventEmitter<number>();

  constructor() { }

  selectSlide(index: number): void {
    this.selectedIndex = index;
    this.selectedIndexChange.emit(index);
  }
}
