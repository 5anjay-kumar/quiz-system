import { ConfirmationComponent } from './../../../shared/confirmation/confirmation.component';
import { AddTeacherSubjectComponent } from './../../../shared/add-teacher-subject/add-teacher-subject.component';
import { Teacher } from "./../../../shared/models/teacher.model";
import { TeacherService } from "../../../core/services/teacher.service";
import { PopupService } from "../../../core/services/popup.service";
import { RegisterTeacherComponent } from "../../../shared/register-teacher/register-teacher.component";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-teacher",
  templateUrl: "./teacher.component.html",
  styleUrls: ["./teacher.component.css"]
})
export class TeacherComponent implements OnInit {
  teachers = [];

  constructor(
    private popupService: PopupService,
    private teacherService: TeacherService
  ) {}

  ngOnInit() {
    this.teacherService.getTeachers().subscribe(teachers => {
      console.log(teachers);
      this.teachers = teachers;
    });
  }

  openRegisterTeacherPopup() {
    const registerPopup = this.popupService.openPopup(
      RegisterTeacherComponent,
      null,
      {
        size: "lg"
      }
    );

    registerPopup.result.then(
      result => {
        // console.log(result);
        this.teachers.push(result);
      },
      () => {}
    );
  }

  editTeacherPopup(teacher) {
    const registerPopup = this.popupService.openPopup(
      RegisterTeacherComponent,
      teacher,
      {
        size: "lg"
      }
    );
  }

  removeTeacher(teacher, index) {
    const deletePopup = this.popupService.openPopup(
      ConfirmationComponent,
      teacher,
      {
        size: "md"
      }
    );

    deletePopup.result.then(
      result => {
        this.teacherService.deleteTeacher(teacher).subscribe(data => {
          this.teachers.splice(index, 1);
        });
      },
      () => {}
    );
  }

  openAddTeacherSubjectPopup(teacher) {
    const teacherSubjectPopup = this.popupService.openPopup(
      AddTeacherSubjectComponent,
      teacher,
      {
        size: "lg"
      }
    );

    teacherSubjectPopup.result.then(
      result => {
        console.log(result);
      },
      () => {}
    );
  }
}
