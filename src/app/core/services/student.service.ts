import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "./../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class StudentService {
  headers = new HttpHeaders().set("Content-Type", "application/json");
  constructor(private http: HttpClient) {}
  getStudent() {
    return this.http.get(environment.apiBaseUrl + "/admin/students").pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getStudentsByBatch(batchId: string) {
    return this.http
      .get(environment.apiBaseUrl + "/admin/students/bybatch?batch=" + batchId)
      .pipe(
        map((data: any) => {
          // console.log(response);
          return data;
        })
      );
  }

  addStudent(data): Observable<any> {
    return this.http.post(environment.apiBaseUrl + "/admin/students", data);
  }

  updateStudent(data): Observable<any> {
    return this.http
      .put(environment.apiBaseUrl + "/admin/students/" + data._id, data, {
        headers: this.headers
      })
      .pipe();
  }

  deleteStudent(data): Observable<any> {
    return this.http
      .delete(environment.apiBaseUrl + "/admin/students/" + data._id, {
        headers: this.headers
      })
      .pipe();
  }
}
