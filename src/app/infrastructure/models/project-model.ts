import {SlideModel} from "./slide-model";

export interface ProjectModel {
  _id: string;
  user_id: string;
  processed: boolean;
  processed_video: string;
  user_prompt: string;
  gpt_scenario: string;
  avatar_id: number;
  mj_images: Array<string>;
  chunks: Array<SlideModel>;
  updated_at: string;
  created_at: string;
}
