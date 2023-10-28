import {Injectable} from '@angular/core';
import {ProjectsApiService} from "../../api/projects-api.service";
import {map, Observable} from "rxjs";
import {Project} from "../../../core/domain/entities/project";
import {ProjectModel} from "../../models/project-model";
import {Slide} from "../../../core/domain/entities/slide";
import {SlideModel} from "../../models/slide-model";

@Injectable({
  providedIn: 'root'
})
export class ProjectsAdapterService {

  constructor(private projectsApi: ProjectsApiService) {
  }

  // public generateVideo(uuid: string, avatarIndex: number, avatarAlignment: number, description: string, backgroundIndex: number, musicBlob: Blob | undefined, voiceIndex: number): Observable<Project> {
  //   return this.projectsApi.postVideo(
  //     ProjectsAdapterService.createGenerateVideoRequestModel(uuid, avatarIndex, avatarAlignment, description, backgroundIndex, musicBlob, voiceIndex)
  //   ).pipe(
  //     map((result) => {
  //       const videoModel: ProjectModel = JSON.parse(result as string) as ProjectModel;
  //       return {
  //         uuid: videoModel.uuid,
  //         avatarIndex: videoModel.avatar_index,
  //         avatarAlignment: videoModel.avatar_alignment,
  //         description: videoModel.description,
  //         backgroundIndex: videoModel.background_index,
  //         voiceIndex: videoModel.voice_index,
  //         videoUrl: videoModel.video_url,
  //         musicUrl: videoModel.music_url
  //       };
  //     })
  //   );
  // }

  public getProjects(): Observable<string[]> {
    return this.projectsApi.getProjects()
      .pipe(
        map((result: Object | string): string[] => {
          return (typeof result == 'string') ? (JSON.parse(result as string) as string[]) : (result as string[]);
        })
      );
  }

  public getProject(id: string): Observable<Project> {
    return this.projectsApi.getProject(id)
      .pipe(
        map((result: Object | string): Project => {
          const projectModel: ProjectModel = (typeof result == 'string') ? (JSON.parse(result as string) as ProjectModel) : (result as ProjectModel);
          let slides: Slide[] = [];
          projectModel.chunks.forEach((slideModel: SlideModel): void => {
            slides.push({
              backgroundImage: slideModel.background_image,
              avatarPosition: slideModel.avatar_position,
              avatarScale: slideModel.avatar_scale,
              avatarType: slideModel.avatar_type,
              durationMs: slideModel.duration_ms,
              text: slideModel.text,
              updatedAt: slideModel.updated_at,
              createdAt: slideModel.created_at
            });
          });
          return {
            id: projectModel._id,
            userId: projectModel.user_id,
            processed: projectModel.processed,
            processedVideo: projectModel.processed_video,
            gptScenario: projectModel.gpt_scenario,
            mjImages: projectModel.mj_images,
            slides: slides,
            createdAt: projectModel.created_at,
            updatedAt: projectModel.updated_at,
            userPrompt: projectModel.user_prompt
          };
        })
      );
  }

  public updateProject(project: Project): Observable<void> {
    let slideModels: SlideModel[] = [];
    project.slides.forEach((slide: Slide): void => {
      slideModels.push({
        background_image: slide.backgroundImage,
        avatar_position: slide.avatarPosition,
        avatar_scale: slide.avatarScale,
        avatar_type: slide.avatarType,
        duration_ms: slide.durationMs,
        text: slide.text,
        updated_at: slide.updatedAt,
        created_at: slide.createdAt
      });
    });
    const projectModel: ProjectModel = {
      _id: project.id,
      user_id: project.userId,
      processed: project.processed,
      processed_video: project.processedVideo,
      gpt_scenario: project.gptScenario,
      mj_images: project.mjImages,
      chunks: slideModels,
      avatar_id: 1,
      created_at: project.createdAt,
      updated_at: project.updatedAt,
      user_prompt: project.userPrompt
    };
    return this.projectsApi.putProject(project.id, projectModel)
      .pipe(
        map(() => void 0)
      );
  }

  public deleteProjectById(id: string): Observable<void> {
    return this.projectsApi.deleteProject(id)
      .pipe(
        map(() => void 0)
      );
  }

  // private static createGenerateVideoRequestModel(uuid: string, avatarIndex: number, avatarAlignment: number, description: string, backgroundIndex: number, musicBlob: Blob | undefined, voiceIndex: number): FormData {
  //   const postRecordRequestModel: FormData = new FormData();
  //   postRecordRequestModel.append('uuid', uuid);
  //   postRecordRequestModel.append('avatar_index', avatarIndex.toString());
  //   postRecordRequestModel.append('avatar_alignment', avatarAlignment.toString());
  //   postRecordRequestModel.append('description', description);
  //   postRecordRequestModel.append('background_index', backgroundIndex.toString());
  //   postRecordRequestModel.append('voice_index', voiceIndex.toString());
  //   if (musicBlob)
  //     postRecordRequestModel.append('music_blob', musicBlob);
  //   return postRecordRequestModel;
  // }
}
