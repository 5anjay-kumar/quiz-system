import { StudentRoutingModule } from './student-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { ShowQuizComponent } from './show-quiz/show-quiz.component';
import { AttemptQuizComponent } from './attempt-quiz/attempt-quiz.component';
import { ShowMarksComponent } from './show-marks/show-marks.component';



@NgModule({
  declarations: [StudentComponent, ShowQuizComponent, AttemptQuizComponent, ShowMarksComponent],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
