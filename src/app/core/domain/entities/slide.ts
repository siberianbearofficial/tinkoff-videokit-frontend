import {Point} from "@angular/cdk/drag-drop";

export interface Slide {
  backgroundImage: string;
  avatarPosition: Point;
  avatarScale: number;
  avatarType: number;
  durationMs: number;
  updatedAt: string;
  createdAt: string;
  text: string;
}
