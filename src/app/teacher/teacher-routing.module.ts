import { QuestionsComponent } from './quiz/create-quiz/questions/questions.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CreateQuizComponent } from "./quiz/create-quiz/create-quiz.component";
import { TeacherComponent } from "./teacher.component";

const appRoutes: Routes = [
  {
    path: "",
    component: TeacherComponent,
    children: [
      {
        path: "create-quiz",
        component: CreateQuizComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {}
