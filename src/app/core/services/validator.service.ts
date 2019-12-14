import { AbstractControl, FormControl, ValidatorFn, Validators, FormArray } from "@angular/forms";

export class ValidatorService {
  public static emailValidator(control: FormControl): { [key: string]: any } {
    const emailRegexp = /^["_A-Za-z0-9-\+]+(\.["_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/i;

    if (control.value && !emailRegexp.test(control.value)) {
      return { invalidEmail: true };
    }
  }

  public static passwordValidator(control: FormControl): { [key: string]: any } {
    const passwordRegexp = /(?=.*[A-Z])(?=.*[0-9])(?=.*[@!$]*)[A-Za-z0-9@!$\-._]{8,}$/;

    if (control.value && !passwordRegexp.test(control.value)) {
      return { invalidPassword: true };
    }
  }

  public static matchWithValidator(toControlName: string) {
    let ctrl: FormControl;
    let toCtrl: FormControl;
    return function matchWith(control: FormControl): { [key: string]: any } {
      if (!control.parent) {
        return null;
      }

      if (!ctrl) {
        ctrl = control;
        toCtrl = control.parent.get(toControlName) as FormControl;

        if (!toCtrl) {
          return null;
        }

        toCtrl.valueChanges.subscribe(() => {
          ctrl.updateValueAndValidity();
        });
      }

      if (ctrl.value !== "" && toCtrl.value !== ctrl.value) {
        return {
          matchWith: true
        };
      }
      return null;
    };
  }

  public static validatePattern(regex: string, validationMessage: string): ValidatorFn {
    const x = (control: FormControl): { [key: string]: any } => {
      const value = control.value;
      if (value) {
        if (!new RegExp(regex, "i").test(value)) {
          return { invalidPattern: validationMessage };
        }
      }
      return null;
    };
    return x;
  }

  // Todo: pass type param to handle multiple types
  public static greaterThan(target: any, label?: string, inverse?: boolean): any {
    const x = (control: FormControl): any => {
      const maxDate = new Date(target);
      const param = { target: label ? label : maxDate };

      const isNotGreaterThanObj = { isNotGreaterThan: { param: param } };
      const isGreaterThanObj = { isGreaterThan: { param: param } };

      if (control.value) {
        const selectedDate: Date = new Date(control.value);
        if (!isNaN(selectedDate.getTime())) {
          if (selectedDate > maxDate) {
            return inverse ? isNotGreaterThanObj : isGreaterThanObj;
          }
        }
      }
    };
    return x;
  }

  // Todo: pass type param to handle multiple types
  public static lessThan(target: any, label?: string, inverse?: boolean): any {
    const x = (control: FormControl): any => {
      const minDate = new Date(target);
      const param = { target: label ? label : minDate };

      const isNotLessThanObj = { isNotLessThan: { param: param } };
      const isLessThanObj = { isLessThan: { param: param } };

      if (control.value) {
        const selectedDate: Date = new Date(control.value);
        if (!isNaN(selectedDate.getTime())) {
          if (selectedDate < minDate) {
            return inverse ? isNotLessThanObj : isLessThanObj;
          }
        }
      }
    };
    return x;
  }

  public static mergeValidators(formControl: AbstractControl, validators: ValidatorFn[]) {
    const existingValidators = formControl.validator;
    validators.unshift(existingValidators);
    formControl.setValidators(Validators.compose(validators));
    formControl.updateValueAndValidity();
  }

  public static getNameValidators(): any[] {
    return [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      ValidatorService.validatePattern("^[A-Za-z ]*$", "Your Name only include letters.")
    ];
  }
}
