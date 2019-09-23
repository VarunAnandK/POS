import { Component, OnInit } from '@angular/core';
import { currency } from 'src/Model/currency';
import { CurrencyService } from 'src/Service/currency.service';
import { DialogService } from 'primeng/api';
import { PartialCurrency } from '../partialcurrency/partialcurrency.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css'],
  providers: [DialogService]
})
export class CurrencyComponent implements OnInit {
  _CurrencyList: currency[];
  _TableFields: any[];
  _CurrencyData: currency;
  constructor(
    private _currencyservice: CurrencyService,
    private _dialogservice: DialogService,
    private _spinner: NgxSpinnerService

  ) { }

  ngOnInit() {
    this._TableFields = [
      { field: 'country_name', header: 'Country Name' },
      { field: 'name', header: 'Currency' },
      { field: 'code', header: 'Code' },
      { field: 'symbol', header: 'Symbol' }
    ];
    this.GetCurrencyList();
  }

  GetCurrencyList() {
    this._spinner.show();
    this._currencyservice.GetAll().subscribe((res) => {
      this._CurrencyList = res;
      this._CurrencyList.forEach(o => {
        o["country_name"] = o.country.name;
      });
    }, (error) => {
      this._spinner.hide();
    }, () => {
      this._spinner.hide();
    });
  }
  Edit(Id: number = 0) {
    if (Id == 0) {
      this._CurrencyData = new currency();
      const ref = this._dialogservice.open(PartialCurrency, {
        header: 'Currency - New',
        width: '50%',
        data: this._CurrencyData,
        contentStyle: { "overflow": "auto" }
      });
      ref.onClose.subscribe((res) => {
        if (res == true)
          this.GetCurrencyList();
      });
    }
    else {
      this._spinner.show();
      this._currencyservice.GetById(Id).subscribe((res) => {
        this._CurrencyData = res;
        const ref = this._dialogservice.open(PartialCurrency, {
          header: 'Currency - Edit',
          width: '50%',
          data: this._CurrencyData,
          contentStyle: { "overflow": "auto" }
        });
        ref.onClose.subscribe((res) => {
          if (res == true)
            this.GetCurrencyList();
        });
      }, (error) => {
        this._spinner.hide();
      }, () => {
        this._spinner.hide();
      });
    }
  }
}
