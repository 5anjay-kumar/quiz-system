import { environment } from "./../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BatchService {
  headers = new HttpHeaders().set("Content-Type", "application/json");
  constructor(private http: HttpClient) {}

  getBatches() {
    return this.http.get(environment.apiBaseUrl + "/admin/batches").pipe(
      map((data: any) => {
        // console.log(response);
        return data;
      })
    );
  }

  addBatch(data): Observable<any> {
    return this.http.post(environment.apiBaseUrl + "/admin/batches", data);
  }

  updateBatch(data): Observable<any> {
    return this.http
      .put(environment.apiBaseUrl + "/admin/batches/" + data._id, data, {
        headers: this.headers
      })
      .pipe();
  }
}
