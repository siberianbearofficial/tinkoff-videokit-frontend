import {Slide} from "./slide";

export interface Project {
  id: string;
  userId: string;
  processed: boolean;
  avatarVideo: string;
  processedVideo: string;
  plan: string;
  text: string;
  mjImages: Array<string>;
  slides: Array<Slide>;
}
