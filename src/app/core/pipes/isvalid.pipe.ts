import { Pipe, PipeTransform } from "@angular/core";

/**
 * Usage: <div *ngIf="userForm.controls.name | isvalid: ['required']" class="form-control-feedback">Name is required</div>
 */

@Pipe({
  name: "isvalid",
  pure: false
})
export class IsvalidPipe implements PipeTransform {
  transform(control: any, validations?: string[]): boolean {
    let validationFlag = false;
    validations.forEach((validation, index) => {
      if (control) {
        if (control.hasError(validation) && control.dirty) {
          validationFlag = true;
          return;
        }
      }
    });

    return validationFlag;
  }
}
