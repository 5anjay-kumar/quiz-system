import { BatchService } from "./../../../core/services/batch.service";
import { RegisterStudentComponent } from "./../../../shared/register-student/register-student.component";
import { PopupService } from "./../../../shared/service/popup.service";
import { StudentService } from "./../../../core/services/student.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.css"]
})
export class StudentComponent implements OnInit {
  students = [];
  batches = [];
  studentBatches = [];
  data: any;
  constructor(
    private popupService: PopupService,
    private studentService: StudentService,
    private batchService: BatchService
  ) {}

  ngOnInit() {
    this.studentService.getStudent().subscribe(student => {
      console.log(student);
      this.students = student;
    });

    this.batchService.getBatches().subscribe(batch => {
      console.log(batch);
      this.batches = batch;
    });

    this.studentService
      .getStudentBatches(this.data._id)
      .subscribe((studentBatches: any) => {
        console.log(studentBatches);
        this.studentBatches = studentBatches;
      });
  }

  openRegisterStudentPopup() {
    const registerPopup = this.popupService.openPopup(
      RegisterStudentComponent,
      null,
      {
        size: "lg"
      }
    );

    registerPopup.result.then(
      result => {
        // console.log(result);
        this.studentBatches.push(result);
        console.log("Student Results: " + result);
      },
      () => {}
    );
  }
}
