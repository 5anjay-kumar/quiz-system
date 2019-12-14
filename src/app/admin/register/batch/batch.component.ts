import { BatchService } from './../../../core/services/batch.service';
import { PopupService } from './../../../shared/service/popup.service';
import { Component, OnInit } from '@angular/core';
import { RegisterBatchComponent } from 'src/app/shared/register-batch/register-batch.component';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {

  batches = [];
  constructor(private popupService: PopupService, private batchService: BatchService) { }

  ngOnInit() {
    this.batchService.getBatches().subscribe((batch) => {
      console.log(batch);
      this.batches = batch;
    });
  }

  openRegisterBatchPopup() {
    const registerPopup = this.popupService.openPopup(RegisterBatchComponent, null, {
      size: "lg"
    });

    registerPopup.result.then(
      result => {
        // console.log(result);
        this.batches.push(result);
      },
      () => {}
    );
  }

}
