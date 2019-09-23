import { Component, OnInit } from '@angular/core';
import { business } from 'src/Model/business';
import { BusinessService } from 'src/Service/business.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {Router} from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
  _BusinessList: business[];
  _BusinesstotalRecords : number;
  _BusinessTableLoading : boolean;
  _TableFields: any[];
  constructor(
    private _businessservice: BusinessService,
    private _spinner: NgxSpinnerService,
    private _router : Router
  ) {
    this._BusinessList = new Array<business>();
  }

  ngOnInit() {
    this._TableFields = [
      { field: 'business_group_name', header: 'Discount Group' },
      { field: 'business_category_name', header: 'Category' },
      { field: 'name', header: 'Business Name' },
      // { field: 'country_name', header: 'Country' },
      // { field: 'state_name', header: 'State' }, 
      // { field: 'city_name', header: 'City' },
      { field: 'mobile_no', header: 'Mobile' },
      { field: 'landline_no', header: 'Landline' },
      { field: 'address', header: 'Address' }
    ];
   // this.GetBusinessList();
  }
  GetBusinessList(take:number= 2,skip : number = 0,search : string = "") {
    this._BusinessTableLoading = true;
    this._businessservice.GetSearchAndList(take,skip,search).subscribe((res) => {
      this._BusinessList = res["data"];
      this._BusinesstotalRecords = res["totalrecord"];
      this._BusinessList.forEach(o => {
        o["business_group_name"] = (o.business_group == null ? 'N/A' : o.business_group.name);
        o["business_category_name"] = o.business_category.name;
        o["country_name"] = o.country.name;
        o["state_name"] = o.state.name;
        o["city_name"] = o.city.name;
        o["address"] = o.address + " " + o.city.name + " " + o.state.name + " " + o.country.name;
      });
    }, (error) => {
      this._BusinessTableLoading = false;
    }, () => {
      this._BusinessTableLoading = false;
    });
  }

  Edit(Id: number = 0) {
    this._router.navigate([`${/BusinessCreateOrUpdate/}${Id}`])
  }
  
  loadBusinessLazy(event: LazyLoadEvent)
  {
    this.GetBusinessList(event.rows,event.first, event.globalFilter);
  }

}
