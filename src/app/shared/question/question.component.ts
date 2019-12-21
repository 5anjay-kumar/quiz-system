import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"]
})
export class QuestionComponent implements OnInit {
  public radioGroupForm: FormGroup;
  ngModalRef: NgbModalRef;
  questionForm: FormGroup;
  answerForm: FormGroup;
  questionType: any;

  answers = [
    {
      answer: String,
      isChecked: Boolean
    }
  ];
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.questionFormData();
    this.answerFormData();
  }

  questionFormData() {
    this.questionForm = new FormGroup({
      question: new FormControl(null, [Validators.required]),
      questionType: new FormControl(null, Validators.required)
    });
  }

  answerFormData() {
    this.answerForm = new FormGroup({
      options: new FormControl(null, [Validators.required]),
      isChecked: new FormControl(null)
    });
  }

  addQuestion() {
    this.questionType = this.questionForm.get("questionType").value;
  }

  addAnswer() {
    this.answers.push({
      answer: this.answerForm.get("options").value,
      isChecked: this.answerForm.get("isChecked").value
    });

    this.answerForm.reset();
  }

  closeWindow() {
    this.ngModalRef.dismiss("Cross Click");
  }
}
