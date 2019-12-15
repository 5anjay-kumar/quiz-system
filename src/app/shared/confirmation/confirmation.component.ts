import { Component, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-confirmation",
  templateUrl: "./confirmation.component.html",
  styleUrls: ["./confirmation.component.css"]
})
export class ConfirmationComponent implements OnInit {
  ngModalRef: NgbModalRef;
  data: any = {
    title: String,
    message: String
  };
  constructor(public modal: NgbActiveModal) {}

  ngOnInit() {}
}
