import {Point} from "@angular/cdk/drag-drop";

export interface SlideModel {
  background: string;
  avatar_position: Point;
  avatar_scale: number;
  avatar_type: number;
  time: number;
}
