import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { product } from "src/Model/product";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ProductService } from "src/Service/product.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ApiReposeModel } from "src/Model/ApiResponse-model";
import { DialogService, SelectItem } from "primeng/api";
import { ProductCategoryService } from "src/Service/productcategory.service";
import { UnitOfMeasurementService } from "src/Service/unitofmeasurement.service";
import { GSTService } from "src/Service/gst.service";
import { HelperModel } from "src/Model/Helper-model";
@Component({
  selector: "app-productcreate-or-update",
  templateUrl: "./ProductCreateOrUpdate.component.html",
  styleUrls: ["./ProductCreateOrUpdate.component.css"],
  providers: [DialogService]
})
export class ProductCreateOrUpdateComponent implements OnInit {
  _ProductData: product;
  _ProductForm: FormGroup;
  _productcategorydropdown: SelectItem[];
  _subproductcategorydropdown: SelectItem[];
  _unitdropdown: SelectItem[];
  _gstdropdown: SelectItem[];
  _TableDetailFields: any[];
  _Is_GST_Enable: number = parseInt(this._helper.GetCookiesValue("is_gst_enable"));
  constructor(
    private _activeRoute: ActivatedRoute,
    private _route: Router,
    private _toastr: ToastrService,
    public _crf: ChangeDetectorRef,
    private _productservice: ProductService,
    private _spinner: NgxSpinnerService,
    private _formBuilder: FormBuilder,
    private _dialogservice: DialogService,
    private _productcategoryservice: ProductCategoryService,
    private _unitservice: UnitOfMeasurementService,
    private _gstservice: GSTService,
    public _helper: HelperModel,
    private _router: Router,
  ) {
    this._ProductData = new product();
  }
  ngOnInit() {
    const routeParams = this._activeRoute.snapshot.params;
    this.GetProductById(routeParams.Id);
    this.PopulateProductCategoryDropdown();
    // this.PopulateSubProductCategoryDropdown();
    this.PopulateUnitDropdown();
    this.PopulateGSTDropdown();
    this._ProductForm = new FormGroup({
      Name: new FormControl("", [Validators.required]),
      product_category_id: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.min(1)])
      ),
      product_sub_category_id: new FormControl("", [Validators.nullValidator]),
      unit_id: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.min(1)])
      ),
      sku: new FormControl("", Validators.nullValidator),
      hsnorsac: new FormControl("", Validators.required),
      gst_id: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.min(1)])
      ),
      is_stockable: new FormControl("", Validators.nullValidator),
      purchase_price: new FormControl("", Validators.nullValidator),
      selling_price: new FormControl("", Validators.required),
      opening_stock: new FormControl("", Validators.nullValidator),
      barcode: new FormControl("", Validators.required)
    });
  }

  GetProductById(Id: number = 0) {
    this._spinner.show();
    if (Id > 0) {
      this._productservice.GetById(Id).subscribe(
        res => {
          if (res) {
            this._ProductData = res;

            this._ProductForm.patchValue(res);
          }
          this._spinner.hide();
        },
        error => {
          this._spinner.hide();
        }
      );
    } else {
      this._spinner.hide();
    }
  }

  PopulateProductCategoryDropdown() {
    let Id = 0;
    this._spinner.show();
    this._productcategorydropdown = [];
    this._productcategoryservice.GetAllParentCategory().subscribe(
      res => {
        res.forEach(element => {
          this._productcategorydropdown.push({
            label: element.name,
            value: element.id
          });
          if (Id == 0) {
            Id = element.id;
          }
        });
      },
      error => {
        this._spinner.hide();
      },
      () => {
        if (this._ProductData.id == 0) {
          this._ProductData.product_category_id = Id;
          this.PopulateSubProductCategoryDropdown(Id);
        } else {
          this.PopulateSubProductCategoryDropdown(
            this._ProductData.product_category_id
          );
        }
        this._ProductForm.patchValue(this._ProductData);
        this._spinner.hide();
      }
    );
  }

  PopulateSubProductCategoryDropdown(ProductCategoryId: number) {
    let Id = 0;
    this._spinner.show();
    this._subproductcategorydropdown = [];
    this._productcategoryservice
      .GetProductCategoryByParentCategoryId(ProductCategoryId)
      .subscribe(
        res => {
          res.forEach(element => {
            this._subproductcategorydropdown.push({
              label: element.name,
              value: element.id
            });
            if (Id == 0) {
              Id = element.id;
            }
          });
        },
        error => {
          this._spinner.hide();
        },
        () => {
          if (this._ProductData.id == 0) {
            this._ProductData.product_sub_category_id = Id;
          }
          this._ProductForm.patchValue(this._ProductData);
          this._spinner.hide();
        }
      );
  }

  GetSubProductCategory(value) {
    this.PopulateSubProductCategoryDropdown(value);
  }

  PopulateUnitDropdown() {
    let Id = 0;
    this._unitdropdown = [];
    this._unitservice.GetAll().subscribe(
      res => {
        res.forEach(element => {
          this._unitdropdown.push({ label: element.name, value: element.id });
          if (Id == 0) {
            Id = element.id;
          }
        });
      },
      error => {},
      () => {
        if (this._ProductData.id == 0) {
          this._ProductData.unit_id = Id;
        }
        this._ProductForm.patchValue(this._ProductData);
      }
    );
  }

  PopulateGSTDropdown() {
    debugger
    let Id = 0;
    this._gstdropdown = [];
    if (this._helper.GetCookiesValue("is_gst_enable") == "0") {
      this._gstservice.GetAll().subscribe(
        res => {
          res.filter(o => o.id <= 1).forEach(element => {
            this._gstdropdown.push({ label: element.name, value: element.id });
            if (Id == 0) {
              Id = element.id;
            }
          });
          // this._ProductForm.patchValue(this._ProductData);
        },
        error => {},
        () => {
          if (this._ProductData.id == 0) {
            this._ProductData.gst_id = Id;
          }
          this._ProductForm.patchValue(this._ProductData);
        }
      );
    } else {
      this._gstservice.GetAll().subscribe(
        res => {
          res.filter(o => o.id > 1).forEach(element => {
            this._gstdropdown.push({ label: element.name, value: element.id });
            if (Id == 0) {
              Id = element.id;
            }
          });
          // this._ProductForm.patchValue(this._ProductData);
        },
        error => {},
        () => {
          if (this._ProductData.id == 0) {
            this._ProductData.gst_id = Id;
          }
          this._ProductForm.patchValue(this._ProductData);
        }
      );
    }
  }

  InsertOrUpdate() {
    debugger;
    this._spinner.show();
    if (this._ProductData.id == 0) {
      if (this._ProductData.product_sub_category_id > 0) {
        this._ProductData.product_sub_category_name = this._subproductcategorydropdown.filter(
          t => t.value === this._ProductData.product_sub_category_id
        )[0].label;
      } else {
        this._ProductData.product_sub_category_id = null;
        this._ProductData.product_sub_category_name = "N/A";
      }
      this._productservice.Insert(this._ProductData).subscribe(
        (res: ApiReposeModel) => {
          if (res.Type == "S") {
            this._route.navigate([`${/ProductCreateOrUpdate/}${res.Id}`]);
            this.Refresh(res.Id);
            this._toastr.success(res.Message, "Product");
          } else {
            this._toastr.error(res.Message, "Product");
          }
          this._spinner.hide();
        },
        error => {
          this._spinner.hide();
        }
      );
    } else {
      if (this._ProductData.product_sub_category_id > 0) {
        this._ProductData.product_sub_category_name = this._subproductcategorydropdown.filter(
          t => t.value === this._ProductData.product_sub_category_id
        )[0].label;
      } else {
        this._ProductData.product_sub_category_id = null;
        this._ProductData.product_sub_category_name = "N/A";
      }
      this._productservice.Update(this._ProductData).subscribe(
        (res: ApiReposeModel) => {
          if (res.Type == "S") {
            this._route.navigate([
              `${/ProductCreateOrUpdate/}${this._ProductData.id}`
            ]);
            this._toastr.success(res.Message, "Product");
            this.Refresh(this._ProductData.id);
          } else {
            this._toastr.error(res.Message, "Product");
          }
          this._spinner.hide();
        },
        error => {
          this._spinner.hide();
        }
      );
    }
  }

  Refresh(Id: number = 0) {
    this.GetProductById(Id);
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      // this._toastrservice.error(event.Message, "Numeric Characters Only");
      return false;
    }
    return true;
  }

  Back() {
    this._router.navigate([`${/Product/}`]);
  }
}
