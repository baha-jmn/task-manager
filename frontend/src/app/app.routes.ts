import { Routes } from '@angular/router';
import { TaskListComponent } from './features/tasks/components/task-list/task-list.component';
import { authGuard } from './core/guards/auth.guard';
import { TaskFormComponent } from './features/tasks/components/task-form/task-form.component';

export const routes: Routes = [
    {
        path: 'tasks',
        component: TaskListComponent,
        canActivate: [authGuard]
    },
    {
        path: 'tasks/new',
        component: TaskFormComponent
    },
    {
        path: 'tasks/edit/:id',
        component: TaskFormComponent
    },
    {
        path: '**',
        redirectTo: 'tasks'
    }
];
