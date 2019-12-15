import { PopupService } from './../../core/services/popup.service';
import { AppService } from "./../../core/services/app.service";
import { Validators, FormBuilder } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { TeacherService } from "./../../core/services/teacher.service";
import { BatchService } from "./../../core/services/batch.service";
import { SubjectService } from "./../../core/services/subject.service";
import { Component, OnInit } from "@angular/core";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-add-teacher-subject",
  templateUrl: "./add-teacher-subject.component.html",
  styleUrls: ["./add-teacher-subject.component.css"]
})
export class AddTeacherSubjectComponent implements OnInit {
  ngModalRef: NgbModalRef;
  data: any;
  subjects = [];
  batches = [];
  teacherSubjects = [];
  isNewRecord = true;
  teacherSubjectForm: FormGroup;

  constructor(
    private subjectService: SubjectService,
    private batchService: BatchService,
    private teacherService: TeacherService,
    private popupService: PopupService,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.subjectService.getSubjects().subscribe(subjects => {
      this.subjects = subjects;
    });

    this.batchService.getBatches().subscribe(batches => {
      this.batches = batches;
    });

    this.teacherService
      .getTeacherSubjects(this.data._id)
      .subscribe((teacherSubjects: any) => {
        console.log(teacherSubjects);
        this.teacherSubjects = teacherSubjects;
      });
    this.subjectBatchForm();
  }

  subjectBatchForm() {
    this.teacherSubjectForm = this.fb.group({
      subject: new FormControl(null, Validators.required),
      batch: new FormControl(null, Validators.required)
    });

    if (AppService.isNotUndefinedAndNull(this.data)) {
      this.isNewRecord = false;

      this.teacherSubjectForm.setValue({
        subject: this.data.subject,
        batch: this.data.batch
      });
    }
  }

  get selectedSubject() {
    const subjectId = this.teacherSubjectForm.get("subject").value;
    const subject = this.subjects.find(s => s.id === subjectId);
    return subject;
  }

  addSubject() {
    AppService.markAsDirty(this.teacherSubjectForm);
    if (!this.teacherSubjectForm.valid) {
      return;
    }

    if (this.isNewRecord) {
      const selectedSubject = this.teacherSubjectForm.get("subject").value;
      const selectedBatch = this.teacherSubjectForm.get("batch").value;

      const teacherSubject: any = {
        teacher: this.data,
        subject: selectedSubject,
        batch: selectedBatch
      };

      this.teacherService
        .addTeacherSubject(teacherSubject)
        .subscribe(result => {
          console.log(result);
          teacherSubject._id = result._id;
          this.teacherSubjects.push(teacherSubject);
        });
      }
    // } else {
    //   const selectedSubject = this.teacherSubjectForm.get("subject").value;
    //   const selectedBatch = this.teacherSubjectForm.get("batch").value;

    //   this.data.subject = selectedSubject;
    //   this.data.batch = selectedBatch;

    //   this.teacherService.updateTeacherSubject(this.data).subscribe(
    //     result => {
    //       console.log("Teacher Subject Updated!");
    //       this.ngModalRef.close(result);
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   );
    // }
  }

  closeWindow() {
    this.ngModalRef.dismiss("Cross Click");
  }
}
