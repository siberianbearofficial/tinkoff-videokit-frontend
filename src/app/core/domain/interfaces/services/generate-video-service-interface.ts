import {Observable} from "rxjs";
import {Video} from "../../entities/video";

export interface GenerateVideoServiceInterface {
  generateVideo: (avatarIndex: number, avatarAlignment: number, description: string, backgroundIndex: number, musicBlob: Blob | undefined, voiceIndex: number) => Observable<Video>;
  getVideos: () => Observable<Video[]>;
  deleteVideo: (video: Video) => Observable<void>;
}
