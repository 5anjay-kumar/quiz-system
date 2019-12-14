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
  forbiddenTeacherEmail = ["skmalhi1996@gmail.com", "test@gmail.com"];
  teacherRegisterForm: FormGroup;
  data: any;
  isNewRecord = true;

  constructor(private teacherService: TeacherService, public fb: FormBuilder) {}

  ngOnInit() {
    this.mainForm();
  }

  mainForm() {
    this.teacherRegisterForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
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
    if (this.isNewRecord) {
      this.teacherService.addTeacher(this.teacherRegisterForm.value).subscribe(
        result => {
          console.log("Teacher Added!");
          this.ngModalRef.close(result);
        },
        error => {
          console.log("Error is: " + error);
        }
      );
    } else {
      this.teacherService.addTeacher(this.teacherRegisterForm.value).subscribe(
        result => {
          console.log("Teacher Added!");
          this.ngModalRef.close(result);
        },
        error => {
          console.log("Error is: " + error);
        }
      );
    }
  }

  get myForm() {
    return this.teacherRegisterForm.controls;
  }

  getTeacherById(id) {
    this.teacherService.getTeacherById(id).subscribe(data => {
      console.log("Single data: " + data);
      this.teacherRegisterForm.setValue({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email
      });
    });
  }

  closeWindow() {
    this.ngModalRef.dismiss("Cross Click");
  }
}
