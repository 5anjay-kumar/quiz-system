import { LoginComponent } from "./public/login/login.component";
import { PublicComponent } from "./public/public.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "",
    component: PublicComponent,
    children: [
      {
        path: "login",
        component: LoginComponent
      }
    ]
  },
  {
    path: "admin",
    loadChildren: () =>
      import("../app/admin/admin.module").then(m => m.AdminModule)
  },
  {
    path: "teacher",
    loadChildren: () =>
      import("../app/teacher/teacher.module").then(m => m.TeacherModule)
  },
  {
    path: "student",
    loadChildren: () =>
      import("../app/student/student.module").then(m => m.StudentModule)
  },
  { path: "**", redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
