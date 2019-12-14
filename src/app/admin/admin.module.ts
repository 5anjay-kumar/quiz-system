import { AdminRoutingModule } from "./admin-routing.module";
import { NgModule } from "@angular/core";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from "@angular/common";

import { AdminComponent } from "./admin.component";
import { StudentComponent } from "./register/student/student.component";
import { TeacherComponent } from "./register/teacher/teacher.component";
import { BatchComponent } from "./register/batch/batch.component";
import { SubjectComponent } from "./register/subject/subject.component";
import { NavComponent } from './shared/nav/nav.component';

@NgModule({
  declarations: [
    AdminComponent,
    StudentComponent,
    TeacherComponent,
    BatchComponent,
    SubjectComponent,
    NavComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, NgbModule],
})
export class AdminModule {}
