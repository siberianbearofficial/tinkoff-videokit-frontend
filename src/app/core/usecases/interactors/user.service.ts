import {Injectable} from '@angular/core';
import {UserAdapterService} from "../../../infrastructure/adapters/services/user-adapter.service";
import {PasswordService} from "./password.service";
import {Observable} from "rxjs";
import {User} from "../../domain/entities/user";
import {v4 as generateUuid} from "uuid";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userAdapter: UserAdapterService,
              private passwordService: PasswordService) {
  }

  public isUsernameTaken(username: string): Observable<boolean> {
    return this.userAdapter.isUsernameTaken(username);
  }

  public getUsers(): Observable<User[]> {
    return this.userAdapter.getUsers();
  }

  public createUser(username: string, password: string): Observable<void> {
    return this.userAdapter.createUser(generateUuid(), username, this.passwordService.hash(password));
  }

  public updateUser(user: User): Observable<void> {
    return this.userAdapter.updateUser(user.uuid, user);
  }

  public changeUserPassword(user: User, currentPassword: string, newPassword: string): Observable<void> {
    return this.userAdapter.changeUserPassword(user.uuid, this.passwordService.hash(currentPassword), this.passwordService.hash(newPassword));
  }

  public changeUserPasswordByUuid(uuid: string, currentPassword: string, newPassword: string): Observable<void> {
    return this.userAdapter.changeUserPassword(uuid, this.passwordService.hash(currentPassword), this.passwordService.hash(newPassword));
  }

  public deleteUser(user: User): Observable<void> {
    return this.userAdapter.deleteUser(user.uuid);
  }

  public deleteUserByUuid(uuid: string): Observable<void> {
    return this.userAdapter.deleteUser(uuid);
  }
}
