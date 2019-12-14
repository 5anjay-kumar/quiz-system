import { ShowQuizComponent } from "./show-quiz/show-quiz.component";
import { StudentComponent } from "./student.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const appRoutes: Routes = [
  {
    path: "",
    component: StudentComponent,
    children: [
      {
        path: "show-quiz",
        component: ShowQuizComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}
