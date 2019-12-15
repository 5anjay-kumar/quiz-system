import { AppService } from "./../../core/services/app.service";
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { SubjectService } from "./../../core/services/subject.service";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-register-subject",
  templateUrl: "./register-subject.component.html",
  styleUrls: ["./register-subject.component.css"]
})
export class RegisterSubjectComponent implements OnInit {
  ngModalRef: NgbModalRef;
  subjectRegisterForm: FormGroup;
  data: any;
  isNewRecord = true;

  constructor(private subjectService: SubjectService) {}

  ngOnInit() {
    this.subjectForm();
  }

  subjectForm() {
    this.subjectRegisterForm = new FormGroup({
      subject_title: new FormControl(null, [Validators.required])
    });

    if (AppService.isNotUndefinedAndNull(this.data)) {
      this.isNewRecord = false;

      this.subjectRegisterForm.setValue({
        subject_title: this.data.subject_title
      });
    }
  }

  registerSubject() {
    AppService.markAsDirty(this.subjectRegisterForm);
    if (!this.subjectRegisterForm.valid) {
      return;
    }

    if (this.isNewRecord) {
      this.subjectService.addSubject(this.subjectRegisterForm.value).subscribe(
        result => {
          console.log("Subject Added!");
          this.ngModalRef.close(result);
        },
        error => {
          console.log("Error is: " + error);
        }
      );
    } else {
      const subjectData = this.subjectRegisterForm.value;

      this.data.subject_title = subjectData.subject_title;

      this.subjectService.updateSubject(this.data).subscribe(
        result => {
          console.log("Subject Updated!");
          this.ngModalRef.close(result);
        },
        error => {
          console.log("Subjec Error is: " + error);
        }
      );
    }
  }

  closeWindow() {
    this.ngModalRef.dismiss("Cross Click");
  }
}
