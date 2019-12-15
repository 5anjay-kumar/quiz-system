import { AppService } from "./../../core/services/app.service";
import { BatchService } from "./../../core/services/batch.service";
import { StudentService } from "./../../core/services/student.service";
import { Component, OnInit } from "@angular/core";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

@Component({
  selector: "app-register-student",
  templateUrl: "./register-student.component.html",
  styleUrls: ["./register-student.component.css"]
})
export class RegisterStudentComponent implements OnInit {
  ngModalRef: NgbModalRef;
  studentRegisterForm: FormGroup;
  batches = [];
  data: any;
  isNewRecord = true;

  constructor(
    private studentService: StudentService,
    private batchService: BatchService,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.batchService.getBatches().subscribe(batches => {
      this.batches = batches;
    });

    this.studentForm();
  }

  studentForm() {
    this.studentRegisterForm = this.fb.group({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      batch: new FormControl(null, Validators.required)
    });

    if (AppService.isNotUndefinedAndNull(this.data)) {
      this.studentRegisterForm.removeControl("password");
      this.isNewRecord = false;

      this.studentRegisterForm.setValue({
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        email: this.data.email,
        batch: this.data.batch
      });
    }
  }

  registerStudent() {
    AppService.markAsDirty(this.studentRegisterForm);
    if (!this.studentRegisterForm.valid) {
      return;
    }

    if (this.isNewRecord) {
      const student = this.studentRegisterForm.value;
      this.studentService.addStudent(student).subscribe(
        result => {
          student._id = result._id;
          console.log("Student Added!");
          this.ngModalRef.close(result);
        },
        error => {
          console.log("Error is: " + error);
        }
      );
    } else {
      const studentData = this.studentRegisterForm.value;

      this.data.firstName = studentData.firstName;
      this.data.lastName = studentData.lastName;
      this.data.email = studentData.email;
      this.data.batch = studentData.batch;

      this.studentService.updateStudent(this.data).subscribe(
        result => {
          console.log("Student Updated!");
          this.ngModalRef.close(result);
        },
        error => {
          console.log("Student Error is: " + error);
        }
      );
    }
  }

  closeWindow() {
    this.ngModalRef.dismiss("Cross Click");
  }
}
