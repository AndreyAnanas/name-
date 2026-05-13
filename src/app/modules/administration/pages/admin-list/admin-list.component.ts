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

   newAdmin = {
    login: '',
    password: '',
    is_active: true,
    birth_date: ''
  };

  constructor(private adminService: AdminService) {
    this.loadAdmins();
  }

  loadAdmins() {
    this.adminService.getAdmins().subscribe({
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
    this.newAdmin = { login: '', password: '', is_active: true, birth_date: '' };
  }

  onAdminSelect(admin: any) {
    this.asideIndex = 2;
    this.selectedAdmin = admin;
  }
  onSubmitAdmin() {
    const data = {
      admin_login: this.newAdmin.login,
      admin_password: this.newAdmin.password,
      is_active_admin: this.newAdmin.is_active,
      admin_birth_date: this.newAdmin.birth_date || null
    };
    this.adminService.createAdmin(data).subscribe({
      next: () => {
        this.loadAdmins(); 
        this.onAddAdminBtn();
      },
      error: (err) => console.error('Ошибка создания', err)
    });
  }
}
