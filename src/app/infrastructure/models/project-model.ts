import {SlideModel} from "./slide-model";

export interface ProjectModel {
  _id: string;
  owner_id: string;
  status: string;
  video_path?: string;
  video_link?: string;
  user_prompt: string;
  gpt_scenario: string;
  scene_template: string;
  mj_images: Array<string>;
  chunks: Array<SlideModel>;
  retries: number;
  updated_at: string;
  created_at: string;
}
