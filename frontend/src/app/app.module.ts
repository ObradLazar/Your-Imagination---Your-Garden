import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { OwnerHomeComponent } from './owner-home/owner-home.component';
import { DecoratorHomeComponent } from './decorator-home/decorator-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { MenuOwnerComponent } from './menu-owner/menu-owner.component';
import { MenuDecoratorComponent } from './menu-decorator/menu-decorator.component';
import { AdminUpdateUserComponent } from './admin-update-user/admin-update-user.component';
import { AdminUserAcceptDenyComponent } from './admin-user-accept-deny/admin-user-accept-deny.component';
import { AdminAddDecoratorComponent } from './admin-add-decorator/admin-add-decorator.component';
import { AdminAddCompanyComponent } from './admin-add-company/admin-add-company.component';
import { OwnerCompaniesComponent } from './owner-companies/owner-companies.component';
import { OwnerBookingComponent } from './owner-booking/owner-booking.component';
import { OwnerMaintenanceComponent } from './owner-maintenance/owner-maintenance.component';
import { DecoratorBookingComponent } from './decorator-booking/decorator-booking.component';
import { DecoratorMaintenanceComponent } from './decorator-maintenance/decorator-maintenance.component';
import { DecoratorGraphsComponent } from './decorator-graphs/decorator-graphs.component';
import { RegistrationComponent } from './registration/registration.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CompanyInfoComponent } from './company-info/company-info.component'

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginUserComponent,
    LoginAdminComponent,
    OwnerHomeComponent,
    DecoratorHomeComponent,
    AdminHomeComponent,
    MenuAdminComponent,
    MenuOwnerComponent,
    MenuDecoratorComponent,
    AdminUpdateUserComponent,
    AdminUserAcceptDenyComponent,
    AdminAddDecoratorComponent,
    AdminAddCompanyComponent,
    OwnerCompaniesComponent,
    OwnerBookingComponent,
    OwnerMaintenanceComponent,
    DecoratorBookingComponent,
    DecoratorMaintenanceComponent,
    DecoratorGraphsComponent,
    RegistrationComponent,
    ChangePasswordComponent,
    CompanyInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
