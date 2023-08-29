import {Injectable} from '@angular/core';
import {GenerateVideoServiceInterface} from "../../domain/interfaces/services/generate-video-service-interface";
import {Observable, of} from "rxjs";
import {GenerateVideoAdapterService} from "../../../infrastructure/adapters/services/generate-video-adapter.service";
import {Video} from "../../domain/entities/video";
import {v4 as generateUuid} from "uuid";


@Injectable({
  providedIn: 'root'
})
export class GenerateVideoService implements GenerateVideoServiceInterface {

  constructor(private generateVideoAdapter: GenerateVideoAdapterService) {
  }

  public generateVideo(avatarIndex: number, avatarAlignment: number, description: string, backgroundIndex: number, musicBlob: Blob | undefined, voiceIndex: number): Observable<Video> {
    return this.generateVideoAdapter.generateVideo(generateUuid(), avatarIndex, avatarAlignment, description, backgroundIndex, musicBlob, voiceIndex);
  }

  public getVideos() {
    return this.generateVideoAdapter.getVideos();
  }

  public deleteVideo(video: Video) {
    return video.uuid ? this.generateVideoAdapter.deleteVideoByUuid(video.uuid) : of(void 0);
  }
}
