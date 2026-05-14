import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../modules/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private api = '/api/admins';

  constructor(private http: HttpClient) { }

  getAdmins() {
  return this.http.get(this.api);
  }

  getAdminById(id: number) {
    return this.http.get<Admin>(`${this.api}/${id}`);
  }

  createAdmin(data: any) {
    return this.http.post(this.api, data);
  }

  updateAdmin(id: number, data: any): any {
  const payload = {
    admin_id: id,
    admin_login: data.login,
    // admin_password: data.password || "no_change",
    // admin_password_hash: data.password_hash || "",
    email: data.email,
    role: data.role,
    is_active_admin: data.is_active,
    admin_birth_date: data.birth_date
  };
  console.log('Отправляем на бэкенд:', payload);
  return this.http.post(this.api, payload);
}

  deleteAdmin(id: number, hard: boolean = false) {
    return this.http.delete(`${this.api}/${id}`, { params: { hard } });
  }
}