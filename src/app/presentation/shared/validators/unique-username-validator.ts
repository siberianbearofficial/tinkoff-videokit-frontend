import {catchError, map, Observable, of} from "rxjs";
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {UserService} from "../../../core/usecases/interactors/user.service";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class UniqueUsernameValidator implements AsyncValidator {
  constructor(private userService: UserService) {
  }

  validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return this.userService.isUsernameTaken(control.value).pipe(
      map(isTaken => (isTaken ? {uniqueUsername: true} : null)),
      catchError(() => of(null))
    );
  }
}
