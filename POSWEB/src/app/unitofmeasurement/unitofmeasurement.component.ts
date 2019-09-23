import { Component, OnInit } from '@angular/core';
import { unit_of_measurement } from 'src/Model/unit_of_measurement';
import { UnitOfMeasurementService } from 'src/Service/unitofmeasurement.service';
import { DialogService } from 'primeng/api';
import { PartialUnitOfMeasurement } from '../partialunitofmeasurement/partialunitofmeasurement.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-unitofmeasurement',
  templateUrl: './unitofmeasurement.component.html',
  styleUrls: ['./unitofmeasurement.component.css'],
  providers: [DialogService]
})
export class UnitOfMeasurementComponent implements OnInit {
  _UnitOfMeasurementList: unit_of_measurement[];
  _TableFields: any[];
  _UnitOfMeasurementData: unit_of_measurement;
  constructor(
    private _unitofmeasurementservice: UnitOfMeasurementService,
    private _dialogservice: DialogService,
    private _spinner: NgxSpinnerService

  ) { }

  ngOnInit() {
    this._TableFields = [
      { field: 'name', header: 'Unit Name' },
      { field: 'code', header: 'Code' }
    ];
    this.GetUnitOfMeasurementList();
  }

  GetUnitOfMeasurementList() {
    this._spinner.show();
    this._unitofmeasurementservice.GetAll().subscribe((res) => {
      this._UnitOfMeasurementList = res;
    }, (error) => {
      this._spinner.hide();
    }, () => {
      this._spinner.hide();
    });
  }
  Edit(Id: number = 0) {
    if (Id == 0) {
      this._UnitOfMeasurementData = new unit_of_measurement();
      const ref = this._dialogservice.open(PartialUnitOfMeasurement, {
        header: 'Unit Of Measurement - New',
        width: '50%',
        data: this._UnitOfMeasurementData,
        contentStyle: { "overflow": "auto" }
      });
      ref.onClose.subscribe((res) => {
        if (res == true)
          this.GetUnitOfMeasurementList();
      });
    }
    else {
      this._spinner.show();
      this._unitofmeasurementservice.GetById(Id).subscribe((res) => {
        this._UnitOfMeasurementData = res;
        const ref = this._dialogservice.open(PartialUnitOfMeasurement, {
          header: 'Unit Of Measurement - Edit',
          width: '50%',
          data: this._UnitOfMeasurementData,
          contentStyle: { "overflow": "auto" }
        });
        ref.onClose.subscribe((res) => {
          if (res == true)
            this.GetUnitOfMeasurementList();
        });
      }, (error) => {
        this._spinner.hide();
      }, () => {
        this._spinner.hide();
      });
    }
  }
}
