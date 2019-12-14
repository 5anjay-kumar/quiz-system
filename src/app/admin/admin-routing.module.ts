import { StudentComponent } from './register/student/student.component';
import { AdminComponent } from "./admin.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BatchComponent } from './register/batch/batch.component';
import { SubjectComponent } from "./register/subject/subject.component";
import { TeacherComponent } from "./register/teacher/teacher.component";

const appRoutes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      {
        path: "student",
        component: StudentComponent
      },
      {
        path: "teacher",
        component: TeacherComponent
      },
      {
        path: "subject",
        component: SubjectComponent
      },
      {
        path: "batch",
        component: BatchComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
