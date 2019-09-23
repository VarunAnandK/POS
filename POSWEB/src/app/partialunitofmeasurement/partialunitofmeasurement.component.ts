import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { unit_of_measurement } from 'src/Model/unit_of_measurement';
import { UnitOfMeasurementService } from 'src/Service/unitofmeasurement.service';
import { ApiReposeModel } from 'src/Model/ApiResponse-model';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
    templateUrl: './partialunitofmeasurement.component.html',
    providers: [DialogService]
})
export class PartialUnitOfMeasurement implements OnInit {
    _UnitOfMeasurementData: unit_of_measurement;
    _UnitOfMeasurementForm: FormGroup;
    _ValidationState: boolean;
    constructor(
        public _ref: DynamicDialogRef,
        public _config: DynamicDialogConfig,
        public _unitofmeasurementservice: UnitOfMeasurementService,
        private _toastrservice: ToastrService,
        private _spinner: NgxSpinnerService,
        private _formbuilder: FormBuilder,
    ) {
        this._UnitOfMeasurementData = this._config.data;
    }
    ngOnInit() {
        this._UnitOfMeasurementForm = this._formbuilder.group({
            name: new FormControl('', Validators.required),
            code: new FormControl('', Validators.required),
        });
    }

    CreateOrUpdate() {
        this._spinner.show();
        this._ValidationState = true;
        if (this._UnitOfMeasurementData.id == 0) {
            this._unitofmeasurementservice.Insert(this._UnitOfMeasurementData).subscribe((res: ApiReposeModel) => {
                if (res.Type == "S") {
                    this._toastrservice.success(res.Message, "UnitOfMeasurement");
                    this._ref.close(true);
                }
                else {
                    this._toastrservice.error(res.Message, "UnitOfMeasurement");
                }
                this._spinner.hide();
            }, (error) => {
                this._spinner.hide();
            });
        }
        else {
            this._unitofmeasurementservice.Update(this._UnitOfMeasurementData).subscribe((res: ApiReposeModel) => {
                if (res.Type == "S") {
                    this._toastrservice.success(res.Message, "UnitOfMeasurement");
                    this._ref.close(true);
                }
                else {
                    this._toastrservice.error(res.Message, "UnitOfMeasurement");
                }
                this._spinner.hide();
            }, (error) => {
                this._spinner.hide();
            });
        }
    }
    Delete() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete [' + this._UnitOfMeasurementData.name + ']',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                this._spinner.show();
                this._unitofmeasurementservice.Delete(this._UnitOfMeasurementData.id).subscribe((res: ApiReposeModel) => {
                    if (res.Type == "S") {
                        this._toastrservice.success(res.Message, "UnitOfMeasurement");
                        this._ref.close(true);
                    }
                    else {
                        this._toastrservice.error(res.Message, "UnitOfMeasurement");
                    }
                }, (error) => {
                    this._spinner.hide();
                }, () => {
                    this._spinner.hide();
                });

            }
        });
    }
}