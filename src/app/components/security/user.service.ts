import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../../shared/models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
  ) { }
  private subject = new Subject<User>();
  sendMessage(user: any) {
    this.subject.next(user);
  }


  onMessage(): Observable<User> {
    return this.subject.asObservable();
  }
}
