import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { business } from 'src/Model/business';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BusinessService } from 'src/Service/business.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiReposeModel } from 'src/Model/ApiResponse-model';
import { DialogService, SelectItem } from 'primeng/api';
import { CountryService } from 'src/Service/country.service';
import { BusinessGroupService } from 'src/Service/businessgroup.service';
import { StateService } from 'src/Service/state.service';
import { CityService } from 'src/Service/city.service';
import { BusinessCategoryService } from 'src/Service/businesscategory.service';

@Component({
  selector: 'app-businesscreate-or-update',
  templateUrl: './BusinessCreateOrUpdate.component.html',
  styleUrls: ['./BusinessCreateOrUpdate.component.css'],
  providers: [DialogService]
})
export class BusinessCreateOrUpdateComponent implements OnInit {
  _BusinessData: business;
  _BusinessForm: FormGroup;
  _countrydropdown: SelectItem[];
  _statedropdown: SelectItem[];
  _citydropdown: SelectItem[];
  _businessgroupdropdown: SelectItem[];
  _businesscategorydropdown: SelectItem[];
  _TableDetailFields: any[];
  constructor(
    private _activeRoute: ActivatedRoute,
    private _route: Router,
    private _toastr: ToastrService,
    public _crf: ChangeDetectorRef,
    private _businessservice: BusinessService,
    private _spinner: NgxSpinnerService,
    private _formBuilder: FormBuilder,
    private _dialogservice: DialogService,
    private _businessgroupservice: BusinessGroupService,
    private _countryservice: CountryService,
    private _stateservice: StateService,
    private _cityservice: CityService,
    private _businesscategoryservice: BusinessCategoryService,
    private _router: Router
  ) {
    this._BusinessData = new business();
  }

  ngOnInit() {
    this.PopulateBusinessCategoryDropdown();
    this.PopulateBusinessGroupDropdown();
    this.PopulateCountryDropdown();
    this._BusinessForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      country_id: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
      state_id: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
      city_id: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
      business_category_id: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
      business_group_id: new FormControl('', Validators.nullValidator),
      mobile_no: new FormControl('', Validators.required),
      landline_no: new FormControl('', Validators.nullValidator),
      contact_person_name: new FormControl('', Validators.required),
      additional_mobile_no: new FormControl('', Validators.nullValidator),
      address: new FormControl('', Validators.required)
    });
    const routeParams = this._activeRoute.snapshot.params;
    this.GetBusinessById(routeParams.Id);
  }

  GetBusinessById(Id: number = 0) {
    this._spinner.show();
    if (Id > 0) {
      this._businessservice.GetById(Id).subscribe((res) => {
        if (res) {
          this._BusinessData = res;
          this._BusinessForm.patchValue(res);
        }
        this._spinner.hide();
      },
        (error) => {
          this._spinner.hide();
        });
    }
    else {
      this._spinner.hide();
    }
  }

  PopulateBusinessCategoryDropdown() {
    this._spinner.show();
    let Id = 0;
    this._businesscategorydropdown = [];
    this._businesscategoryservice.GetAll().subscribe((res) => {
      res.forEach(element => {
        this._businesscategorydropdown.push({ label: element.name, value: element.id });
        if (Id == 0) {
          Id = element.id;
        }
      });
      //this._BusinessForm.patchValue(this._BusinessData);
    }, (error) => {
      this._spinner.hide();
    }, () => {
      if (this._BusinessData.id == 0)
        this._BusinessData.business_category_id = Id;
        this._BusinessForm.patchValue(this._BusinessData);
        this._spinner.hide();
    });
  }

  PopulateBusinessGroupDropdown() {
    this._businessgroupdropdown = [];
    this._businessgroupservice.GetAll().subscribe((res) => {
      res.forEach(element => {
        this._businessgroupdropdown.push({ label: element.name, value: element.id });
      });
      this._BusinessForm.patchValue(this._BusinessData);
    }, (error) => {
    }, () => {
    });
  }

  PopulateCountryDropdown() {
    let Id = 0;
    this._spinner.show();
    this._countrydropdown = [];
    this._countryservice.GetAll().subscribe((res) => {
      res.forEach(element => {
        this._countrydropdown.push({ label: element.name, value: element.id });
        if (Id == 0) {
          Id = element.id;
        }
      });
    }, (error) => {
      this._spinner.hide();
    }, () => {
      if (this._BusinessData.id == 0) {
        this._BusinessData.country_id = Id;
        this.PopulateStateDropdown(Id);
    }
    else {
        this.PopulateStateDropdown(this._BusinessData.country_id);
    }
    this._BusinessForm.patchValue(this._BusinessData);
    this._spinner.hide();
    });
  }

  PopulateStateDropdown(CountryId: number) {
    this._spinner.show();
    let Id = 0;
    this._statedropdown = [];
    this._stateservice.GetAll().subscribe((res) => {
      res.filter((t) => t.country_id === CountryId).forEach(element => {
        this._statedropdown.push({ label: element.name, value: element.id });
        if (Id == 0) {
          Id = element.id;
        }
      });
    }, (error) => {
      this._spinner.hide();
    }, () => {
      if (this._BusinessData.id == 0) {
        this._BusinessData.state_id = Id;
        this.PopulateCityDropdown(Id);
    }
    else {
        this.PopulateCityDropdown(this._BusinessData.state_id);
    }
    this._BusinessForm.patchValue(this._BusinessData);
    this._spinner.hide();
    });
  }

  PopulateCityDropdown(StateId: number) {
    this._spinner.show();
    let Id = 0;
    this._citydropdown = [];
    this._cityservice.GetAll().subscribe((res) => {
      res.filter((t) => t.state_id === StateId).forEach(element => {
        this._citydropdown.push({ label: element.name, value: element.id });
        if (Id == 0) {
          Id = element.id;
        }
      });
    }, (error) => {
      this._spinner.hide();
    }, () => {
        if (this._BusinessData.id == 0)
        this._BusinessData.city_id = Id;
        this._BusinessForm.patchValue(this._BusinessData);
        this._spinner.hide();
    });
  }

  GetState(value) {
    this.PopulateStateDropdown(value);
  }

  GetCity(value) {
    this.PopulateCityDropdown(value);
  }

  Edit(Id: number = 0) {
    debugger
    this._router.navigate([`${/BusinessCreateOrUpdate/}${Id}`])
  }

  InsertOrUpdate() {
    this._spinner.show();
    if (this._BusinessData.id == 0) {
      this._businessservice.Insert(this._BusinessData).subscribe((res: ApiReposeModel) => {
        if (res.Type == "S") {
          this._route.navigate([`${/BusinessCreateOrUpdate/}${res.Id}`])
          this.Refresh(res.Id);
          this._toastr.success(res.Message, "Business");
        }
        else {
          this._toastr.error(res.Message, "Business");
        }
        this._spinner.hide();
      }, (error) => {
        this._spinner.hide();
      });
    }
    else {
      this._businessservice.Update(this._BusinessData).subscribe((res: ApiReposeModel) => {
        if (res.Type == "S") {
          this._route.navigate([`${/BusinessCreateOrUpdate/}${this._BusinessData.id}`])
          this._toastr.success(res.Message, "Business");
          this.Refresh(this._BusinessData.id);
        }
        else {
          this._toastr.error(res.Message, "Business");
        }
        this._spinner.hide();
      }, (error) => {
        this._spinner.hide();
      });
    }
  }

  Refresh(Id: number = 0) {
    this.GetBusinessById(Id);
  }

  Back() {
    this._router.navigate([`${/Business/}`]);
  }
}
