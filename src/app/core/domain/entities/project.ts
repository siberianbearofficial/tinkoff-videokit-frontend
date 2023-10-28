import {Slide} from "./slide";

export interface Project {
  id: string;
  userId: string;
  processed: boolean;
  processedVideo: string;
  gptScenario: string;
  mjImages: Array<string>;
  slides: Array<Slide>;
  createdAt: string;
  updatedAt: string;
  userPrompt: string;
}
