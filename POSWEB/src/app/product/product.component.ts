import { Component, OnInit } from '@angular/core';
import { product } from 'src/Model/product';
import { ProductService } from 'src/Service/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {Router} from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-Product',
  templateUrl: './Product.component.html',
  styleUrls: ['./Product.component.css']
})
export class ProductComponent implements OnInit {
  _ProductList: product[];
  _ProducttotalRecords : number;
  _ProductTableLoading : boolean = false;
  _TableFields: any[];
  constructor(
    private _productservice: ProductService,
    private _spinner: NgxSpinnerService,
    private _router: Router
  ) {
    this._ProductList = new Array<product>();
  }

  ngOnInit() {
    this._TableFields = [
      { field: 'name', header: 'Product Name' },
      { field: 'product_category_name', header: 'Category' },
      { field: 'product_sub_category_name', header: 'Sub Category' },
      { field: 'unit_name', header: 'Unit' },
      { field: 'sku', header: 'SKU' },
      { field: 'barcode', header: 'Barcode' },
      { field: 'hsnorsac', header: 'HSN Or SAC' },
      { field: 'gst_name', header: 'GST' },
      // { field: 'purchase_price', header: 'Purchase Price' },
      { field: 'selling_price', header: 'Rate' }
    ];
    //this.GetProductList();
  }

  GetProductList(take:number= 10,skip : number = 0,search : string = "") {
    this._ProductTableLoading = true;
    this._productservice.GetSearchAndList(take,skip,search).subscribe((res) => {
      this._ProductList = res["data"];
      this._ProducttotalRecords = res["totalrecord"];
      this._ProductList.forEach(o => {
        o["product_category_name"] = (o.product_category.name);
        o["sub_product_category_name"] = (o.sub_product_category == null ? 'N/A' : o.sub_product_category.name);
        o["unit_name"] = o.unit.name;
        o["gst_name"] = o.gst.name;
      });
    }, (error) => {
      this._ProductTableLoading = false;
    }, () => {
      this._ProductTableLoading = false;
    });
  }

  Edit(Id: number = 0) {
    this._router.navigate([`${/ProductCreateOrUpdate/}${Id}`])
  }

  loadProductLazy(event: LazyLoadEvent)
  {
    this.GetProductList(event.rows,event.first, event.globalFilter);
  }

}
