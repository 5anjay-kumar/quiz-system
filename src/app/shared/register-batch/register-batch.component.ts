import { AppService } from "./../../core/services/app.service";
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { BatchService } from "./../../core/services/batch.service";
import { FormGroup } from "@angular/forms";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-register-batch",
  templateUrl: "./register-batch.component.html",
  styleUrls: ["./register-batch.component.css"]
})
export class RegisterBatchComponent implements OnInit {
  ngModalRef: NgbModalRef;
  batchRegisterForm: FormGroup;
  data: any;
  isNewRecord = true;

  constructor(private batchService: BatchService) {}

  ngOnInit() {
    this.batchForm();
  }

  batchForm() {
    this.batchRegisterForm = new FormGroup({
      department: new FormControl(null, Validators.required),
      batch_year: new FormControl(null, Validators.required),
      section: new FormControl(null, Validators.required)
    });

    if (AppService.isNotUndefinedAndNull(this.data)) {
      this.isNewRecord = false;

      this.batchRegisterForm.setValue({
        department: this.data.department,
        batch_year: this.data.batch_year,
        section: this.data.section
      });
    }
  }

  registerBatch() {
    AppService.markAsDirty(this.batchRegisterForm);
    if (!this.batchRegisterForm.valid) {
      return;
    }

    if (this.isNewRecord) {
      this.batchService.addBatch(this.batchRegisterForm.value).subscribe(
        result => {
          console.log("Subject Added!");
          this.ngModalRef.close(result);
        },
        error => {
          console.log("Error is: " + error);
        }
      );
    } else {
      const batchData = this.batchRegisterForm.value;

      this.data.department = batchData.department;
      this.data.batch_year = batchData.batch_year;
      this.data.section = batchData.section;

      this.batchService.updateBatch(this.data).subscribe(
        result => {
          console.log("Batch Update");
          this.ngModalRef.close(result);
        },
        error => {
          console.log("Batch Error is:" + error);
        }
      );
    }
  }

  closeWindow() {
    this.ngModalRef.dismiss("Cross Click");
  }
}
