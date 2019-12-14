import { IsvalidPipe } from './pipes/isvalid.pipe';
import { BatchService } from './services/batch.service';
import { SubjectService } from './services/subject.service';
import { TeacherService } from './services/teacher.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";



@NgModule({
  declarations: [IsvalidPipe],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [TeacherService, SubjectService, BatchService],
  exports: [IsvalidPipe]
})
export class CoreModule { }
