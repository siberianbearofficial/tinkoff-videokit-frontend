import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  Input,
  OnInit, Output,
  Renderer2, ViewChild
} from '@angular/core';
import {CoordinatesService} from "../../../../infrastructure/adapters/services/coordinates.service";
import {Point} from "@angular/cdk/drag-drop";


interface Rectangle {
  topLeftPoint: Point;
  bottomRightPoint: Point;
}

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, AfterViewInit, AfterContentChecked {

  public _backgroundImage: string = '';
  get backgroundImage(): string {
    return this._backgroundImage;
  }

  @Input() set backgroundImage(value: string) {
    this._backgroundImage = value;
    if (this.image) {
      this.image.style.width = '';
      this.image.src = this._backgroundImage;
      this.image.onload = () => {
        if (this.image) {
          this.imageOriginalWidth = this.image.width;

          this.image.style.width = '100%';

          if (this.imageOriginalWidth)
            this.imageCoordinates.setupSystem(0, 0, this.image.width / this.imageOriginalWidth);

          setTimeout((): void => {
            this.afterInit();
          }, 1);
        }
      };
    }
  }

  public _avatarPosition?: Point;
  get avatarPosition(): Point | undefined {
    return this._avatarPosition;
  }

  @Input() set avatarPosition(value: Point) {
    this._avatarPosition = value;
    this.calculateAvatarRectangle();
    this.afterInit();
  }

  @Input() avatarImage: string = '';
  @Input() avatarScale?: number;

  @Output() avatarPositionEvent: EventEmitter<Point> = new EventEmitter<Point>();

  @ViewChild('imageContainer') imageContainerQuery?: ElementRef;

  public relativeAvatarRectangle?: Rectangle;
  public initialAvatarRectangle?: Rectangle;
  public avatarRectangle?: Rectangle;

  private imageOriginalWidth?: number;

  private image?: HTMLImageElement;
  private avatar?: HTMLImageElement;

  private afterViewInit: boolean = false;

  constructor(private renderer: Renderer2,
              private imageCoordinates: CoordinatesService) {
  }

  public ngOnInit(): void {
    this.image = new Image();
    this.image.src = this._backgroundImage;
    this.image.onload = () => {
      if (this.image) {
        this.imageOriginalWidth = this.image.width;
        this.image.style.width = '100%';

        if (this.imageOriginalWidth)
          this.imageCoordinates.setupSystem(0, 0, this.image.width / this.imageOriginalWidth);
      }
    };

    this.avatar = new Image();
    this.avatar.style.position = 'absolute';
    this.avatar.style.left = '0';
    this.avatar.style.top = '0';
    this.avatar.src = this.avatarImage;
    this.avatar.onload = () => {
      this.calculateAvatarRectangle();
    };
  }

  public ngAfterViewInit(): void {
    this.afterViewInit = true;
    if (this.image && this.avatar && this.imageContainerQuery) {
      this.calculateAvatarRectangle();

      this.renderer.appendChild(this.imageContainerQuery.nativeElement, this.image);
      this.renderer.appendChild(this.imageContainerQuery.nativeElement, this.avatar);

      setTimeout((): void => {
        this.afterInit();
      }, 10);
    }
  }

  public afterInit(): void {
    this.calculateWeight();
    this.calculateInitialAvatarRectangle();
    this.calculateRelativeAvatarRectangle();
  }

  public ngAfterContentChecked(): void {
    if (this.afterViewInit) {
      this.calculateWeight();
      this.calculateRelativeAvatarRectangle();
    }
  }

  public onAvatarRectangleDrag(event: any): void {
    const centerPosition: Point = event.source.getFreeDragPosition();
    this.calculateWeight();
    if (this.avatarRectangle) {
      const width: number = this.avatarRectangle.bottomRightPoint.x - this.avatarRectangle.topLeftPoint.x;
      const height: number = this.avatarRectangle.bottomRightPoint.y - this.avatarRectangle.topLeftPoint.y;
      this.avatarRectangle.topLeftPoint = this.imageCoordinates.systemToOriginalPoint(centerPosition);
      this.avatarRectangle.bottomRightPoint = {
        x: this.avatarRectangle.topLeftPoint.x + width,
        y: this.avatarRectangle.topLeftPoint.y + height
      }
    }
  }

  public onAvatarRectangleDragEnd(): void {
    if (this.avatarRectangle) {
      this.avatarPositionEvent.emit(this.avatarRectangle.topLeftPoint);
    }
  }

  private applyAvatarRectangle(rect: Rectangle): void {
    if (this.avatar) {
      this.avatar.style.left = `${rect.topLeftPoint.x}px`;
      this.avatar.style.top = `${rect.topLeftPoint.y}px`;
      this.avatar.style.width = `${(rect.bottomRightPoint.x - rect.topLeftPoint.x) * (this.avatarScale ? this.avatarScale : 1)}px`;
      this.avatar.style.height = `${(rect.bottomRightPoint.y - rect.topLeftPoint.y) * (this.avatarScale ? this.avatarScale : 1)}px`;
    }
  }

  private calculateInitialAvatarRectangle(): void {
    if (this.avatarRectangle) {
      this.initialAvatarRectangle = {
        topLeftPoint: this.imageCoordinates.originalToSystemPoint(this.avatarRectangle.topLeftPoint),
        bottomRightPoint: this.imageCoordinates.originalToSystemPoint(this.avatarRectangle.bottomRightPoint)
      }
    }
  }

  private calculateRelativeAvatarRectangle(): void {
    if (this.avatarRectangle) {
      this.relativeAvatarRectangle = {
        topLeftPoint: this.imageCoordinates.originalToSystemPoint(this.avatarRectangle.topLeftPoint),
        bottomRightPoint: this.imageCoordinates.originalToSystemPoint(this.avatarRectangle.bottomRightPoint)
      }
      this.applyAvatarRectangle(this.relativeAvatarRectangle);
    }
  }

  private calculateAvatarRectangle(): void {
    if (this._avatarPosition) {
      if (this.avatar && this.avatarRectangle) {
        const width: number = this.avatarRectangle.bottomRightPoint.x - this.avatarRectangle.topLeftPoint.x;
        const height: number = this.avatarRectangle.bottomRightPoint.y - this.avatarRectangle.topLeftPoint.y;
        this.avatarRectangle = {
          topLeftPoint: this._avatarPosition,
          bottomRightPoint: {
            x: this._avatarPosition.x + width,
            y: this._avatarPosition.y + height
          }
        };
      } else if (this.avatar) {
        this.avatarRectangle = {
          topLeftPoint: this._avatarPosition,
          bottomRightPoint: {
            x: this._avatarPosition.x + this.avatar.width,
            y: this._avatarPosition.y + this.avatar.height
          }
        };
      }
    }
  }

  private calculateWeight(): void {
    if (this.image && this.imageOriginalWidth) {
      const w = this.image.width / this.imageOriginalWidth;
      this.imageCoordinates.setWeight(w);
    }
  }
}
