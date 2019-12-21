import { CoreModule } from "./core/core.module";
import { PopupService } from "./core/services/popup.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./public/login/login.component";
import { PublicComponent } from "./public/public.component";
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { RegisterTeacherComponent } from "./shared/register-teacher/register-teacher.component";
import { RegisterBatchComponent } from "./shared/register-batch/register-batch.component";
import { AddTeacherSubjectComponent } from "./shared/add-teacher-subject/add-teacher-subject.component";
import { RegisterSubjectComponent } from "./shared/register-subject/register-subject.component";
import { RegisterStudentComponent } from "./shared/register-student/register-student.component";
import { ConfirmationComponent } from './shared/confirmation/confirmation.component';
import { QuestionComponent } from './shared/question/question.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PublicComponent,
    HeaderComponent,
    FooterComponent,
    RegisterTeacherComponent,
    RegisterBatchComponent,
    AddTeacherSubjectComponent,
    RegisterSubjectComponent,
    RegisterStudentComponent,
    ConfirmationComponent,
    QuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    CoreModule
  ],
  entryComponents: [
    RegisterTeacherComponent,
    RegisterBatchComponent,
    AddTeacherSubjectComponent,
    RegisterSubjectComponent,
    RegisterStudentComponent,
    ConfirmationComponent,
    QuestionComponent
  ],
  providers: [PopupService],
  bootstrap: [AppComponent]
})
export class AppModule {}
