import { SliderModule } from 'primeng/slider';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelperModel } from 'src/Model/Helper-model';
import { CountryComponent } from './country/country.component';
import { TableModule } from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import {CalendarModule} from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { PartialCountry } from './partialcountry/partial-country.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DropdownModule } from 'primeng/dropdown';
import { GSTComponent } from './gst/gst.component';
import { GSTCreateOrUpdateComponent } from './gstcreate-or-update/gstcreate-or-update.component';
import { PartialGSTDetailComponent } from './partial-gstdetail/partial-gstdetail.component';
import { CurrencyComponent } from './currency/currency.component';
import { PartialCurrency } from './partialcurrency/partialcurrency.component';
import { StateComponent } from './state/state.component';
import { PartialState } from './partialstate/partialstate.component';
import { CityComponent } from './city/city.component';
import { PartialCity } from './partialcity/partialcity.component';
import { BusinessCategoryComponent } from './businesscategory/businesscategory.component';
import { PartialBusinessCategory } from './partialbusinesscategory/partialbusinesscategory.component';
import { GSTCategoryComponent } from './gstcategory/gstcategory.component';
import { PartialGSTCategory } from './partialgstcategory/partialgstcategory.component';
import { PaymentMethodComponent } from './paymentmethod/paymentmethod.component';
import { PartialPaymentMethod } from './partialpaymentmethod/partialpaymentmethod.component';
import { UnitOfMeasurementComponent } from './unitofmeasurement/unitofmeasurement.component';
import { PartialUnitOfMeasurement } from './partialunitofmeasurement/partialunitofmeasurement.component';
import { ProductCategoryComponent } from './productcategory/productcategory.component';
import { PartialProductCategory } from './partialproductcategory/partialproductcategory.component';
import { PosDashoardComponent } from './pos-dashoard/pos-dashoard.component';
import { PosNavbarComponent } from './pos-navbar/pos-navbar.component';
import { DataViewModule } from 'primeng/dataview';
import { DataTableModule } from 'primeng/datatable';
import { CheckboxModule } from 'primeng/checkbox';
import { BusinessGroupComponent } from './businessgroup/businessgroup.component';
import { PartialBusinessGroup } from './partialbusinessgroup/partialbusinessgroup.component';
import { BusinessComponent } from './business/business.component';
import { BusinessCreateOrUpdateComponent } from './businesscreateorupdate/businesscreateorupdate.component';
import { ProductComponent } from './product/product.component';
import { ProductCreateOrUpdateComponent } from './productcreateorupdate/productcreateorupdate.component';
import { AutoCompleteModule, SharedModule } from 'primeng/primeng';
import { CompanyCreateOrUpdateComponent } from './companycreateorupdate/companycreateorupdate.component';
import { CookieService } from 'ngx-cookie-service';
import { DecimalPoint } from '../Directive/decimalpoint.directive';
import { NumberOnly } from '../Directive/numberonly.directive';
import { PartialDiscountComponent } from './partialdiscount/partialdiscount.component';
import { PartialholdlistComponent } from './partialholdlist/partialholdlist.component';
import { PartialcashComponent } from './partialcash/partialcash.component';
import { InvoiceReportComponent } from './invoice-report/invoice-report.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { PartialdaycloseComponent } from './partialdayclose/partialdayclose.component';
import { FileUploadModule } from 'primeng/fileupload';
import { PartialaddcustomerComponent } from './partialaddcustomer/partialaddcustomer.component';
import { PartialaddproductComponent } from './partialaddproduct/partialaddproduct.component';
import { PartialgstlistComponent } from './partialgstlist/partialgstlist.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PartialopeningcashComponent } from './partialopeningcash/partialopeningcash.component';
import { PartialroundoffComponent } from './partialroundoff/partialroundoff.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PartialinvoiceComponent } from './partialinvoice/partialinvoice.component';
import { ProductsummaryComponent } from './productsummary/productsummary.component';
import { ProductdetailsummaryComponent } from './productdetailsummary/productdetailsummary.component';
import { BusinesssummaryComponent } from './businesssummary/businesssummary.component';
import { BusinessdetailsummaryComponent } from './businessdetailsummary/businessdetailsummary.component';
import { DaybooksummaryComponent } from './daybooksummary/daybooksummary.component';
import { SalesregisterComponent } from './salesregister/salesregister.component';
import { SalesregisterdetailComponent } from './salesregisterdetail/salesregisterdetail.component';
import { InvoicelistComponent } from './invoicelist/invoicelist.component';

const Routerlist: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  { path: 'Logout', component: LogoutComponent },
  {
    path: '',
    component: NavbarComponent,
    children: [
      { path: 'Dashboard', component: DashboardComponent },
      { path: 'Country', component: CountryComponent },
      { path: 'PaymentMethod', component: PaymentMethodComponent },
      { path: 'UnitOfMeasurement', component: UnitOfMeasurementComponent },
      { path: 'State', component: StateComponent },
      { path: 'City', component: CityComponent },
      { path: 'Currency', component: CurrencyComponent },
      { path: 'GSTCategory', component: GSTCategoryComponent },
      { path: 'BusinessCategory', component: BusinessCategoryComponent },
      { path: 'ProductCategory', component: ProductCategoryComponent },
      { path: 'GST', component: GSTComponent },
      { path: 'GSTCreateOrUpdate/:Id', component: GSTCreateOrUpdateComponent },
      { path: 'BusinessGroup', component: BusinessGroupComponent },
      { path: 'Business', component: BusinessComponent },
      { path: 'BusinessCreateOrUpdate/:Id', component: BusinessCreateOrUpdateComponent },
      { path: 'Product', component: ProductComponent },
      { path: 'ProductCreateOrUpdate/:Id', component: ProductCreateOrUpdateComponent },
      { path: 'CompanyCreateOrUpdate/:Id', component: CompanyCreateOrUpdateComponent },
      { path: 'InvoicePrint', component: InvoiceReportComponent },
      { path: 'Invoice', component: InvoiceComponent },
      { path: 'ProductSummary', component: ProductsummaryComponent },
      { path: 'ProductDetailSummary/:Id/:StartDate/:EndDate', component: ProductdetailsummaryComponent },
      { path: 'BusinessSummary', component: BusinesssummaryComponent },
      { path: 'BusinessDetailSummary/:Id/:StartDate/:EndDate', component: BusinessdetailsummaryComponent },
      { path: 'DayBookSummary', component: DaybooksummaryComponent },
      { path: 'SalesRegister', component: SalesregisterComponent },
      { path: 'SalesRegisterDetail/:Id', component: SalesregisterdetailComponent },
      { path: 'InvoiceList', component: InvoicelistComponent },
    ]
  },
  {
    path: '',
    component: PosNavbarComponent,
    children: [
      { path: 'POS', component: PosDashoardComponent },
    ]
  },

]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LeftMenuComponent,
    DashboardComponent,
    CountryComponent,
    PartialCountry,
    CurrencyComponent,
    PartialCurrency,
    StateComponent,
    PartialState,
    CityComponent,
    PartialCity,
    BusinessCategoryComponent,
    PartialBusinessCategory,
    GSTCategoryComponent,
    PartialGSTCategory,
    PaymentMethodComponent,
    PartialPaymentMethod,
    UnitOfMeasurementComponent,
    PartialUnitOfMeasurement,
    ProductCategoryComponent,
    CountryComponent,
    PartialCountry,
    GSTComponent,
    GSTCreateOrUpdateComponent,
    PartialGSTDetailComponent,
    PartialProductCategory,
    PosDashoardComponent,
    PosNavbarComponent,
    PartialProductCategory,
    BusinessGroupComponent,
    PartialBusinessGroup,
    BusinessComponent,
    BusinessCreateOrUpdateComponent,
    ProductComponent,
    ProductCreateOrUpdateComponent,
    CompanyCreateOrUpdateComponent,
    DecimalPoint,
    NumberOnly,
    PartialDiscountComponent,
    PartialholdlistComponent,
    PartialcashComponent,
    InvoiceReportComponent,
    LoginComponent,
    LogoutComponent,
    PartialdaycloseComponent,
    PartialaddcustomerComponent,
    PartialaddproductComponent,
    PartialgstlistComponent,
    PartialopeningcashComponent,
    PartialroundoffComponent,
    InvoiceComponent,
    PartialinvoiceComponent,
    ProductsummaryComponent,
    ProductdetailsummaryComponent,
    BusinesssummaryComponent,
    BusinessdetailsummaryComponent,
    DaybooksummaryComponent,
    SalesregisterComponent,
    SalesregisterdetailComponent,
    InvoicelistComponent
  ],
  imports: [
    BrowserModule,
    SliderModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(Routerlist),
    TableModule,
    PanelModule,
    ButtonModule,
    DynamicDialogModule,
    HttpClientModule,
    FormsModule,
    CalendarModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    NgxSpinnerModule,
    MessageModule,
    DropdownModule,
    DataViewModule,
    InputTextModule,
    DataTableModule,
    CheckboxModule,
    BreadcrumbModule,
    AutoCompleteModule,
    CardModule,
    FileUploadModule,
    ScrollPanelModule,
    SharedModule,
    TabViewModule
  ],
  entryComponents: [
    PartialCountry,
    PartialCurrency,
    PartialState,
    PartialCity,
    PartialBusinessCategory,
    PartialGSTCategory,
    PartialPaymentMethod,
    PartialUnitOfMeasurement,
    PartialGSTDetailComponent,
    PartialProductCategory,
    PartialBusinessGroup,
    PartialDiscountComponent,
    PartialholdlistComponent,
    PartialcashComponent,
    PartialdaycloseComponent,
    PartialaddcustomerComponent,
    PartialaddproductComponent,
    PartialgstlistComponent,
    PartialopeningcashComponent,
    PartialroundoffComponent,
    PartialinvoiceComponent
  ],
  providers: [HelperModel, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
