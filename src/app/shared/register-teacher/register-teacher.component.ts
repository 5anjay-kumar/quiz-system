import { constants } from './../../app.constants';
import { EmitterService } from './../../core/services/emitter.service';
import { ValidatorService } from "./../../core/services/validator.service";
import { AppService } from "./../../core/services/app.service";
import { TeacherService } from "./../../core/services/teacher.service";
import { Component, OnInit } from "@angular/core";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

@Component({
  selector: "app-register-teacher",
  templateUrl: "./register-teacher.component.html",
  styleUrls: ["./register-teacher.component.css"]
})
export class RegisterTeacherComponent implements OnInit {
  ngModalRef: NgbModalRef;
  teacherRegisterForm: FormGroup;
  data: any;
  isNewRecord = true;

  constructor(private teacherService: TeacherService, public fb: FormBuilder, private emitterService: EmitterService) {}

  ngOnInit() {
    this.mainForm();
  }

  mainForm() {
    this.teacherRegisterForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        ValidatorService.emailValidator
      ]),
      password: new FormControl(null, [Validators.required])
    });

    if (AppService.isNotUndefinedAndNull(this.data)) {
      this.teacherRegisterForm.removeControl("password");
      this.isNewRecord = false;

      this.teacherRegisterForm.setValue({
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        email: this.data.email
      });
    }
  }

  registerTeacher() {
    AppService.markAsDirty(this.teacherRegisterForm);
    if (!this.teacherRegisterForm.valid) {
      return;
    }

    if (this.isNewRecord) {
      this.teacherService.addTeacher(this.teacherRegisterForm.value).subscribe(
        result => {
          console.log("Teacher Added!");
          this.emitterService.emit(constants.events.loadTeachersCount);
          this.ngModalRef.close(result);
        },
        error => {
          console.log("Error is: " + error);
        }
      );
    } else {
      const teacherData = this.teacherRegisterForm.value;

      this.data.firstName = teacherData.firstName;
      this.data.lastName = teacherData.lastName;
      this.data.email = teacherData.email;

      this.teacherService.updateTeacher(this.data).subscribe(
        result => {
          console.log("Teacher Updated!");
          this.ngModalRef.close(result);
        },
        error => {
          console.log("Error is: " + error);
        }
      );
    }
  }

  closeWindow() {
    this.ngModalRef.dismiss("Cross Click");
  }
}
