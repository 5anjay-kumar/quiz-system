import { TeacherRoutingModule } from './teacher-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherComponent } from './teacher.component';
import { CreateQuizComponent } from './quiz/create-quiz/create-quiz.component';
import { QuestionsComponent } from './quiz/create-quiz/questions/questions.component';
import { AnswersComponent } from './quiz/create-quiz/questions/answers/answers.component';



@NgModule({
  declarations: [TeacherComponent, CreateQuizComponent, QuestionsComponent, AnswersComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule
  ]
})
export class TeacherModule { }
