import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../../../core/domain/entities/user";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  public disabled: boolean = true;

  public _users?: User[];
  @Input() set users(users: User[] | undefined) {
    this._users = users;
    this.disabled = false;
  }

  get users(): User[] | undefined {
    return this._users;
  }

  @Input() disabledUsersUuids?: string[];
  @Output() userDeletionEvent: EventEmitter<User> = new EventEmitter<User>();
  @Output() userChangeEvent: EventEmitter<User> = new EventEmitter<User>();

  public isDisabled(uuid: string): boolean {
    if (this.disabled)
      return true;
    if (this.disabledUsersUuids)
      return this.disabledUsersUuids.includes(uuid);
    return false;
  }

  public onIsAdminClick(user: User): void {
    if (!this.isDisabled(user.uuid)) {
      this.disabled = true;
      const changedUser: User = {
        isAdmin: !user.isAdmin,
        username: user.username,
        uuid: user.uuid
      };
      this.userChangeEvent.emit(changedUser);
    }
  }

  public onDeleteClick(user: User): void {
    if (!this.isDisabled(user.uuid)) {
      this.userDeletionEvent.emit(user);
    }
  }

  public getIsAdminText(user: User): string {
    return user.isAdmin ? 'Администратор' : 'Пользователь';
  }

  public getIsAdminClass(user: User): string {
    if (user.isAdmin)
      return 'badge-red';
    return 'badge-yellow';
  }
}
