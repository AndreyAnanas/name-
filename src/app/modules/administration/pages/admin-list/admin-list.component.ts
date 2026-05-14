import { Component, ChangeDetectorRef } from '@angular/core';
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
    login: '',
    password: '',
    is_active: true,
    birth_date: ''
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
      console.log('Ответ от сервера:', res);
      
      let adminsArray = res.admins || res || [];
      
      // Создаём массив ТОЛЬКО с нужными полями для отображения в таблице
      this.admins = adminsArray.map((admin: any) => ({
        id: admin.admin_id || admin.id,
        login: admin.admin_login || admin.login,
        email: admin.email || '',
        role: admin.role || 'admin',
        is_active: (admin.is_active_admin || admin.is_active) ? 'Да' : 'Нет',
        birth_date: admin.admin_birth_date || admin.birth_date || '',
        created_at: admin.created_at || ''
      }));
      
      console.log('После преобразования:', this.admins);
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Ошибка загрузки админов', err);
      this.admins = [];
    }
  });
}

  onAddAdminBtn() {
    this.asideIndex = 1;
    this.selectedAdmin = null;
    this.newAdmin = { login: '', password: '', is_active: true, birth_date: '' };
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
      login: this.newAdmin.login,
      password: this.newAdmin.password,
      is_active: this.newAdmin.is_active ? 1 : 0,
      birth_date: this.newAdmin.birth_date || null
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
  const adminId = this.selectedAdmin.admin_id || this.selectedAdmin.id;
  
  console.log('ID админа для обновления:', adminId);
  console.log('Список админов:', this.admins);

  const adminFromList = this.admins.find(a => (a.admin_id || a.id) === adminId);
  
  if (!adminFromList) {
    console.error('Админ не найден в списке!');
    alert('Ошибка: не удалось найти админа в списке');
    return;
  }
  
  console.log('Найденный админ из списка:', adminFromList);
  
  // Берём пароль из найденного админа (хеш)
  const existingPassword = adminFromList.admin_password || adminFromList.admin_password_hash || "";

  const updateData = {
    admin_id: adminId,
    admin_login: this.selectedAdmin.admin_login || this.selectedAdmin.login,
    admin_password: existingPassword,  // ← отправляем существующий пароль
    email: this.selectedAdmin.email,
    role: this.selectedAdmin.role,
    is_active_admin: (this.selectedAdmin.is_active_admin ?? this.selectedAdmin.is_active) ? 1 : 0,
    admin_birth_date: this.selectedAdmin.admin_birth_date || this.selectedAdmin.birth_date
  };
  
  console.log('Отправляем на бэкенд:', updateData);

  this.adminService.updateAdmin(adminId, updateData).subscribe({
    next: (res: any) => {
      console.log('Успешно обновлено!', res);
      this.loadAdmins();
      this.onCancelEdit();
    },
    error: (err: any) => {
      console.error('Ошибка при обновлении:', err);
      alert('Ошибка при обновлении админа!');
    }
  });
}
}
