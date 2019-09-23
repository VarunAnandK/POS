<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// $auth = 'auth:api';
//User
Route::get('UserList', 'ApiController\UserController@UserList');
Route::get('UserById/{id}', 'ApiController\UserController@UserById');
Route::post('UserInsert', 'ApiController\UserController@UserInsert');
Route::post('UserUpdate/{id}', 'ApiController\UserController@UserUpdate');
Route::get('UserDelete/{id}', 'ApiController\UserController@UserDelete');
Route::post('ValidateUser', 'ApiController\UserController@ValidateUser');
//User
//State
Route::get('StateList', 'ApiController\StateController@StateList');
Route::get('StateById/{id}', 'ApiController\StateController@StateById');
Route::post('StateInsert', 'ApiController\StateController@StateInsert');
Route::post('StateUpdate/{id}', 'ApiController\StateController@StateUpdate');
Route::get('StateDelete/{id}', 'ApiController\StateController@StateDelete');
//State
//Country
Route::get('CountryList', 'ApiController\CountryController@CountryList');
Route::get('CountryById/{id}', 'ApiController\CountryController@CountryById');
Route::post('CountryInsert', 'ApiController\CountryController@CountryInsert');
Route::post('CountryUpdate/{id}', 'ApiController\CountryController@CountryUpdate');
Route::get('CountryDelete/{id}', 'ApiController\CountryController@CountryDelete');
//Country
//City
Route::get('CityList', 'ApiController\CityController@CityList');
Route::get('CityById/{id}', 'ApiController\CityController@CityById');
Route::post('CityInsert', 'ApiController\CityController@CityInsert');
Route::post('CityUpdate/{id}', 'ApiController\CityController@CityUpdate');
Route::get('CityDelete/{id}', 'ApiController\CityController@CityDelete');
//City
//Currency
Route::get('CurrencyList', 'ApiController\CurrencyController@CurrencyList');
Route::get('CurrencyById/{id}', 'ApiController\CurrencyController@CurrencyById');
Route::post('CurrencyInsert', 'ApiController\CurrencyController@CurrencyInsert');
Route::post('CurrencyUpdate/{id}', 'ApiController\CurrencyController@CurrencyUpdate');
Route::get('CurrencyDelete/{id}', 'ApiController\CurrencyController@CurrencyDelete');
//Currency
//UnitOfMeasurement
Route::get('UnitOfMeasurementList', 'ApiController\UnitOfMeasurementController@UnitOfMeasurementList');
Route::get('UnitOfMeasurementById/{id}', 'ApiController\UnitOfMeasurementController@UnitOfMeasurementById');
Route::post('UnitOfMeasurementInsert', 'ApiController\UnitOfMeasurementController@UnitOfMeasurementInsert');
Route::post('UnitOfMeasurementUpdate/{id}', 'ApiController\UnitOfMeasurementController@UnitOfMeasurementUpdate');
Route::get('UnitOfMeasurementDelete/{id}', 'ApiController\UnitOfMeasurementController@UnitOfMeasurementDelete');
//UnitOfMeasurement
//GST
Route::get('GSTList', 'ApiController\GSTController@GSTList');
Route::get('GSTById/{id}', 'ApiController\GSTController@GSTById');
Route::post('GSTInsert', 'ApiController\GSTController@GSTInsert');
Route::post('GSTUpdate/{id}', 'ApiController\GSTController@GSTUpdate');
Route::get('GSTDelete/{id}', 'ApiController\GSTController@GSTDelete');
//GST
//GSTCategory
Route::get('GSTCategoryList', 'ApiController\GSTCategoryController@GSTCategoryList');
Route::get('GSTCategoryById/{id}', 'ApiController\GSTCategoryController@GSTCategoryById');
Route::post('GSTCategoryInsert', 'ApiController\GSTCategoryController@GSTCategoryInsert');
Route::post('GSTCategoryUpdate/{id}', 'ApiController\GSTCategoryController@GSTCategoryUpdate');
Route::get('GSTCategoryDelete/{id}', 'ApiController\GSTCategoryController@GSTCategoryDelete');
//GSTCategory
//GSTDetail
Route::get('GSTDetailList', 'ApiController\GSTDetailController@GSTDetailList');
Route::get('GSTDetailById/{id}', 'ApiController\GSTDetailController@GSTDetailById');
Route::get('GSTDetailByGSTId/{id}', 'ApiController\GSTDetailController@GSTDetailByGSTId');
Route::post('GSTDetailInsert', 'ApiController\GSTDetailController@GSTDetailInsert');
Route::post('GSTDetailUpdate/{id}', 'ApiController\GSTDetailController@GSTDetailUpdate');
Route::get('GSTDetailDelete/{id}', 'ApiController\GSTDetailController@GSTDetailDelete');
//GSTDetail
//PaymentMethod
Route::get('PaymentMethodList', 'ApiController\PaymentMethodController@PaymentMethodList');
Route::get('PaymentMethodById/{id}', 'ApiController\PaymentMethodController@PaymentMethodById');
Route::post('PaymentMethodInsert', 'ApiController\PaymentMethodController@PaymentMethodInsert');
Route::post('PaymentMethodUpdate/{id}', 'ApiController\PaymentMethodController@PaymentMethodUpdate');
Route::get('PaymentMethodDelete/{id}', 'ApiController\PaymentMethodController@PaymentMethodDelete');
//PaymentMethod
//PaymentTerm
Route::get('PaymentTermList', 'ApiController\PaymentTermController@PaymentTermList');
Route::get('PaymentTermById/{id}', 'ApiController\PaymentTermController@PaymentTermById');
Route::post('PaymentTermInsert', 'ApiController\PaymentTermController@PaymentTermInsert');
Route::post('PaymentTermUpdate/{id}', 'ApiController\PaymentTermController@PaymentTermUpdate');
Route::get('PaymentTermDelete/{id}', 'ApiController\PaymentTermController@PaymentTermDelete');
//PaymentTerm
//BusinessCategory
Route::get('BusinessCategoryList', 'ApiController\BusinessCategoryController@BusinessCategoryList');
Route::get('BusinessCategoryById/{id}', 'ApiController\BusinessCategoryController@BusinessCategoryById');
Route::post('BusinessCategoryInsert', 'ApiController\BusinessCategoryController@BusinessCategoryInsert');
Route::post('BusinessCategoryUpdate/{id}', 'ApiController\BusinessCategoryController@BusinessCategoryUpdate');
Route::get('BusinessCategoryDelete/{id}', 'ApiController\BusinessCategoryController@BusinessCategoryDelete');
//BusinessCategory
//ProductCategory
Route::get('ProductCategoryList', 'ApiController\ProductCategoryController@ProductCategoryList');
Route::get('ParentProductCategoryList', 'ApiController\ProductCategoryController@ParentProductCategoryList');
Route::get('ProductCategoryById/{id}', 'ApiController\ProductCategoryController@ProductCategoryById');
Route::post('ProductCategoryInsert', 'ApiController\ProductCategoryController@ProductCategoryInsert');
Route::post('ProductCategoryUpdate/{id}', 'ApiController\ProductCategoryController@ProductCategoryUpdate');
Route::get('ProductCategoryDelete/{id}', 'ApiController\ProductCategoryController@ProductCategoryDelete');
Route::get('ProductCategoryByParentCategoryId/{id}', 'ApiController\ProductCategoryController@ProductCategoryByParentCategoryId');
//ProductCategory
//BusinessGroup
Route::get('BusinessGroupList', 'ApiController\BusinessGroupController@BusinessGroupList');
Route::get('BusinessGroupById/{id}', 'ApiController\BusinessGroupController@BusinessGroupById');
Route::post('BusinessGroupInsert', 'ApiController\BusinessGroupController@BusinessGroupInsert');
Route::post('BusinessGroupUpdate/{id}', 'ApiController\BusinessGroupController@BusinessGroupUpdate');
Route::get('BusinessGroupDelete/{id}', 'ApiController\BusinessGroupController@BusinessGroupDelete');
//BusinessGroup
//Business
Route::get('BusinessList', 'ApiController\BusinessController@BusinessList');
Route::get('BusinessById/{id}', 'ApiController\BusinessController@BusinessById');
Route::post('BusinessInsert', 'ApiController\BusinessController@BusinessInsert');
Route::post('BusinessUpdate/{id}', 'ApiController\BusinessController@BusinessUpdate');
Route::get('BusinessDelete/{id}', 'ApiController\BusinessController@BusinessDelete');
Route::get('BusinessSearchAndList/{take}/{skip}/{global_filter?}', 'ApiController\BusinessController@BusinessSearchAndList');
Route::get('BusinessSummary/{start_date}/{end_date}', 'ApiController\BusinessController@BusinessSummary');
Route::get('BusinessDetailSummary/{business_id}/{start_date}/{end_date}', 'ApiController\BusinessController@BusinessDetailSummary');
//Business
//Product
Route::get('ProductList', 'ApiController\ProductController@ProductList');
Route::get('ProductById/{id}', 'ApiController\ProductController@ProductById');
Route::post('ProductInsert', 'ApiController\ProductController@ProductInsert');
Route::post('ProductUpdate/{id}', 'ApiController\ProductController@ProductUpdate');
Route::get('ProductDelete/{id}', 'ApiController\ProductController@ProductDelete');
Route::get('ProductSearchAndList/{take}/{skip}/{global_filter?}', 'ApiController\ProductController@ProductSearchAndList');
Route::get('GetAllProductByName/{product_filter?}', 'ApiController\ProductController@GetAllProductByName');
Route::get('GetAllProductByBarcode/{product_filter?}', 'ApiController\ProductController@GetAllProductByBarcode');
Route::get('ProductSummary/{start_date}/{end_date}', 'ApiController\ProductController@ProductSummary');
Route::get('ProductDetailSummary/{product_id}/{start_date}/{end_date}', 'ApiController\ProductController@ProductDetailSummary');
//Product
Route::get('SalesList', 'ApiController\SalesController@SalesList');
Route::get('SalesById/{id}', 'ApiController\SalesController@SalesById');
Route::post('SalesInsert', 'ApiController\SalesController@SalesInsert');
Route::post('SalesUpdate/{id}', 'ApiController\SalesController@SalesUpdate');
Route::get('SalesDelete/{id}', 'ApiController\SalesController@SalesDelete');
Route::get('SalesByDate/{date}', 'ApiController\SalesController@SalesByDate');
Route::get('SalesCompleteUpdate/{SaleID}', 'ApiController\SalesController@SalesCompleteUpdate');
Route::get('SalesDayCloseReport/{id}', 'ApiController\SalesController@SalesDayCloseReport');
Route::get('SalesAmountUpdate/{SaleID}/{CashAmount}/{CardAmount}', 'ApiController\SalesController@SalesAmountUpdate');
Route::get('SalesOpeningCashUpdate/{SaleID}/{OpeningCash}', 'ApiController\SalesController@SalesOpeningCashUpdate');
Route::get('DayClosePrint/{id}', 'ApiController\SalesController@DayClosePrint');
Route::get('DayBookSummary/{start_date}/{end_date}', 'ApiController\SalesController@DayBookSummary');
Route::get('SalesRegister/{year}', 'ApiController\SalesController@SalesRegister');
Route::get('SalesRegisterDetail/{month}', 'ApiController\SalesController@SalesRegisterDetail');
//Sales
//Order
Route::get('OrderList', 'ApiController\OrderController@OrderList');
Route::get('OrderById/{id}', 'ApiController\OrderController@OrderById');
Route::post('OrderInsert', 'ApiController\OrderController@OrderInsert');
Route::post('OrderUpdate/{id}', 'ApiController\OrderController@OrderUpdate');
Route::get('OrderDelete/{id}', 'ApiController\OrderController@OrderDelete');
Route::get('OrderDeleteAll/{Orderno}', 'ApiController\OrderController@OrderDeleteAll');
Route::get('OrderAndPaymentDeleteAll/{Orderno}', 'ApiController\OrderController@OrderAndPaymentDeleteAll');
Route::get('HoldOrderList/{Orderno}', 'ApiController\OrderController@HoldOrderList');
Route::get('OrderBusinessUpdate/{Orderno}/{business_id}', 'ApiController\OrderController@OrderBusinessUpdate');
Route::get('GetOrderByOrderNo/{Orderno}', 'ApiController\OrderController@GetOrderByOrderNo');
Route::get('OrderDiscountUpdate/{Orderno}/{discount_amount}', 'ApiController\OrderController@OrderDiscountUpdate');
Route::get('GetAllOrdersBySalesID/{SalesId}', 'ApiController\OrderController@GetAllOrdersBySalesID');
Route::get('GetAllOrderGSTList/{Orderno}', 'ApiController\OrderController@GetAllOrderGSTList');
Route::get('OrderToInvoice/{CreatedById}/{OrderNo}/{SalesId}/{Note}', 'ApiController\OrderController@OrderToInvoice');
Route::post('OrderRoundOffAmountUpdate', 'ApiController\OrderController@OrderRoundOffAmountUpdate');
//Order
//Comapny
Route::get('CompanyList', 'ApiController\CompanyController@CompanyList');
Route::get('CompanyById/{id}', 'ApiController\CompanyController@CompanyById');
Route::post('CompanyInsert', 'ApiController\CompanyController@CompanyInsert');
Route::post('CompanyUpdate/{id}', 'ApiController\CompanyController@CompanyUpdate');
Route::get('CompanyDelete/{id}', 'ApiController\CompanyController@CompanyDelete');
Route::get('CompanySearchAndList/{take}/{skip}/{global_filter?}', 'ApiController\CompanyController@CompanySearchAndList');
//Comapny
//GetNumber
Route::get('GetNumber/{type}', 'ApiController\GenerateNumberController@GetNumber');
//GetNumber

//Order Payment
Route::get('OrderPaymentList', 'ApiController\OrderPaymentController@OrderPaymentList');
Route::get('OrderPaymentById/{id}', 'ApiController\OrderPaymentController@OrderPaymentById');
Route::post('OrderPaymentInsert', 'ApiController\OrderPaymentController@OrderPaymentInsert');
Route::post('OrderPaymentUpdate/{id}', 'ApiController\OrderPaymentController@OrderPaymentUpdate');
Route::get('OrderPaymentDelete/{id}', 'ApiController\OrderPaymentController@OrderPaymentDelete');
Route::get('GetOrderPaymentByOrderNo/{Orderno}', 'ApiController\OrderPaymentController@GetOrderPaymentByOrderNo');
//Order Payment
//Invoice
Route::get('InvoiceList', 'ApiController\InvoiceController@InvoiceList');
Route::get('InvoiceById/{id}', 'ApiController\InvoiceController@InvoiceById');
Route::post('InvoiceInsert', 'ApiController\InvoiceController@InvoiceInsert');
Route::post('InvoiceUpdate/{id}', 'ApiController\InvoiceController@InvoiceUpdate');
Route::get('InvoiceDelete/{id}', 'ApiController\InvoiceController@InvoiceDelete');
Route::get('InvoicePrint/{id}', 'ApiController\InvoiceController@InvoicePrint');
Route::get('GetAllInvoiceListBySalesId/{SalesID}', 'ApiController\InvoiceController@GetAllInvoiceListBySalesId');
Route::get('GetAllInvoiceList/{Start_Date}/{End_Date}/{Payment_Method_Id}', 'ApiController\InvoiceController@GetAllInvoiceList');
Route::get('GetAllInvoiceListPrint/{Start_Date}/{End_Date}/{Payment_Method_Id}', 'ApiController\InvoiceController@GetAllInvoiceListPrint');
//Invoice

//InvoiceDetail
Route::get('InvoiceDetailList', 'ApiController\InvoiceDetailController@InvoiceDetailList');
Route::get('InvoiceDetailById/{id}', 'ApiController\InvoiceDetailController@InvoiceDetailById');
Route::post('InvoiceDetailInsert', 'ApiController\InvoiceDetailController@InvoiceDetailInsert');
Route::post('InvoiceDetailUpdate/{id}', 'ApiController\InvoiceDetailController@InvoiceDetailUpdate');
Route::get('InvoiceDetailDelete/{id}', 'ApiController\InvoiceDetailController@InvoiceDetailDelete');
Route::post('InvoiceDetailInsertBulk', 'ApiController\InvoiceDetailController@InvoiceDetailInsertBulk');
//InvoiceDetail

//PaymentReceived
Route::get('PaymentReceivedList', 'ApiController\PaymentReceivedController@PaymentReceivedList');
Route::get('PaymentReceivedById/{id}', 'ApiController\PaymentReceivedController@PaymentReceivedById');
Route::post('PaymentReceivedInsert', 'ApiController\PaymentReceivedController@PaymentReceivedInsert');
Route::post('PaymentReceivedUpdate/{id}', 'ApiController\PaymentReceivedController@PaymentReceivedUpdate');
Route::get('PaymentReceivedDelete/{id}', 'ApiController\PaymentReceivedController@PaymentReceivedDelete');
//PaymentReceived

//PaymentReceivedDetail
Route::get('PaymentReceivedDetailList', 'ApiController\PaymentReceivedDetailController@PaymentReceivedDetailList');
Route::get('PaymentReceivedDetailById/{id}', 'ApiController\PaymentReceivedDetailController@PaymentReceivedDetailById');
Route::post('PaymentReceivedDetailInsert', 'ApiController\PaymentReceivedDetailController@PaymentReceivedDetailInsert');
Route::post('PaymentReceivedDetailUpdate/{id}', 'ApiController\PaymentReceivedDetailController@PaymentReceivedDetailUpdate');
Route::get('PaymentReceivedDetailDelete/{id}', 'ApiController\PaymentReceivedDetailController@PaymentReceivedDetailDelete');
Route::post('PaymentReceivedDetailInsertBulk', 'ApiController\PaymentReceivedDetailController@PaymentReceivedDetailInsertBulk');
//PaymentReceivedDetail
