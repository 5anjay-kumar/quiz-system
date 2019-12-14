import { Observable } from "rxjs";
import { environment } from "./../../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TeacherService {
  constructor(private http: HttpClient) {}
  headers = new HttpHeaders().set("Content-Type", "application/json");

  getTeachers() {
    return this.http.get(environment.apiBaseUrl + "/admin/teachers").pipe(
      map((data: any) => {
        // console.log(response);
        return data;
      })
    );
  }

  addTeacher(data): Observable<any> {
    return this.http.post(environment.apiBaseUrl + "/admin/teachers", data);
  }

  addTeacherSubject(data): Observable<any> {
    return this.http.post(
      environment.apiBaseUrl + "/admin/teachers/subjects",
      data
    );
  }

  getTeacherSubjects(teacherId: string) {
    return this.http.get(
      environment.apiBaseUrl + "/admin/teachers/" + teacherId + "/subjects"
    );
  }

  // Update employee
  updateTeacher(id, data): Observable<any> {
    return this.http
      .put(environment.apiBaseUrl + "/admin/teachers/" + id, data, {
        headers: this.headers
      })
      .pipe();
  }

  getTeacherById(id): Observable<any> {
    return this.http
      .get(environment.apiBaseUrl + "/admin/teachers/" + id, {
        headers: this.headers
      })
      .pipe(
        map((result: Response) => {
          return result || {};
        })
      );
  }
}
