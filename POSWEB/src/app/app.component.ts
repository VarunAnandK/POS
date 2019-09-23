import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HelperModel } from 'src/Model/Helper-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [MessageService]
})
export class AppComponent {
  title = 'POSWebV2';
  constructor(public helper : HelperModel){

  }
}
