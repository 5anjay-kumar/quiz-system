import { BatchService } from './services/batch.service';
import { SubjectService } from './services/subject.service';
import { TeacherService } from './services/teacher.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [TeacherService, SubjectService, BatchService]
})
export class CoreModule { }
