import { Component, OnInit } from '@angular/core';
import { product_category } from 'src/Model/product_category';
import { ProductCategoryService } from 'src/Service/productcategory.service';
import { DialogService } from 'primeng/api';
import { PartialProductCategory } from '../partialproductcategory/partialproductcategory.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-productcategory',
  templateUrl: './productcategory.component.html',
  styleUrls: ['./productcategory.component.css'],
  providers: [DialogService]
})
export class ProductCategoryComponent implements OnInit {
  _ProductCategoryList: product_category[];
  _TableFields: any[];
  _ProductCategoryData: product_category;
  constructor(
    private _productcategoryservice: ProductCategoryService,
    private _dialogservice: DialogService,
    private _spinner: NgxSpinnerService

  ) { }

  ngOnInit() {
    this._TableFields = [
      { field: 'product_category_name', header: 'Parent Category Name' },
      { field: 'name', header: 'Category Name' },
      { field: 'code', header: 'Code' },
    ];
    this.GetProductCategoryList();
  }

  GetProductCategoryList() {
    this._spinner.show();
    this._productcategoryservice.GetAll().subscribe((res) => {
      this._ProductCategoryList = res;
    }, (error) => {
      this._spinner.hide();
    }, () => {
      this._spinner.hide();
    });
  }
  Edit(Id: number = 0) {
    if (Id == 0) {
      this._ProductCategoryData = new product_category();
      const ref = this._dialogservice.open(PartialProductCategory, {
        header: 'Product Category - New',
        width: '50%',
        data: this._ProductCategoryData,
        contentStyle: { "overflow": "auto" }
      });
      ref.onClose.subscribe((res) => {
        if (res == true)
        this.GetProductCategoryList();
      });
    }
    else {
      this._spinner.show();
      this._productcategoryservice.GetById(Id).subscribe((res) => {
        this._ProductCategoryData = res;
        const ref = this._dialogservice.open(PartialProductCategory, {
          header: 'Product Category - Edit',
          width: '50%',
          data: this._ProductCategoryData,
          contentStyle: { "overflow": "auto" }
        });
        ref.onClose.subscribe((res) => {
          if (res == true)
            this.GetProductCategoryList();
        });
      }, (error) => {
        this._spinner.hide();
      }, () => {
        this._spinner.hide();
      });
    }
  }
}