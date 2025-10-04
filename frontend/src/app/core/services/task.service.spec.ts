import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Task } from '../models/task.model';
import { environment } from '../../../environments/environment.dev';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  const mockTasks: Task[] = [
    { id: '1', title: 'Task 1', description: '', status: 'TODO', priority: 1, dueDate: '2025-10-01' },
    { id: '2', title: 'Task 2', description: '', status: 'IN_PROGRESS', priority: 2, dueDate: '2025-10-02' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskService,
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch all tasks', () => {
    service.getAllTasks();

    const req = httpMock.expectOne(`${environment.apiUrl}/tasks`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);

    expect(service.tasks()).toEqual(mockTasks);
  });


  it('should create a task', () => {
    const newTask: Task = { id: '3', title: 'Task 3', description: '', status: 'TODO', priority: 3, dueDate: '2025-10-03' };
    service.createTask(newTask).subscribe(task => {
      expect(task).toEqual(newTask);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/tasks`);
    expect(req.request.method).toBe('POST');
    req.flush(newTask);
  });
});
