import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { DecoratorHomeComponent } from './decorator-home/decorator-home.component';
import { OwnerHomeComponent } from './owner-home/owner-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminAddCompanyComponent } from './admin-add-company/admin-add-company.component';
import { AdminAddDecoratorComponent } from './admin-add-decorator/admin-add-decorator.component';
import { AdminUpdateUserComponent } from './admin-update-user/admin-update-user.component';
import { AdminUserAcceptDenyComponent } from './admin-user-accept-deny/admin-user-accept-deny.component';
import { OwnerCompaniesComponent } from './owner-companies/owner-companies.component';
import { OwnerBookingComponent } from './owner-booking/owner-booking.component';
import { OwnerMaintenanceComponent } from './owner-maintenance/owner-maintenance.component';
import { DecoratorBookingComponent } from './decorator-booking/decorator-booking.component';
import { DecoratorMaintenanceComponent } from './decorator-maintenance/decorator-maintenance.component';
import { DecoratorGraphsComponent } from './decorator-graphs/decorator-graphs.component';
import { RegistrationComponent } from './registration/registration.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CompanyInfoComponent } from './company-info/company-info.component';

const routes: Routes = [
  {path : '', component : HomePageComponent},
  {path : 'login', component : LoginUserComponent},
  {path : 'loginAdmin', component : LoginAdminComponent},
  {path : 'registration', component : RegistrationComponent},
  {path : 'changePassword', component : ChangePasswordComponent},
  {path : 'companyInfo/:naziv', component : CompanyInfoComponent},
  //ADMIN
  {path : 'admin', component : AdminHomeComponent},
  {path : 'addCompany', component : AdminAddCompanyComponent},
  {path : 'addDecorator', component : AdminAddDecoratorComponent},
  {path : 'updateUser', component : AdminUpdateUserComponent},
  {path : 'newUsers', component : AdminUserAcceptDenyComponent},
  //OWNER
  {path : 'owner', component : OwnerHomeComponent},
  {path : 'ownerCompanies', component : OwnerCompaniesComponent},
  {path : 'ownerBooking', component : OwnerBookingComponent},
  {path : 'ownerMaintenance', component : OwnerMaintenanceComponent},
  //DECORATOR
  {path : 'decorator', component : DecoratorHomeComponent},
  {path : 'decoratorBooking', component : DecoratorBookingComponent},
  {path : 'decoratorMaintenance', component : DecoratorMaintenanceComponent},
  {path : 'decoratorGraphs', component : DecoratorGraphsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
