import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  private toastSubject = new Subject<string>();

  toast$ = this.toastSubject.asObservable();

  show(message: string): void {
    this.toastSubject.next(message);
  }
}
