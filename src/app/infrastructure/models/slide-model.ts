import {Point} from "@angular/cdk/drag-drop";

export interface SlideModel {
  background_image: string;
  text: string;
  avatar_position: Point;
  avatar_scale: number;
  avatar_type: number;
  updated_at: string;
  created_at: string;
  duration_ms: number;
}
