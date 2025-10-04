import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { computed, Injectable, Signal, signal } from '@angular/core';
import { environment } from '../../../environments/environment.dev';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasksApiUrl = `${environment.apiUrl}/tasks`;

  private _tasks = signal<Task[]>([]);
  tasks: Signal<Task[]> = computed(() => this._tasks());

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient
  ) { }


  getAllTasks() {
    this.http.get<Task[]>(this.tasksApiUrl, { headers: this.headers }).subscribe({
      next: (tasks) => this._tasks.set(tasks),
      error: (err) => console.error('Error loading tasks', err)
    });
  }

  getTasks(filters?: {
    status?: string;
    priority?: number;
    search?: string;
    sortBy?: string;
    sortDir?: string;
    dueDateFrom?: string;
    dueDateTo?: string;
  }) {
    let params = new HttpParams();

    if (filters) {
      if (filters.status) params = params.set('status', filters.status);
      if (filters.priority !== undefined) params = params.set('priority', filters.priority.toString());
      if (filters.search) params = params.set('search', filters.search);
      if (filters.sortBy) params = params.set('sortBy', filters.sortBy);
      if (filters.sortDir) params = params.set('sortDir', filters.sortDir);
      if (filters.dueDateFrom)
        params = params.set('dueDateStart', filters.dueDateFrom);
      if (filters.dueDateTo)
        params = params.set('dueDateEnd', filters.dueDateTo);
    }

    this.http.get<Task[]>(`${this.tasksApiUrl}/filter`, { params, headers: this.headers }).subscribe({
      next: (tasks) => this._tasks.set(tasks),
      error: (err) => console.error('Error loading tasks with filters', err)
    });
  }

  getTaskById(id: string) {
    return this.http.get<Task>(`${this.tasksApiUrl}/${id}`, { headers: this.headers });
  }

  createTask(task: Task) {
    return this.http.post<Task>(this.tasksApiUrl, task, { headers: this.headers });
  }

  updateTask(task: Task) {
    return this.http.put<Task>(`${this.tasksApiUrl}/${task.id}`, task, { headers: this.headers });
  }

  deleteTask(id: string) {
    return this.http.delete<void>(`${this.tasksApiUrl}/${id}`, { headers: this.headers });
  }
}
