import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  Input,
  OnDestroy,
  OnInit, Output,
  QueryList,
  Renderer2, ViewChild,
  ViewChildren
} from '@angular/core';
import {CoordinatesService} from "../../../../infrastructure/adapters/services/coordinates.service";
import {Point} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, AfterViewInit, AfterContentChecked {
  @Input() avatarImage: string = '';
  @Input() backgroundImage: string = '';
  @Input() avatarPosition?: Point;
  @Input() avatarScale?: number;

  @Output() avatarPositionEvent: EventEmitter<Point> = new EventEmitter<Point>();

  @ViewChild('imageContainer') imageContainerQuery?: ElementRef;

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

  private afterViewInit: boolean = false;

  constructor(private renderer: Renderer2,
              private imageCoordinates: CoordinatesService) {
  }

  public ngOnInit(): void {
    this.image = new Image();
    this.image.src = this.backgroundImage;

    this.avatar = new Image();
    this.avatar.src = this.avatarImage;
  }

  public ngAfterViewInit(): void {
    this.afterViewInit = true;
    if (this.image && this.avatar && this.imageContainerQuery && this.avatarPosition) {
      this.avatarRectangle = {
        topLeftPoint: this.avatarPosition,
        bottomRightPoint: {
          x: this.avatarPosition.x + this.avatar.width * (this.avatarScale ? this.avatarScale : 1),
          y: this.avatarPosition.y + this.avatar.height * (this.avatarScale ? this.avatarScale : 1)
        }
      };

      this.imageOriginalWidth = this.image.width;

      console.log('Original image width:', this.image.width);
      console.log('Original avatar rectangle:', this.avatarRectangle);

      this.image.style.width = '100%';
      this.avatar.style.position = 'absolute';
      this.avatar.style.left = '0';
      this.avatar.style.top = '0';

      this.renderer.appendChild(this.imageContainerQuery.nativeElement, this.image);
      this.renderer.appendChild(this.imageContainerQuery.nativeElement, this.avatar);

      if (this.imageOriginalWidth)
        this.imageCoordinates.setupSystem(0, 0, this.image.width / this.imageOriginalWidth);

      setTimeout((): void => {
        this.afterInit();
      }, 1);
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

  private applyAvatarRectangle(rect: { topLeftPoint: Point, bottomRightPoint: Point }): void {
    if (this.avatar) {
      this.avatar.style.left = `${rect.topLeftPoint.x}px`;
      this.avatar.style.top = `${rect.topLeftPoint.y}px`;
      this.avatar.style.width = `${rect.bottomRightPoint.x - rect.topLeftPoint.x}px`;
      this.avatar.style.height = `${rect.bottomRightPoint.y - rect.topLeftPoint.y}px`;
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

  private calculateWeight(): void {
    if (this.image && this.imageOriginalWidth) {
      const w = this.image.width / this.imageOriginalWidth;
      this.imageCoordinates.setWeight(w);
    }
  }
}
