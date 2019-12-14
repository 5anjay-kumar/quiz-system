import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { SubjectService } from './../../core/services/subject.service';
import { FormGroup } from '@angular/forms';
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
  constructor(private subjectService: SubjectService) {}

  ngOnInit() {
    this.subjectForm();
  }

  subjectForm() {
    this.subjectRegisterForm = new FormGroup({
      subject_title: new FormControl(null, Validators.required)
    });
  }

  registerSubject() {
    this.subjectService.addSubject(this.subjectRegisterForm.value).subscribe(
      result => {
        console.log("Subject Added!");
        this.ngModalRef.close(result);
      },
      error => {
        console.log("Error is: " + error);
      }
    );
  }

  closeWindow() {
    this.ngModalRef.dismiss("Cross Click");
  }
}
