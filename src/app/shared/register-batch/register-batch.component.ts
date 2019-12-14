import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { BatchService } from './../../core/services/batch.service';
import { FormGroup } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-batch',
  templateUrl: './register-batch.component.html',
  styleUrls: ['./register-batch.component.css']
})
export class RegisterBatchComponent implements OnInit {
  ngModalRef: NgbModalRef;
  batchRegisterForm: FormGroup;
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
  }

  registerBatch() {
    this.batchService.addBatch(this.batchRegisterForm.value).subscribe(
      result => {
        console.log("Subject Added!");
        this.ngModalRef.close(result);
      },
      error => {
        console.log("Error is: " + error);
      }
    );
  }

  closeWindow() {
    this.ngModalRef.dismiss("Cross Click");
  }

}
