import {SlideModel} from "./slide-model";

export interface ProjectModel {
  id: string;
  user_id: string;
  processed: boolean;
  avatar_video: string;
  processed_video: string;
  plan: string;
  text: string;
  mj_images: Array<string>;
  slides: Array<SlideModel>;
}
