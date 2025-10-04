import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateFormatPipe } from '../../../../shared/pipes/date-format.pipe';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { TaskService } from '../../../../core/services/task.service';
import { Task } from '../../../../core/models/task.model';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DateFormatPipe,
    LoaderComponent,
    ModalComponent,
    TaskFormComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  tasks: any;
  isLoading = signal(false);

  statusFilter = '';
  priorityFilter: number | '' = '';
  dueDateFrom = '';
  dueDateTo = '';
  searchText = '';
  sortBy = '';
  sortDir = '';

  priorities = [1, 2, 3, 4, 5];

  showTaskForm = signal(false);
  selectedTask: Task | null = null;

  constructor(
    private taskService: TaskService,
    private toastService: ToastService
  ) {
    this.loadTasks();
  }

  ngOnInit() {
    this.tasks = this.taskService.tasks;
  }

  loadTasks() {
    this.isLoading.set(true);
    this.taskService.getAllTasks();
    this.isLoading.set(false);
  }

  applyFilters() {
    this.isLoading.set(true);
    this.taskService.getTasks({
      status: this.statusFilter || undefined,
      priority: this.priorityFilter || undefined,
      dueDateFrom: this.dueDateFrom || undefined,
      dueDateTo: this.dueDateTo || undefined,
      search: this.searchText || undefined,
      sortBy: this.sortBy || undefined,
      sortDir: this.sortDir || 'asc'
    });
    this.isLoading.set(false);
  }

  createTask() {
    this.selectedTask = null;
    this.showTaskForm.set(true);
  }

  editTask(task: Task) {
    this.taskService.getTaskById(task.id).subscribe({
      next: (fetchedTask) => {
        this.selectedTask = fetchedTask;
        this.showTaskForm.set(true);
      },
      error: (err) => console.error('Error loading task by id', err)
    });
  }

  resetFilters() {
    this.statusFilter = '';
    this.priorityFilter = '';
    this.dueDateFrom = '';
    this.dueDateTo = '';
    this.searchText = '';
    this.sortBy = '';
    this.sortDir = '';

    this.applyFilters();
  }

  onTaskFormSubmit(task: Task) {
    this.showTaskForm.set(false);
    if (task.id) {
      this.taskService.updateTask(task).subscribe({
        next: () => {
          this.toastService.show("Task updated successfully!");
          this.loadTasks();
        },
        error: (err) => console.error(err)
      });
    } else {
      this.taskService.createTask(task).subscribe({
        next: () => {
          this.toastService.show("Task created successfully!");
          this.loadTasks();
        },
        error: (err) => console.error(err)
      });
    }
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.toastService.show("Task deleted successfully!");
        this.loadTasks();
      },
      error: (err) => console.error(err)
    });
  }

  statusClass(status: string) {
    return {
      'bg-todo': status === 'TODO',
      'bg-in-progress': status === 'IN_PROGRESS',
      'bg-done': status === 'DONE'
    };
  }

}
