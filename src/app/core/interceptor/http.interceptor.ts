import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";

import { Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { constants } from "../../app.constants";
import { AuthService } from "../services/auth.service";
import { environment } from "../../../environments/environment";

@Injectable()
export class InterceptedHttp implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    request = this.cloneRequest(request);

    return next.handle(request).pipe(
      catchError(this.onCatch),
      tap(
        (res: any) => {
          if (res.type !== 0) {
            this.onSuccess(res);
          }
        },
        (error: any) => {
          this.onError(error);
        }
      )
    );
  }

  private cloneRequest(request: HttpRequest<any>): HttpRequest<any> {
    const headerKeys = constants.apiRequestHeaderKeys;
    const defaultHeaderOptions = constants.apiRequestHeaders.default;

    request = request.clone({ headers: request.headers.set(headerKeys.ifModifiedSince, defaultHeaderOptions.ifModifiedSince)});
    request = request.clone({ headers: request.headers.set(headerKeys.cacheControl, defaultHeaderOptions.cacheControl)});
    request = request.clone({ headers: request.headers.set(headerKeys.pragma, defaultHeaderOptions.pragma)});

    if (AuthService.isAuthenticated()) {
      const token = AuthService.getToken();
      request = request.clone({ headers: request.headers.set(headerKeys.authorization, "Bearer " + token)});
      request = request.clone({ headers: request.headers.set(headerKeys.authToken, "Bearer " + token) });
    }

    request = request.clone({ url: environment.apiBaseUrl + request.url });
    return request;
  }

  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    return Observable.throw(error.error);
  }

  private onSuccess(response: Response): void {
    console.log("");
  }

  private onError(error: any): void {
    if (error.status === 400) {
      const body = error;
      console.error(body);
    }
  }
}
