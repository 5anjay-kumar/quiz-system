import { RegisterSubjectComponent } from "./../../../shared/register-subject/register-subject.component";
import { PopupService } from "./../../../shared/service/popup.service";
import { SubjectService } from "./../../../core/services/subject.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-subject",
  templateUrl: "./subject.component.html",
  styleUrls: ["./subject.component.css"]
})
export class SubjectComponent implements OnInit {
  subjects = [];
  constructor(
    private subjectService: SubjectService,
    private popupService: PopupService
  ) {}

  ngOnInit() {
    this.subjectService.getSubjects().subscribe(subject => {
      console.log(subject);
      this.subjects = subject;
    });
  }

  openRegisterSubjectPopup() {
    const subjectPopup = this.popupService.openPopup(
      RegisterSubjectComponent,
      null,
      {
        size: "lg"
      }
    );

    subjectPopup.result.then(
      result => {
        // console.log(result);
        this.subjects.push(result);
      },
      () => {}
    );
  }

  editSubjectPopup(subject) {
    const registerPopup = this.popupService.openPopup(
      RegisterSubjectComponent,
      subject,
      {
        size: "lg"
      }
    );
  }
}
