import { Component, ChangeDetectorRef } from '@angular/core';  // ← ДОБАВИЛ ChangeDetectorRef
import { AdminService } from '../../../../domains/services/admin.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent {
  asideIndex: number = 1;
  admins: any[] = [];
  selectedAdmin: any = null;

  newAdmin = {
    admin_login: '',
    admin_password: '',
    is_active_admin: true,
    admin_birth_date: ''
  };

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) {
    this.loadAdmins();
  }

  loadAdmins() {
    this.adminService.getAdmins().subscribe({
      next: (res: any) => {
        this.admins = (res.admins || res).map((admin: any) => ({
          ...admin,
          userId: admin.admin_id
        }));
        console.log('Админы:', this.admins);
        this.cdr.detectChanges(); // принудительное обновление
      },
      error: (err) => {
        console.error('Ошибка загрузки админов', err);
      }
    });
  }

  onAddAdminBtn() {
    this.asideIndex = 1;
    this.selectedAdmin = null;
    this.newAdmin = { 
      admin_login: '', 
      admin_password: '', 
      is_active_admin: true, 
      admin_birth_date: '' 
    };
  }

  onAdminSelect(admin: any) {
    console.log('Выбран админ:', admin);
    this.asideIndex = 2;
    this.selectedAdmin = { ...admin };
  }

  onCancelEdit() {
    this.asideIndex = 1;
    this.selectedAdmin = null;
  }

  onSubmitAdmin() {
    const data = {
      admin_login: this.newAdmin.admin_login,
      admin_password: this.newAdmin.admin_password,
      is_active_admin: this.newAdmin.is_active_admin ? 1 : 0,
      admin_birth_date: this.newAdmin.admin_birth_date || null
    };
    this.adminService.createAdmin(data).subscribe({
      next: () => {
        this.loadAdmins();
        this.onAddAdminBtn();
      },
      error: (err) => console.error('Ошибка создания', err)
    });
  }

  onUpdateAdmin() {
    const adminId = this.selectedAdmin.admin_id;
    console.log('Обновляем админа с ID:', adminId);
    console.log('Данные для обновления:', this.selectedAdmin);
    
    const updateData = {
      admin_login: this.selectedAdmin.admin_login,
      email: this.selectedAdmin.email,
      role: this.selectedAdmin.role,
      is_active_admin: this.selectedAdmin.is_active_admin ? 1 : 0,
      admin_birth_date: this.selectedAdmin.admin_birth_date
    };
    
    this.adminService.updateAdmin(adminId, updateData).subscribe({
      next: (res) => {
        console.log('Успешно обновлено!', res);
        this.loadAdmins();
        this.onCancelEdit();
      },
      error: (err) => {
        console.error('Ошибка при обновлении:', err);
        alert('Ошибка при обновлении админа! Смотри консоль');
      }
    });
  }
}
