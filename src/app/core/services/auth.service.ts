import { LoginUser } from "./../model/login-user";
import { constants } from "./../../app.constants";
import { map } from "rxjs/operators";
import { environment } from "./../../../environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public static isAuthenticated(): boolean {
    const user = AuthService.getLoginUser();
    if (user) {
      const jwtHelper = new JwtHelperService();
      const token = user.token;
      if (jwtHelper.isTokenExpired(token)) {
        AuthService.logout();
        return false;
      } else {
        return true;
      }
    }
    return false;
  }

  public static logout(): boolean {
    if (localStorage.getItem(constants.localStorageUserLoginKey)) {
      localStorage.removeItem(constants.localStorageUserLoginKey);
      // EmitterUtil.get(constants.events.navigation).emit(constants.pageUrl.login);
      return true;
    }
    return false;
  }

  public static getTokenExpiry(): number {
    const user = AuthService.getLoginUser();
    let date: number;
    if (user) {
      const jwtHelper = new JwtHelperService();
      const token = user.token;
      date = jwtHelper.getTokenExpirationDate(token).valueOf();
      return date;
    }
    date = new Date(0).valueOf();
    return date;
  }

  public static getToken(): string {
    if (AuthService.isAuthenticated()) {
      return AuthService.getLoginUser().token;
    }

    return "";
  }

  public static getLoginUser(): LoginUser {
    const storedLoginUser = JSON.parse(
      localStorage.getItem(constants.localStorageUserLoginKey)
    );
    return storedLoginUser ? storedLoginUser : null;
  }

  private static getDecodedToken(token: any) {
    const jwtHelper = new JwtHelperService();
    const decodedToken: any = jwtHelper.decodeToken(token);
    return decodedToken;
  }

  public addLoginUserInLocalStorage(response: any): LoginUser {
    const loggedInUser = this.buildLoginUser(response.token);
    localStorage.setItem(
      constants.localStorageUserLoginKey,
      JSON.stringify(loggedInUser)
    );
    return loggedInUser;
  }

  private buildLoginUser(token: any): LoginUser {
    const decodedToken: any = AuthService.getDecodedToken(token);
    const loginUser = new LoginUser(
      decodedToken.id,
      decodedToken.firstName,
      decodedToken.lastName,
      decodedToken.email,
      decodedToken.exp,
      token,
      decodedToken.role
    );

    return loginUser;
  }

  login(data) {
    return this.http.post(constants.apiUrl.login, data).pipe(
      map((response: any) => {
        // localStorage.setItem("bq-auth", response.token);
        console.log(response.token);
        return this.addLoginUserInLocalStorage(response);
      })
    );
  }
}
