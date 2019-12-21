import { QuestionComponent } from './../../../shared/question/question.component';
import { PopupService } from './../../../core/services/popup.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {

  constructor(private popupService: PopupService) { }

  ngOnInit() {
  }

  openQuestionPopup() {
    const questionPopup = this.popupService.openPopup(
      QuestionComponent,
      null,
      {
        size: "lg"
      }
    );

    questionPopup.result.then(
      result => {
        console.log(result);
      },
      () => {}
    );
  }

}
