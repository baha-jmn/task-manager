import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

declare var bootstrap: any;

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit {
  message = '';

  constructor(
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.toastService.toast$.subscribe(msg => {
      this.message = msg;
      this.showToast();
    });
  }

  showToast() {
    const toastEl = document.getElementById('liveToast');
    if (toastEl) {
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    }
  }

}
