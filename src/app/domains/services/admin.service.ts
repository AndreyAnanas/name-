import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../modules/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private api = '/api/admins';

  constructor(private http: HttpClient) { }

  getAdmins(includeInactive?: boolean, limit?: number, offset?: number) {
    let params: any = {};
    if (includeInactive !== undefined) params.include_inactive = includeInactive;
    if (limit !== undefined) params.limit = limit;
    if (offset !== undefined) params.offset = offset;
    return this.http.get(this.api, { params });
  }

  getAdminById(id: number) {
    return this.http.get<Admin>(`${this.api}/${id}`);
  }

  createAdmin(data: any) {
    return this.http.post(this.api, data);
  }

  updateAdmin(id: number, data: any) {
    return this.http.patch(`${this.api}/${id}`, data);
  }

  deleteAdmin(id: number, hard: boolean = false) {
    return this.http.delete(`${this.api}/${id}`, { params: { hard } });
  }
}