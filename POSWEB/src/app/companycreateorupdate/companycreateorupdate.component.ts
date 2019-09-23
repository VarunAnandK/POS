import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { company } from 'src/Model/company';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/Service/company.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiReposeModel } from 'src/Model/ApiResponse-model';
import { DialogService, SelectItem } from 'primeng/api';
import { CountryService } from 'src/Service/country.service';
import { StateService } from 'src/Service/state.service';
import { CityService } from 'src/Service/city.service';
import { HelperModel } from 'src/Model/Helper-model';

@Component({
  selector: 'app-companycreate-or-update',
  templateUrl: './CompanyCreateOrUpdate.component.html',
  styleUrls: ['./CompanyCreateOrUpdate.component.css'],
  providers: [DialogService]
})
export class CompanyCreateOrUpdateComponent implements OnInit {
  _CompanyData: company;
  _CompanyForm: FormGroup;
  _countrydropdown: SelectItem[];
  _statedropdown: SelectItem[];
  _citydropdown: SelectItem[];
  _TableDetailFields: any[];
  arrayBuffer: any;
  file: File;
  constructor(
    private _activeRoute: ActivatedRoute,
    private _route: Router,
    private _toastr: ToastrService,
    public _crf: ChangeDetectorRef,
    private _companyservice: CompanyService,
    private _spinner: NgxSpinnerService,
    private _formBuilder: FormBuilder,
    private _dialogservice: DialogService,
    private _countryservice: CountryService,
    private _stateservice: StateService,
    private _cityservice: CityService,
    public _helper: HelperModel,
  ) {
    this._CompanyData = new company();
  }

  ngOnInit() {
    this.PopulateCountryDropdown();
    this._CompanyForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      country_id: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
      state_id: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
      city_id: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
      address: new FormControl('', Validators.required),
      postal_code: new FormControl('', Validators.required),
      //email: new FormControl('', Validators.nullValidator),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      website: new FormControl('', Validators.nullValidator),
      phone_no: new FormControl('', Validators.required),
      gst_no: new FormControl('', Validators.nullValidator),
      is_gst_enable: new FormControl('', Validators.nullValidator),
      is_credits_enable: new FormControl('', Validators.nullValidator),
    });
    const routeParams = this._activeRoute.snapshot.params;
    this.GetCompanyById(routeParams.Id);
  }

  GetCompanyById(Id: number = 0) {
    this._spinner.show();
    if (Id > 0) {
      this._companyservice.GetById(Id).subscribe((res) => {
        if (res) {
          this._CompanyData = res;
          this._helper.SetCookiesValue("is_gst_enable", res.is_gst_enable);
          this._helper.SetCookiesValue("is_credits_enable", res.is_credits_enable);
          this._CompanyForm.patchValue(res);
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
      if (this._CompanyData.id == 0) {
        this._CompanyData.country_id = Id;
        this.PopulateStateDropdown(Id);
      }
      else {
        this.PopulateStateDropdown(this._CompanyData.country_id);
      }
      this._CompanyForm.patchValue(this._CompanyData);
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
      if (this._CompanyData.id == 0) {
        this._CompanyData.state_id = Id;
        this.PopulateCityDropdown(Id);
      }
      else {
        this.PopulateCityDropdown(this._CompanyData.state_id);
      }
      this._CompanyForm.patchValue(this._CompanyData);
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
      if (this._CompanyData.id == 0)
        this._CompanyData.city_id = Id;
      this._CompanyForm.patchValue(this._CompanyData);
      this._spinner.hide();
    });
  }

  GetState(value) {
    this.PopulateStateDropdown(value);
  }

  GetCity(value) {
    this.PopulateCityDropdown(value);
  }

  InsertOrUpdate() {
    this._spinner.show();
    if (this._CompanyData.id == 0) {
      this._companyservice.Insert(this._CompanyData).subscribe((res: ApiReposeModel) => {
        if (res.Type == "S") {
          this._route.navigate([`${/CompanyCreateOrUpdate/}${res.Id}`])
          this.Refresh(res.Id);
          this._helper.SetCookiesValue("is_gst_enable", res.Is_GST);
          this._helper.SetCookiesValue("is_credits_enable", res.Is_Credit);
          this._toastr.success(res.Message, "Company");
        }
        else {
          this._toastr.error(res.Message, "Company");
        }
        this._spinner.hide();
      }, (error) => {
        this._spinner.hide();
      });
    }
    else {
      this._companyservice.Update(this._CompanyData).subscribe((res: ApiReposeModel) => {
        if (res.Type == "S") {
          this._route.navigate([`${/CompanyCreateOrUpdate/}${this._CompanyData.id}`])
          this._toastr.success(res.Message, "Company");
          this._helper.SetCookiesValue("is_gst_enable", res.Is_GST);
          this._helper.SetCookiesValue("is_credits_enable", res.Is_Credit);
          this.Refresh(this._CompanyData.id);
        }
        else {
          this._toastr.error(res.Message, "Company");
        }
        this._spinner.hide();
      }, (error) => {
        this._spinner.hide();
      });
    }
  }
  Refresh(Id: number = 0) {
    this.GetCompanyById(Id);
  }

  Imgincomingfile(event) {
    this.file = event.files[0];
    this.ImgUpload();
  }

  ImgUpload() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var b64 = this.arrayBuffer;
      this._CompanyData.logo = b64;
    }
    if (this.file) {
      fileReader.readAsDataURL(this.file);
    }
  }

}
