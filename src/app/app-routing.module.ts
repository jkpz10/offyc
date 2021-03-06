import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// Logins
import { LoginComponent } from './login/login.component';
import { LoginRegLayoutComponent } from './login-reg-layout/login-reg-layout.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';

// Pages test
import { HomeComponent } from './pages/home/home.component';
import { RecordsComponent } from './pages/records/records.component';
import { AdminComponent } from './admin/admin.component';
import { AssesmentComponent } from './pages/assesment/assesment.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { CookieService } from 'ngx-cookie-service';
import { FileSettingsComponent } from './pages/file-settings/file-settings.component';

// let cookies : LoginComponent ;
// let id = cookies.username;
// let id: CookieService;


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '', component: LoginRegLayoutComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  {
    path: ':id',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: HomeComponent
      },
      {
        path: 'records',
        component: RecordsComponent
      },
      {
        path: 'assesment',
        component: AssesmentComponent
      },
      {
        path: 'notification',
        component: NotificationComponent
      },
      {
        path: 'fileSettings',
        component: FileSettingsComponent
      },
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CookieService]
})
export class AppRoutingModule { }
// tslint:disable-next-line:max-line-length
export const routingComponents = [LoginComponent, RegisterComponent, AdminComponent, HomeComponent, RecordsComponent, AssesmentComponent, NotificationComponent, FileSettingsComponent, PageNotFoundComponent];
