import {Injectable} from '@angular/core';
import {Point} from "@angular/cdk/drag-drop";

@Injectable({
  providedIn: 'root'
})
export class CoordinatesService {

  // System setup

  private offsetX: number = 0;
  private offsetY: number = 0;
  private weight: number = 1;

  public setupSystem(offsetX: number, offsetY: number, weight: number): void {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.weight = weight;
  }

  public setWeight(weight: number): void {
    this.weight = weight;
  }

  // Original to System conversion

  public originalToSystemX(x: number): number {
    return this.offsetX + x * this.weight;
  }

  public originalToSystemY(y: number): number {
    return this.offsetY + y * this.weight;
  }

  public originalToSystemPoint(point: Point): Point {
    return {
      x: this.originalToSystemX(point.x),
      y: this.originalToSystemY(point.y)
    }
  }

  // System to Original conversion

  public systemToOriginalX(x: number): number {
    return this.weight ? Math.round(x / this.weight) : 0;
  }

  public systemToOriginalY(y: number): number {
    return this.weight ? Math.round(y / this.weight) : 0;
  }

  public systemToOriginalPoint(point: Point): Point {
    return {
      x: this.systemToOriginalX(point.x),
      y: this.systemToOriginalY(point.y)
    }
  }
}
