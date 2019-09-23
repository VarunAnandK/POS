import { Component, OnInit } from '@angular/core';
import { state } from 'src/Model/state';
import { StateService } from 'src/Service/state.service';
import { DialogService } from 'primeng/api';
import { PartialState } from '../partialstate/partialstate.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css'],
  providers: [DialogService]
})
export class StateComponent implements OnInit {
  _StateList: state[];
  _TableFields: any[];
  _StateData: state;
  constructor(
    private _stateservice: StateService,
    private _dialogservice: DialogService,
    private _spinner: NgxSpinnerService

  ) { }

  ngOnInit() {
    this._TableFields = [
      { field: 'country_name', header: 'Country Name' },
      { field: 'name', header: 'State' },
      { field: 'code', header: 'Code' },
    ];
    this.GetStateList();
  }

  GetStateList() {
    this._spinner.show();
    this._stateservice.GetAll().subscribe((res) => {
      this._StateList = res;
      this._StateList.forEach(o => {
        o["country_name"] = o.country.name;
      })
    }, (error) => {
      this._spinner.hide();
    }, () => {
      this._spinner.hide();
    });
  }
  Edit(Id: number = 0) {
    if (Id == 0) {
      this._StateData = new state();
      const ref = this._dialogservice.open(PartialState, {
        header: 'State - New',
        width: '50%',
        data: this._StateData,
        contentStyle: { "overflow": "auto" }
      });
      ref.onClose.subscribe((res) => {
        if (res == true)
          this.GetStateList();
      });
    }
    else {
      this._spinner.show();
      this._stateservice.GetById(Id).subscribe((res) => {
        this._StateData = res;
        const ref = this._dialogservice.open(PartialState, {
          header: 'State - Edit',
          width: '50%',
          data: this._StateData,
          contentStyle: { "overflow": "auto" }
        });
        ref.onClose.subscribe((res) => {
          if (res == true)
            this.GetStateList();
        });
      }, (error) => {
        this._spinner.hide();
      }, () => {
        this._spinner.hide();
      });
    }
  }
}