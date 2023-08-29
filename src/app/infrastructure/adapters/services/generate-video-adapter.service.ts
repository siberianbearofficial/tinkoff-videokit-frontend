import {Injectable} from '@angular/core';
import {GenerateVideoApiService} from "../../api/generate-video-api.service";
import {map, Observable} from "rxjs";
import {GenerateVideoResponseModel} from "../../models/generate-video-response-model";
import {Video} from "../../../core/domain/entities/video";
import {VideoModel} from "../../models/video-model";

@Injectable({
  providedIn: 'root'
})
export class GenerateVideoAdapterService {

  constructor(private generateVideoApi: GenerateVideoApiService) {
  }

  public generateVideo(uuid: string, avatarIndex: number, avatarAlignment: number, description: string, backgroundIndex: number, musicBlob: Blob | undefined, voiceIndex: number): Observable<Video> {
    return this.generateVideoApi.postVideo(
      GenerateVideoAdapterService.createGenerateVideoRequestModel(uuid, avatarIndex, avatarAlignment, description, backgroundIndex, musicBlob, voiceIndex)
    ).pipe(
      map((result) => {
        const videoModel: VideoModel = JSON.parse(result as string) as VideoModel;
        return {
          uuid: videoModel.uuid,
          avatarIndex: videoModel.avatar_index,
          avatarAlignment: videoModel.avatar_alignment,
          description: videoModel.description,
          backgroundIndex: videoModel.background_index,
          voiceIndex: videoModel.voice_index,
          videoUrl: videoModel.video_url,
          musicUrl: videoModel.music_url
        };
      })
    );
  }

  public getVideos(): Observable<Video[]> {
    return this.generateVideoApi.getVideos()
      .pipe(
        map((result) => {
          const videoModels: VideoModel[] = JSON.parse(result as string) as VideoModel[];
          let videos: Video[] = [];
          videoModels.forEach((videoModel: VideoModel) => {
            videos.push({
              uuid: videoModel.uuid,
              avatarIndex: videoModel.avatar_index,
              avatarAlignment: videoModel.avatar_alignment,
              description: videoModel.description,
              backgroundIndex: videoModel.background_index,
              voiceIndex: videoModel.voice_index,
              videoUrl: videoModel.video_url,
              musicUrl: videoModel.music_url
            });
          });
          return videos;
        })
      );
  }

  public deleteVideoByUuid(uuid: string): Observable<void> {
    return this.generateVideoApi.deleteVideo(uuid)
      .pipe(
        map(() => void 0)
      );
  }

  private static createGenerateVideoRequestModel(uuid: string, avatarIndex: number, avatarAlignment: number, description: string, backgroundIndex: number, musicBlob: Blob | undefined, voiceIndex: number): FormData {
    const postRecordRequestModel: FormData = new FormData();
    postRecordRequestModel.append('uuid', uuid);
    postRecordRequestModel.append('avatar_index', avatarIndex.toString());
    postRecordRequestModel.append('avatar_alignment', avatarAlignment.toString());
    postRecordRequestModel.append('description', description);
    postRecordRequestModel.append('background_index', backgroundIndex.toString());
    postRecordRequestModel.append('voice_index', voiceIndex.toString());
    if (musicBlob)
      postRecordRequestModel.append('music_blob', musicBlob);
    return postRecordRequestModel;
  }
}
