import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "./../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SubjectService {
  constructor(private http: HttpClient) {}
  headers = new HttpHeaders().set("Content-Type", "application/json");

  getSubjects() {
    return this.http.get(environment.apiBaseUrl + "/admin/subjects").pipe(
      map((data: any) => {
        // console.log(response);
        return data;
      })
    );
  }

  addSubject(data): Observable<any> {
    return this.http.post(environment.apiBaseUrl + "/admin/subjects", data);
  }

  updateSubject(data): Observable<any> {
    return this.http.put(
      environment.apiBaseUrl + "/admin/subjects/" + data._id,
      data,
      {
        headers: this.headers
      }
    ).pipe();
  }

  deleteSubject(data): Observable<any> {
    return this.http
      .delete(environment.apiBaseUrl + "/admin/subjects/" + data._id, {
        headers: this.headers
      })
      .pipe();
  }

}
