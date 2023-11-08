import {Point} from "@angular/cdk/drag-drop";

export interface Slide {
  backgroundImage: number;
  backgroundImageChoiceLinks: Array<string>;
  backgroundImageChoicePaths: Array<string>;
  avatarPosition: Point;
  avatarScale: number;
  avatarVideoPath: string;
  retries: number;
  status: string;
  videoLink?: string;
  videoPath?: string;
  taskId: string;
  sceneTemplate: string;
  durationMs: number;
  updatedAt: string;
  createdAt: string;
  text: string;
}
