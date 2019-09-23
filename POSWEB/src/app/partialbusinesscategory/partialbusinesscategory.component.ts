import { Component, OnInit  } from '@angular/core';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { business_category } from 'src/Model/business_category';
import { BusinessCategoryService } from 'src/Service/businesscategory.service';
import { ApiReposeModel } from 'src/Model/ApiResponse-model';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
    templateUrl: './partialbusinesscategory.component.html',
    providers: [DialogService],
})
export class PartialBusinessCategory implements OnInit {
    _BusinessCategoryData: business_category;
    _BusinessCategoryForm: FormGroup;
    _ValidationState: boolean;
    constructor(
        public _ref: DynamicDialogRef,
        public _config: DynamicDialogConfig,
        public _businesscategoryservice: BusinessCategoryService,
        private _toastrservice: ToastrService,
        private _spinner: NgxSpinnerService,
        private _formbuilder: FormBuilder,
    ) {
        this._BusinessCategoryData = this._config.data;
    }
    ngOnInit() {
        this._BusinessCategoryForm = this._formbuilder.group({
            name: new FormControl('', Validators.required),
            code: new FormControl('', Validators.required),
        });
    }

    CreateOrUpdate() {
        
        this._spinner.show();
        this._ValidationState = true;
        if (this._BusinessCategoryData.id == 0) {
            this._businesscategoryservice.Insert(this._BusinessCategoryData).subscribe((res: ApiReposeModel) => {
                if (res.Type == "S") {
                    this._toastrservice.success(res.Message, "Business Category");
                    this._ref.close(true);
                }
                else {
                    this._toastrservice.error(res.Message, "Business Category");
                }
                this._spinner.hide();
            }, (error) => {
                this._spinner.hide();
            });
        }
        else {
            this._businesscategoryservice.Update(this._BusinessCategoryData).subscribe((res: ApiReposeModel) => {
                if (res.Type == "S") {
                    this._toastrservice.success(res.Message, "Business Category");
                    this._ref.close(true);
                }
                else {
                    this._toastrservice.error(res.Message, "Business Category");
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
            text: 'You want to delete [' + this._BusinessCategoryData.name + ']',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                this._spinner.show();
                this._businesscategoryservice.Delete(this._BusinessCategoryData.id).subscribe((res: ApiReposeModel) => {
                    if (res.Type == "S") {
                        this._toastrservice.success(res.Message, "BusinessCategory");
                        this._ref.close(true);
                    }
                    else {
                        this._toastrservice.error(res.Message, "BusinessCategory");
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