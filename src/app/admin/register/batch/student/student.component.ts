import { ConfirmationComponent } from "./../../../../shared/confirmation/confirmation.component";
import { RegisterStudentComponent } from "./../../../../shared/register-student/register-student.component";
import { PopupService } from "../../../../core/services/popup.service";
import { StudentService } from "./../../../../core/services/student.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.css"]
})
export class StudentComponent implements OnInit {
  students = [];
  data: any;
  batchId: string;

  constructor(
    private popupService: PopupService,
    private studentService: StudentService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.batchId = params.id;
      this.loadStudents();
    });
  }

  loadStudents() {
    this.studentService.getStudentsByBatch(this.batchId).subscribe(student => {
      console.log(student);
      this.students = student;
    });
  }

  openRegisterStudentPopup() {
    const registerPopup = this.popupService.openPopup(
      RegisterStudentComponent,
      {batchId: this.batchId},
      {
        size: "lg"
      }
    );

    registerPopup.result.then(
      result => {
        this.loadStudents();
      },
      () => {}
    );
  }

  editStudentPopup(student) {
    const registerPopup = this.popupService.openPopup(
      RegisterStudentComponent,
      student,
      {
        size: "lg"
      }
    );
  }

  removeStudent(student, index) {
    const deletePopup = this.popupService.openPopup(
      ConfirmationComponent,
      student,
      {
        size: "md"
      }
    );

    deletePopup.result.then(
      result => {
        this.studentService.deleteStudent(student).subscribe(data => {
          this.students.splice(index, 1);
        });
        console.log("Student Results: " + result);
      },
      () => {}
    );
  }
}
