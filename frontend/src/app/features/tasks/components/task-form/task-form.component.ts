import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Task } from '../../../../core/models/task.model';
import { TaskService } from '../../../../core/services/task.service';


@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task | null = null;
  @Output() submit = new EventEmitter<Task>();

  DEFAULT_TASK: Task = {
    id: '',
    title: '',
    description: '',
    status: 'TODO',
    priority: 3,
    dueDate: ''
  };

  title = this.DEFAULT_TASK.title;
  description = this.DEFAULT_TASK.description;
  status = this.DEFAULT_TASK.status;
  priority = this.DEFAULT_TASK.priority;
  dueDate = this.DEFAULT_TASK.dueDate;

  constructor(
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.initializeTask();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && changes['task'].currentValue) {
      this.initializeTask();
    }
  }

  initializeTask() {
    if (this.task) {
      this.title = this.task.title;
      this.description = this.task.description;
      this.status = this.task.status;
      this.priority = this.task.priority;
      this.dueDate = this.task.dueDate;
    } else {
      this.resetFields();
    }
  }

  resetFields() {
    this.title = this.DEFAULT_TASK.title;
    this.description = this.DEFAULT_TASK.description;
    this.status = this.DEFAULT_TASK.status;
    this.priority = this.DEFAULT_TASK.priority;
    this.dueDate = this.DEFAULT_TASK.dueDate;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const task: Task = {
        id: this.task?.id || '',
        title: this.title,
        description: this.description,
        status: this.status,
        priority: this.priority,
        dueDate: this.dueDate
      };
      this.submit.emit(task);
      form.resetForm();
    }
  }

}
