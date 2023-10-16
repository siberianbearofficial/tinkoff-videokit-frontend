import {Point} from "@angular/cdk/drag-drop";

export interface Slide {
  background: string;
  avatarPosition: Point;
  avatarScale: number;
  avatarType: number;
  time: number;
}
