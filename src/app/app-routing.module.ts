import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AdminListComponent } from './modules/administration/pages/admin-list/admin-list.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/pages-routing.module').then(module => module.PagesRoutingModule)
  },
  // { 
  //   path: 'admin-list', 
  //   component: AdminListComponent },
  { 
    path: '', 
    redirectTo: '/admins', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})  
export class AppRoutingModule { }