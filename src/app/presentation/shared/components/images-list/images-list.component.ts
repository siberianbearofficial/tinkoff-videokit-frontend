import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss']
})
export class ImagesListComponent {
  @Input() mediaUrls: string[] = []; // тут список ссылок на медиафайлы
  @Input() selectedIndex: number = 0; // индекс выбранного фона

  @Output() selectedImageIndexChange: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  selectImage(index: number): void {
    this.selectedIndex = index; // обновление выбранного фона
    this.selectedImageIndexChange.emit(index); // создаем событие выбранного фона
  }
}
