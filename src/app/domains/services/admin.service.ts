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
  return this.http.get(this.api, { withCredentials: true });
  }

  getAdminById(id: number) {
    return this.http.get<Admin>(`${this.api}/${id}`, { withCredentials: true });
  }

  createAdmin(data: any) {  
    return this.http.post(this.api, data, { withCredentials: true });
  }

  updateAdmin(id: number, data: any) {
  // Отправляем только те поля, которые реально можно обновить
  const payload: any = {};
  
  if (data.admin_login) payload.admin_login = data.admin_login;
  if (data.is_active !== undefined) payload.is_active_admin = data.is_active;
  if (data.admin_birth_date) payload.admin_birth_date = data.admin_birth_date;
  
  return this.http.patch(`${this.api}/${id}`, data, { withCredentials: true });
}

 deleteAdmin(id: number, hard: boolean = false) {
    return this.http.delete(`${this.api}/${id}`, { 
      params: { hard },
      withCredentials: true 
    });
  }
}