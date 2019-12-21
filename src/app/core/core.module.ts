import { EmitterService } from './services/emitter.service';
import { InterceptedHttp } from './interceptor/http.interceptor';
import { AuthGuard } from './gaurd/auth.guard';
import { IsvalidPipe } from './pipes/isvalid.pipe';
import { BatchService } from './services/batch.service';
import { SubjectService } from './services/subject.service';
import { TeacherService } from './services/teacher.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";



@NgModule({
  declarations: [IsvalidPipe],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    EmitterService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptedHttp,
      multi: true
    }
  ],
  exports: [IsvalidPipe]
})
export class CoreModule { }
