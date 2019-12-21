import { LoginComponent } from "./public/login/login.component";
import { PublicComponent } from "./public/public.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from './core/gaurd/auth.guard';

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
    ],
    canActivate: [AuthGuard]
  },
  {
    path: "admin",
    loadChildren: () =>
      import("../app/admin/admin.module").then(m => m.AdminModule),
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },
  {
    path: "teacher",
    loadChildren: () =>
      import("../app/teacher/teacher.module").then(m => m.TeacherModule),
    canActivate: [AuthGuard],
    data: { role: 'teacher' }
  },
  {
    path: "student",
    loadChildren: () =>
      import("../app/student/student.module").then(m => m.StudentModule),
    canActivate: [AuthGuard],
    data: { role: 'student' }
  },
  { path: "**", redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
