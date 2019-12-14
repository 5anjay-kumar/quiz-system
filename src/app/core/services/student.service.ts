import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) {}
  getStudent() {
    return this.http.get(environment.apiBaseUrl + "/admin/students").pipe(
      map((data: any) => {
        // console.log(response);
        return data;
      })
    );
  }

  addStudent(data): Observable<any> {
    return this.http
      .post(environment.apiBaseUrl + "/admin/students", data);
  }

  addStudentBatch(data): Observable<any> {
    return this.http
      .post(environment.apiBaseUrl + "/admin/students/batches", data);
  }

  getStudentBatches(studentId: string) {
    return this.http.get(environment.apiBaseUrl + "/admin/students/" + studentId + "/batches");
  }
}
