import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class PopupService {
  constructor(private modalService: NgbModal) {}

  openPopup(component, data, options): NgbModalRef {
    const modalRef = this.modalService.open(component, options);
    modalRef.componentInstance.ngModalRef = modalRef;
    if (data) {
      modalRef.componentInstance.data = data;
    }
    return modalRef;
  }
}
