import {Slide} from "./slide";

export interface Project {
  id: string;
  ownerId: string;
  status: string;
  videoPath?: string;
  videoLink?: string;
  gptScenario: string;
  sceneTemplate: string;
  mjImages: Array<string>;
  slides: Array<Slide>;
  retries: number;
  createdAt: string;
  updatedAt: string;
  userPrompt: string;
}
