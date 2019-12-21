import { AppService } from './../services/app.service';
import { AuthService } from './../services/auth.service';
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (AuthService.isAuthenticated()) {
        const loggedInUser = AuthService.getLoginUser();
        const landingPage = AppService.getDefaultRouteForLoggedInUser(loggedInUser);

        if (state.url.startsWith("/login")) {
            this.router.navigate([landingPage]);
            return false;
        }

        if (next.data.role !== loggedInUser.role) {
          this.router.navigate([landingPage]);
          return false;
        }
    } else if (state.url && !state.url.startsWith("/login")) {
        this.router.navigate(["/login"], { queryParams: next.queryParams });
        return false;
    }
    return true;
  }
}
