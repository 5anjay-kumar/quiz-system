import { LoginUser } from './../model/login-user';
import { FormControl, FormGroup } from "@angular/forms";
import * as $_ from "jquery";
import * as _ from "underscore";

const $ = $_;

export class AppService {
  constructor() {}

  public static isUndefinedOrNull(value): boolean {
    return (
      _.isUndefined(value) ||
      _.isNull(value) ||
      _.isEmpty(value) ||
      value.length === 0
    );
  }

  public static isNotUndefinedAndNull(value): boolean {
    return !this.isUndefinedOrNull(value);
  }

  public static isNumber(value): boolean {
    if (this.isUndefinedOrNull(value)) {
      return false;
    }
    return !_.isNaN(value);
  }

  public static markAsDirty(group: FormGroup) {
    group.markAsDirty();
    for (const i in group.controls) {
      if (group.controls[i] instanceof FormControl) {
        group.controls[i].markAsDirty();
        group.controls[i].setErrors(group.controls[i].errors);
      } else if (group.controls[i] instanceof FormGroup) {
        AppService.markAsDirty(group.controls[i] as FormGroup);
      }
    }

    const element: any = $(".form-control.ng-invalid");
    if (element && element.length > 0) {
      element[0].focus();
    }
  }

  public static isDateEqual(startDate: Date, endDate: Date): boolean {
    return this.compareDates(startDate, endDate) === 0;
  }

  private static compareDates(startDate: Date, endDate: Date): number {
    startDate = new Date(
      startDate.getUTCFullYear(),
      startDate.getUTCMonth(),
      startDate.getUTCDate()
    );
    endDate = new Date(
      endDate.getUTCFullYear(),
      endDate.getUTCMonth(),
      endDate.getUTCDate()
    );
    return startDate.getTime() - endDate.getTime();
  }

  public static isEmptyObject(obj) {
    return obj && Object.keys(obj).length === 0;
  }

  public static getAge(birthDate: Date): number {
    const todayDate = new Date();
    let age = todayDate.getFullYear() - birthDate.getFullYear();
    const m = todayDate.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && todayDate.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  public static cloneObject(objectToCopy) {
    return JSON.parse(JSON.stringify(objectToCopy));
  }

  public static scrollTo(className: string): void {
    const elementList = document.querySelectorAll("." + className);
    const element = elementList[0] as HTMLElement;
    element.scrollIntoView({ behavior: "smooth" });
  }

  public static getValueFromHTMLInput(elementName: string): string {
    return $("input[name=" + elementName + "]").val() as string;
  }

  public static roundDecimal(num: number, decimalPlaces: number): number {
    return parseFloat(num.toFixed(decimalPlaces));
  }

  public static getDayMonthYearFromDate(dateStr: string): number[] {
    const date = new Date(dateStr);
    const arr: number[] = [];
    arr.push(date.getDate());
    arr.push(date.getMonth() + 1);
    arr.push(date.getFullYear());
    return arr;
  }

  public static isValidDate(dateObj): boolean {
    const date = new Date(dateObj.year, dateObj.month - 1, dateObj.day);
    return date instanceof Date && !isNaN(date.getTime());
  }

  public static getDefaultRouteForLoggedInUser(loginUser: LoginUser) {
    if (loginUser.role === "admin") {
      return "/admin";
    } else if (loginUser.role === "teacher") {
      return "/teacher";
    } else if (loginUser.role === "student") {
      return "/student";
    }
  }
}
