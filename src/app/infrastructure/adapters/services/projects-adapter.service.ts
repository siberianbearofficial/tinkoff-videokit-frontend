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

  public getProjects(): Observable<Project[]> {
    return this.projectsApi.getProjects()
      .pipe(
        map((result: Object | string): Project[] => {
          let projectModels: ProjectModel[];
          if (typeof result == 'string')
            projectModels = (JSON.parse(result as string) as {
              ok: boolean,
              code: number,
              data: ProjectModel[]
            }).data;
          else
            projectModels = (result as {
              ok: boolean,
              code: number,
              data: ProjectModel[]
            }).data;

          let projects: Project[] = [];
          projectModels.forEach((projectModel: ProjectModel) => {
            let slides: Slide[] = [];
            projectModel.chunks.forEach((slideModel: SlideModel): void => {
              slides.push({
                backgroundImage: slideModel.background_image,
                avatarPosition: slideModel.avatar_position,
                avatarScale: slideModel.avatar_scale,
                avatarVideoPath: slideModel.avatar_video_path,
                durationMs: slideModel.duration_ms,
                text: slideModel.text,
                updatedAt: slideModel.updated_at,
                createdAt: slideModel.created_at,
                backgroundImageChoiceLinks: slideModel.background_image_choice_links,
                backgroundImageChoicePaths: slideModel.background_image_choice_paths,
                retries: slideModel.retries,
                sceneTemplate: slideModel.scene_template,
                status: slideModel.status,
                taskId: slideModel.task_id,
                videoLink: slideModel.video_link,
                videoPath: slideModel.video_path
              });
            });
            const project: Project = {
              id: projectModel._id,
              ownerId: projectModel.owner_id,
              status: projectModel.status,
              videoPath: projectModel.video_path,
              videoLink: projectModel.video_link,
              gptScenario: projectModel.gpt_scenario,
              mjImages: projectModel.mj_images,
              slides: slides,
              retries: projectModel.retries,
              sceneTemplate: projectModel.scene_template,
              createdAt: projectModel.created_at,
              updatedAt: projectModel.updated_at,
              userPrompt: projectModel.user_prompt
            };
            projects.push(project);
          });

          return projects;
        })
      );
  }

  public getProject(id: string): Observable<Project> {
    return this.projectsApi.getProject(id)
      .pipe(
        map((result: Object | string): Project => {
          let projectModel: ProjectModel;
          if (typeof result == 'string') {
            projectModel = (JSON.parse(result as string) as {
              ok: boolean,
              code: number,
              data: ProjectModel
            }).data;
          }
          else {
            projectModel = (result as {
              ok: boolean,
              code: number,
              data: ProjectModel
            }).data;
          }
          let slides: Slide[] = [];
          projectModel.chunks.forEach((slideModel: SlideModel): void => {
            slides.push({
              backgroundImage: slideModel.background_image,
              avatarPosition: slideModel.avatar_position,
              avatarScale: slideModel.avatar_scale,
              avatarVideoPath: slideModel.avatar_video_path,
              durationMs: slideModel.duration_ms,
              text: slideModel.text,
              updatedAt: slideModel.updated_at,
              createdAt: slideModel.created_at,
              backgroundImageChoiceLinks: slideModel.background_image_choice_links,
              backgroundImageChoicePaths: slideModel.background_image_choice_paths,
              retries: slideModel.retries,
              sceneTemplate: slideModel.scene_template,
              status: slideModel.status,
              taskId: slideModel.task_id,
              videoLink: slideModel.video_link,
              videoPath: slideModel.video_path
            });
          });
          return {
            id: projectModel._id,
            ownerId: projectModel.owner_id,
            status: projectModel.status,
            videoPath: projectModel.video_path,
            videoLink: projectModel.video_link,
            gptScenario: projectModel.gpt_scenario,
            mjImages: projectModel.mj_images,
            slides: slides,
            retries: projectModel.retries,
            sceneTemplate: projectModel.scene_template,
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
        background_image_choice_links: slide.backgroundImageChoiceLinks,
        background_image_choice_paths: slide.backgroundImageChoicePaths,
        avatar_position: slide.avatarPosition,
        avatar_scale: slide.avatarScale,
        duration_ms: slide.durationMs,
        text: slide.text,
        video_path: slide.videoPath,
        video_link: slide.videoLink,
        avatar_video_path: slide.avatarVideoPath,
        status: slide.status,
        retries: slide.retries,
        task_id: slide.taskId,
        scene_template: slide.sceneTemplate,
        updated_at: slide.updatedAt,
        created_at: slide.createdAt
      });
    });
    const projectModel: ProjectModel = {
      _id: project.id,
      owner_id: project.ownerId,
      status: project.status,
      video_path: project.videoPath,
      video_link: project.videoLink,
      gpt_scenario: project.gptScenario,
      mj_images: project.mjImages,
      chunks: slideModels,
      retries: project.retries,
      scene_template: project.sceneTemplate,
      created_at: project.createdAt,
      updated_at: project.updatedAt,
      user_prompt: project.userPrompt
    };
    return this.projectsApi.putProject(project.id, projectModel)
      .pipe(
        map(() => void 0)
      );
  }

  public deleteProjectById(id: string, code: string): Observable<void> {
    return this.projectsApi.deleteProject(id, code)
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
