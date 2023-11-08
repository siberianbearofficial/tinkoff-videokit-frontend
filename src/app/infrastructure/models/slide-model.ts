import {Point} from "@angular/cdk/drag-drop";

export interface SlideModel {
  background_image: number;
  background_image_choice_links: Array<string>;
  background_image_choice_paths: Array<string>;
  video_path?: string;
  video_link?: string;
  status: string;
  retries: number;
  text: string;
  avatar_position: Point;
  avatar_scale: number;
  avatar_video_path: string;
  task_id: string;
  scene_template: string;
  updated_at: string;
  created_at: string;
  duration_ms: number;
}
