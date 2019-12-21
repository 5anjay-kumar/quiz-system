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
    return this.http.get("/admin/teachers").pipe(
      map((data: any) => {
        // console.log(response);
        return data;
      })
    );
  }

  addTeacher(data): Observable<any> {
    return this.http.post("/admin/teachers", data);
  }

  addTeacherSubject(data): Observable<any> {
    return this.http.post(
      "/admin/teachers/subjects",
      data
    );
  }

  getTeacherSubjects(teacherId: string) {
    return this.http.get(
      "/admin/teachers/" + teacherId + "/subjects"
    );
  }

  // Update employee
  updateTeacher(data): Observable<any> {
    return this.http
      .put("/admin/teachers/" + data._id, data, {
        headers: this.headers
      })
      .pipe();
  }

  updateTeacherSubject(data): Observable<any> {
    return this.http
      .put("/admin/teachers/" + data._id, data, {
        headers: this.headers
      })
      .pipe();
  }
}
