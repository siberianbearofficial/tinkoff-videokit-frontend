import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  Input,
  Output,
  Renderer2, ViewChild
} from '@angular/core';
import {CoordinatesService} from "../../../../infrastructure/adapters/services/coordinates.service";
import {Point} from "@angular/cdk/drag-drop";
import {Rectangle} from "../../../../core/domain/entities/rectangle";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements AfterViewInit {

  public avatarOriginalWidth: number = 300;
  public avatarOriginalHeight: number = 300;

  public imageOriginalWidth: number = 1920;
  public imageOriginalHeight: number = 1080;

  public _backgroundImage: string = '';
  get backgroundImage(): string {
    return this._backgroundImage;
  }

  @Input() set backgroundImage(value: string) {
    this._backgroundImage = value;
    // if (this.image && this.imageContainerQuery)
    //   this.renderer.removeChild(this.imageContainerQuery.nativeElement, this.image);
    // this.image = new Image();
    if (!this.image)
      this.image = new Image();

    if (this.image) {
      this.image.setAttribute('draggable', 'false');
      this.image.src = value;
      this.image.onload = () => {
        if (this.image) {
          // this.imageOriginalWidth = this.image.width;
          // console.log('Original width:', this.imageOriginalWidth);
          // this.imageLoaded = true;
          this.ngAfterViewInit();
        }
      }
    }
  }

  public _avatarRectangle?: Rectangle;
  get avatarRectangle(): Rectangle | undefined {
    return this._avatarRectangle;
  }

  @Input() set avatarRectangle(value: Rectangle) {
    this._avatarRectangle = value;
    this.avatarRelativeRectangle = this.calculateRelativeAvatarRectangle(value);
  }

  @Input() avatarImage: string = '';
  @Input() avatarScale?: number;

  @Output() avatarRectangleEvent: EventEmitter<Rectangle> = new EventEmitter<Rectangle>();

  @ViewChild('imageContainer') imageContainerQuery?: ElementRef;

  public avatarRelativeRectangle?: Rectangle;

  // private imageOriginalWidth?: number;
  // private imageLoaded: boolean = false;

  private image?: HTMLImageElement;

  constructor(private renderer: Renderer2,
              private imageCoordinates: CoordinatesService) {
  }

  public ngAfterViewInit(): void {
    if (this.image && this.imageContainerQuery) {
      this.image.style.width = '100%';
      this.renderer.appendChild(this.imageContainerQuery.nativeElement, this.image);

      this.image.onresize = () => {
        if (this.image && this.imageOriginalWidth)
          this.imageCoordinates.setupSystem(0, 0, this.image.width / this.imageOriginalWidth);
      };
    }
  }

  public onAvatarRectangleDrag(event: any): void {
    const centerPosition: Point = event.source.getFreeDragPosition();
    this.calculateWeight();
    if (this.avatarRectangle) {
      this.avatarRectangle.topLeftPoint = this.imageCoordinates.systemToOriginalPoint(centerPosition);
      this.avatarRectangle.bottomRightPoint = {
        x: this.avatarRectangle.topLeftPoint.x + this.avatarOriginalWidth,
        y: this.avatarRectangle.topLeftPoint.y + this.avatarOriginalHeight
      }
    }
  }

  public onAvatarRectangleDragEnd(): void {
    if (this.avatarRectangle) {
      this.avatarRelativeRectangle = this.calculateRelativeAvatarRectangle(this.avatarRectangle);
      this.avatarRectangleEvent.emit(this.avatarRectangle);
    }
  }

  public rectangleWidth(rectangle: Rectangle): number {
    return rectangle.bottomRightPoint.x - rectangle.topLeftPoint.x;
  }

  public rectangleHeight(rectangle: Rectangle): number {
    return rectangle.bottomRightPoint.y - rectangle.topLeftPoint.y;
  }

  public calculateRelativeAvatarRectangle(avatar: Rectangle): Rectangle {
    this.calculateWeight();
    return {
      topLeftPoint: this.imageCoordinates.originalToSystemPoint(avatar.topLeftPoint),
      bottomRightPoint: this.imageCoordinates.originalToSystemPoint(avatar.bottomRightPoint)
    }
  }

  public avatarWidth(avatar: Rectangle, scale: number): string {
    return `${this.rectangleWidth(this.calculateRelativeAvatarRectangle(avatar)) * scale}px`;
  }

  public avatarHeight(avatar: Rectangle, scale: number): string {
    return `${this.rectangleHeight(this.calculateRelativeAvatarRectangle(avatar)) * scale}px`;
  }

  public calculateWeight(): void {
    if (this.image && this.imageOriginalWidth) {
      const w = this.image.offsetWidth / this.imageOriginalWidth;
      this.imageCoordinates.setWeight(w);
    }
  }
}
