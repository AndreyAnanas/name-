import { Component } from '@angular/core';
import { AdminService } from '../../../../domains/services/admin.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent {
  asideIndex: number = 1; // 1 - добавить, 2 - редактировать
  admins: any[] = [];
  selectedAdmin: any = null;

  constructor(private adminService: AdminService) {
    this.loadAdmins();
  }

  loadAdmins() {
    this.adminService.getAdmins(true, 100, 0).subscribe({
      next: (res: any) => {
        this.admins = res.admins || res;
      },
      error: (err) => {
        console.error('Ошибка загрузки админов', err);
      }
    });
  }

  onAddAdminBtn() {
    this.asideIndex = 1;
    this.selectedAdmin = null;
    // тут можно убрать выделение с таблицы, если нужно
  }

  onAdminSelect(admin: any) {
    this.asideIndex = 2;
    this.selectedAdmin = admin;
  }
}
