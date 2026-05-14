import { Component, EventEmitter, Output } from '@angular/core';
import { AdminService } from '../../../../domains/services/admin.service';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent {
  @Output() close = new EventEmitter();
  @Output() saved = new EventEmitter();
  
  admin: any = {};

  constructor(private adminService: AdminService) {}

  saveAdmin() {
    this.adminService.updateAdmin(this.admin.id, this.admin).subscribe({
      next: () => {
        this.saved.emit();
        this.closeModal();
      },
      error: (err) => console.error('Ошибка', err)
    });
  }

  closeModal() {
    this.close.emit();
  }
}