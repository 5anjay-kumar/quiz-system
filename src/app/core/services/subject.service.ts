import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) {}

  getSubjects() {
    return this.http.get(environment.apiBaseUrl + "/admin/subjects").pipe(
      map((data: any) => {
        // console.log(response);
        return data;
      })
    );
  }

  addSubject(data): Observable<any> {
    return this.http
      .post(environment.apiBaseUrl + "/admin/subjects", data);
  }
}
