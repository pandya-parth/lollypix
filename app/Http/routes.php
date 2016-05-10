<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::auth();

Route::group(['middleware' => ['auth', 'auth.admin'],'prefix'=>'admin','namespace'=>'Admin'], function(){
	Route::get('dashboard', ['as'=>'dashboard','uses'=>'DashboardController@index']);
	Route::post('changePassword',['as'=>'changePassword','uses'=> 'DashboardController@updatePassword']);
    Route::get('changePassword', ['as'=>'changePassword','uses'=> 'DashboardController@changePassword']);
    Route::resource('users','UserController');
});//This is used for Admin section
	
