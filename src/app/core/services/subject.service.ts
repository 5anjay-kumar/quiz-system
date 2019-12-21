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
    return this.http.get("/admin/subjects").pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  addSubject(data): Observable<any> {
    return this.http.post("/admin/subjects", data);
  }

  updateSubject(data): Observable<any> {
    return this.http
      .put("/admin/subjects/" + data._id, data, {
        headers: this.headers
      })
      .pipe();
  }
}
