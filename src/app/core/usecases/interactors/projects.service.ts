import {Injectable} from '@angular/core';
import {ProjectsServiceInterface} from "../../domain/interfaces/services/projects-service-interface";
import {Observable, of} from "rxjs";
import {ProjectsAdapterService} from "../../../infrastructure/adapters/services/projects-adapter.service";
import {Project} from "../../domain/entities/project";


@Injectable({
  providedIn: 'root'
})
export class ProjectsService implements ProjectsServiceInterface {

  constructor(private projectsAdapter: ProjectsAdapterService) {
  }

  public getProjects(): Observable<Project[]> {
    const project: Project = {
      id: "4A53CH",
      userId: "telegram_chat_id",
      processed: true,
      processedVideo: "assets/video/video1.mp4",
      gptScenario: "short plan that was generated by gpt",
      userPrompt: "some user prompt",
      mjImages: [
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg"
      ],
      slides: [
        {
          backgroundImage: "/static/images/4A53CH/mj_image_2.jpg",
          avatarPosition: {
            x: 13.4,
            y: 14.98
          },
          avatarScale: 0.3,
          avatarType: 1,
          durationMs: 14.2,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_1.jpg",
          avatarPosition: {
            x: 102.16,
            y: 21.07
          },
          avatarScale: 0.1,
          avatarType: 1,
          durationMs: 0.8,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_2.jpg",
          avatarPosition: {
            x: 13.4,
            y: 14.98
          },
          avatarScale: 0.3,
          avatarType: 1,
          durationMs: 14.2,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_1.jpg",
          avatarPosition: {
            x: 102.16,
            y: 21.07
          },
          avatarScale: 0.1,
          avatarType: 1,
          durationMs: 0.8,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_2.jpg",
          avatarPosition: {
            x: 13.4,
            y: 14.98
          },
          avatarScale: 0.3,
          avatarType: 1,
          durationMs: 14.2,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_1.jpg",
          avatarPosition: {
            x: 102.16,
            y: 21.07
          },
          avatarScale: 0.1,
          avatarType: 1,
          durationMs: 0.8,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_2.jpg",
          avatarPosition: {
            x: 13.4,
            y: 14.98
          },
          avatarScale: 0.3,
          avatarType: 1,
          durationMs: 14.2,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_1.jpg",
          avatarPosition: {
            x: 102.16,
            y: 21.07
          },
          avatarScale: 0.1,
          avatarType: 1,
          durationMs: 0.8,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        }
      ],
      createdAt: "",
      updatedAt: ""
    };
    console.log('GET /projects')
    return of([project]);
    // return this.projectsAdapter.getProjects();
  }

  public getProject(id: string): Observable<Project> {
    const testId = '4A53CH';
    if (testId != id)
      throw new Error('Проект не найден');
    const project: Project = {
      id: id,
      userId: "telegram_chat_id",
      processed: true,
      processedVideo: "assets/video/video1.mp4",
      gptScenario: "short plan that was generated by gpt",
      userPrompt: "some user prompt",
      mjImages: [
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
        "/static/images/4A53CH/mj_image_1.jpg",
        "/static/images/4A53CH/mj_image_2.jpg",
        "/static/images/4A53CH/mj_image_3.jpg",
      ],
      slides: [
        {
          backgroundImage: "/static/images/4A53CH/mj_image_2.jpg",
          avatarPosition: {
            x: 13.4,
            y: 14.98
          },
          avatarScale: 0.3,
          avatarType: 1,
          durationMs: 14.2,
          updatedAt: "",
          createdAt: "",
          text: "Давным-давно, в стране бескрайних сыров, жила маленькая мышка по имени Миа. Любовь Мии к сыру была непередаваема, и она мечтала найти самое сырное сокровище в мире. В одно яркое утро Миа отправилась в путь, чтобы отыскать легендарную \"Гору Сыра\"."
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_1.jpg",
          avatarPosition: {
            x: 102.16,
            y: 21.07
          },
          avatarScale: 0.1,
          avatarType: 1,
          durationMs: 0.8,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_2.jpg",
          avatarPosition: {
            x: 13.4,
            y: 14.98
          },
          avatarScale: 0.3,
          avatarType: 1,
          durationMs: 14.2,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_1.jpg",
          avatarPosition: {
            x: 102.16,
            y: 21.07
          },
          avatarScale: 0.1,
          avatarType: 1,
          durationMs: 0.8,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_2.jpg",
          avatarPosition: {
            x: 13.4,
            y: 14.98
          },
          avatarScale: 0.3,
          avatarType: 1,
          durationMs: 14.2,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_1.jpg",
          avatarPosition: {
            x: 102.16,
            y: 21.07
          },
          avatarScale: 0.1,
          avatarType: 1,
          durationMs: 0.8,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_2.jpg",
          avatarPosition: {
            x: 13.4,
            y: 14.98
          },
          avatarScale: 0.3,
          avatarType: 1,
          durationMs: 14.2,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_1.jpg",
          avatarPosition: {
            x: 102.16,
            y: 21.07
          },
          avatarScale: 0.1,
          avatarType: 1,
          durationMs: 0.8,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        },
        {
          backgroundImage: "/static/images/4A53CH/mj_image_3.jpg",
          avatarPosition: {
            x: 170.82,
            y: 15.7
          },
          avatarScale: 0.5,
          avatarType: 1,
          durationMs: 5.3,
          updatedAt: "",
          createdAt: "",
          text: ""
        }
      ],
      createdAt: "",
      updatedAt: ""
    };
    console.log(`GET /project/${id}`)
    return of(project);
    // return this.projectsAdapter.getProject(id);
  }

  public updateProject(project: Project): Observable<void> {
    return of(void 0);
    // return this.projectsAdapter.updateProject(project);
  }

  public deleteProject(project: Project): Observable<void> {
    return of(void 0);
    // return project.id ? this.projectsAdapter.deleteProjectById(project.id) : of(void 0);
  }
}
