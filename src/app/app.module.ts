import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './_modules/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from "ngx-spinner";
import { FileUploadModule } from 'ng2-file-upload';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TimeagoModule, TimeagoIntl, TimeagoFormatter, TimeagoCustomFormatter  } from 'ngx-timeago';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorBarComponent } from './_snackbars/error-bar/error-bar.component';
import { SuccessBarComponent } from './_snackbars/success-bar/success-bar.component';
import { SnackBarService } from './_services/snack-bar.service';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MembersService } from './_services/members.service';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { TextImputComponent } from './_forms/text-imput/text-imput.component';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { LoginDialogComponent } from './modals/login-dialog/login-dialog.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';
import { PresenceService } from './_services/presence.service';
// import { MemberDetailedResolver } from './_resolvers/member-detailed.resolver';

export class MyIntl extends TimeagoIntl {
  // do extra stuff here...
  }

@NgModule({
  declarations: [	
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent,
    TestErrorsComponent,
    ErrorBarComponent,
    SuccessBarComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberCardComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TextImputComponent,
    MemberMessagesComponent,
    LoginDialogComponent,
    HasRoleDirective,
    AdminPanelComponent,
    PhotoManagementComponent,
    UserManagementComponent,
    RolesModalComponent

   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    NgxGalleryModule,
    NgxSpinnerModule,
    FileUploadModule,
    ReactiveFormsModule,
    ButtonsModule,
    TimeagoModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AccountService,
    MembersService,
    SnackBarService,
    PresenceService,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
