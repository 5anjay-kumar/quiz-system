import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BatchService {
  headers = new HttpHeaders().set("Content-Type", "application/json");
  constructor(private http: HttpClient) {}

  getBatches() {
    return this.http.get("/admin/batches").pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  addBatch(data): Observable<any> {
    return this.http.post("/admin/batches", data);
  }

  updateBatch(data): Observable<any> {
    return this.http
      .put("/admin/batches/" + data._id, data, {
        headers: this.headers
      })
      .pipe();
  }
}
