import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef, DynamicDialogConfig, SelectItem } from 'primeng/api';
import { product_category } from 'src/Model/product_category';
import { ProductCategoryService } from 'src/Service/productcategory.service';
import { ApiReposeModel } from 'src/Model/ApiResponse-model';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CountryService } from 'src/Service/country.service';

@Component({
    templateUrl: './partialproductcategory.component.html',
    providers: [DialogService]
})
export class PartialProductCategory implements OnInit {
    _ProductCategoryData: product_category;
    _ProductCategoryForm: FormGroup;
    _parentcategorydropdown: SelectItem[];
    _ValidationProductCategory: boolean;
    constructor(
        public _ref: DynamicDialogRef,
        public _config: DynamicDialogConfig,
        public _productcategoryservice: ProductCategoryService,
        private _toastrservice: ToastrService,
        private _spinner: NgxSpinnerService,
        private _formbuilder: FormBuilder,
        private _countryservice: CountryService
    ) {
        this._ProductCategoryData = this._config.data;
    }
    ngOnInit() {
        this.PopulateParentCategoryDropdown();
        this._ProductCategoryForm = this._formbuilder.group({
            name: new FormControl('', Validators.required),
            code: new FormControl('', Validators.required),
            parent_category_id: new FormControl('', Validators.nullValidator),
        });
    }
    PopulateParentCategoryDropdown() {
        this._parentcategorydropdown = [];
        this._productcategoryservice.GetAllParentCategory().subscribe((res) => {
            res.forEach(element => {
                this._parentcategorydropdown.push({ label: element.name, value: element.id });
            });
        }, (error) => {
        }, () => {
            this._ProductCategoryForm.patchValue(this._ProductCategoryData);
        });
    }

    CreateOrUpdate() {
        this._spinner.show();
        this._ValidationProductCategory = true;
        if (this._ProductCategoryData.id == 0) {
            if (this._ProductCategoryData.parent_category_id > 0)
                this._ProductCategoryData.product_category_name = this._parentcategorydropdown.filter((t) => t.value === this._ProductCategoryData.parent_category_id)[0].label;
            else
                this._ProductCategoryData.product_category_name = "N/A";
            this._productcategoryservice.Insert(this._ProductCategoryData).subscribe((res: ApiReposeModel) => {
                if (res.Type == "S") {
                    this._toastrservice.success(res.Message, "ProductCategory");
                    this._ref.close(true);
                }
                else {
                    this._toastrservice.error(res.Message, "ProductCategory");
                }
                this._spinner.hide();
            }, (error) => {
                this._spinner.hide();
            });
        }
        else {
            if (this._ProductCategoryData.parent_category_id > 0)
                this._ProductCategoryData.product_category_name = this._parentcategorydropdown.filter((t) => t.value === this._ProductCategoryData.parent_category_id)[0].label;
            else
                this._ProductCategoryData.product_category_name = "N/A";
            this._productcategoryservice.Update(this._ProductCategoryData).subscribe((res: ApiReposeModel) => {
                if (res.Type == "S") {
                    this._toastrservice.success(res.Message, "Product Category");
                    this._ref.close(true);
                }
                else {
                    this._toastrservice.error(res.Message, "Product Category");
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
            text: 'You want to delete [' + this._ProductCategoryData.name + ']',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                this._spinner.show();
                this._productcategoryservice.Delete(this._ProductCategoryData.id).subscribe((res: ApiReposeModel) => {
                    if (res.Type == "S") {
                        this._toastrservice.success(res.Message, "Product Category");
                        this._ref.close(true);
                    }
                    else {
                        this._toastrservice.error(res.Message, "Product Category");
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