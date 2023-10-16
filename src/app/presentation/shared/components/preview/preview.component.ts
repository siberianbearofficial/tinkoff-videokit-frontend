import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren
} from '@angular/core';
import {CoordinatesService} from "../../../../infrastructure/adapters/services/coordinates.service";
import {Point} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() avatarImage: string = '';
  @Input() backgroundImage: string = '';

  @ViewChildren('imageContainer', {read: ElementRef}) imageContainerQueryList?: QueryList<ElementRef>;

  public relativeAvatarRectangle?: {
    topLeftPoint: Point;
    bottomRightPoint: Point;
  };
  public initialAvatarRectangle?: {
    topLeftPoint: Point;
    bottomRightPoint: Point;
  };

  public avatarRectangle?: {
    topLeftPoint: Point;
    bottomRightPoint: Point;
  }

  private imageOriginalWidth?: number;

  private image?: HTMLImageElement;
  private avatar?: HTMLImageElement;

  constructor(private renderer: Renderer2,
              private coordinates: CoordinatesService) {
  }

  public ngOnInit(): void {
    this.calculateRelativeAvatarRectangle();
    this.image = new Image();  // Создается элемент изображения, который будет растягиваться как потребуется в разных ситуациях
    this.image.src = this.backgroundImage;  // TODO поставить то, что было передано в компонент
    // Здесь на фон изображение устанавливается (для простоты),
    // но вообще говоря нужно будет предоставить возможность установить и видео (к концу месяца)

    this.avatar = new Image();
    this.avatar.src = this.avatarImage;
  }

  public ngAfterViewInit(): void {
    // Здесь происходит растягивание фонового изображения на всю ширину и настройка сервиса для пересчета координат
    if (this.avatar && this.image && this.imageContainerQueryList?.first) {
      this.imageOriginalWidth = this.image.width;

      this.avatarRectangle = {
        topLeftPoint: {
          x: this.avatar.x,
          y: this.avatar.y
        },
        bottomRightPoint: {
          x: this.avatar.x + this.avatar.width,
          y: this.avatar.y + this.avatar.height
        }
      };
      // TODO прямоугольник с границами аватара - это хорошо, но надо как-то контроллировать его отрисовку, чтобы он масштабировался в размеры этого прямоугольника

      this.image.setAttribute('width', '100%');
      this.renderer.appendChild(this.imageContainerQueryList.first.nativeElement, this.image);  // Это добавляет фон в контейнер
      this.renderer.appendChild(this.imageContainerQueryList.first.nativeElement, this.avatar);  // Это добавляет аватара в контейнер (и нам все еще нужно как-то его масштабировать в размер прямоугольника avatarRectangle)

      if (this.imageOriginalWidth)
        this.coordinates.setupSystem(0, 0, this.image.width / this.imageOriginalWidth);

      Promise.resolve(null).then((): void => {
        this.afterInit();
      });
    }
  }

  public afterInit(): void {
    this.calculateWeight();
    this.calculateInitialAvatarRectangle();
    this.calculateRelativeAvatarRectangle();
  }

  public ngAfterContentChecked(): void {
    this.calculateWeight();
    this.calculateRelativeAvatarRectangle();
  }

  // ЭТО ФУНЦИИ, КОТОРЫЕ МОГУТ ПОНАДОБИТЬСЯ ДЛЯ DRAG&DROP ИЗМЕНЕНИЙ (ПОКА НЕ НУЖНО)
  // public onLogoQuadrilateralCornerDrag(corner: string, relativePoint: Point): void {
  //   this.calculateWeight();
  //   if (this.logoQuadrilateral && corner in this.logoQuadrilateral)
  //     this.logoQuadrilateral[corner as keyof Quadrilateral] = this.coordinates.systemToOriginalPoint(relativePoint);
  // }
  //
  // public onDragEnd(): void {
  //   if (this.logoQuadrilateral) {
  //     this.logoQuadrilateralEvent.emit(this.logoQuadrilateral);
  //   }
  // }

  public ngOnDestroy(): void {
    if (this.image)
      this.image.removeAttribute('width');
  }

  private calculateInitialAvatarRectangle(): void {
    if (this.avatarRectangle) {
      this.initialAvatarRectangle = {
        topLeftPoint: this.coordinates.originalToSystemPoint(this.avatarRectangle.topLeftPoint),
        bottomRightPoint: this.coordinates.originalToSystemPoint(this.avatarRectangle.bottomRightPoint)
      };
    }
  }

  private calculateRelativeAvatarRectangle(): void {
    if (this.avatarRectangle) {
      this.relativeAvatarRectangle = {
        topLeftPoint: this.coordinates.originalToSystemPoint(this.avatarRectangle.topLeftPoint),
        bottomRightPoint: this.coordinates.originalToSystemPoint(this.avatarRectangle.bottomRightPoint)
      };
    }
  }

  private calculateWeight(): void {
    if (this.image && this.imageOriginalWidth)
      this.coordinates.setWeight(this.image.width / this.imageOriginalWidth);
  }
}
