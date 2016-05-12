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

/* All Admin routes start from here: */
Route::group(['middleware' => ['auth', 'auth.admin'],'prefix'=>'admin','namespace'=>'Admin'], function(){

	/* Route for Admin Dashboard */
	Route::get('/', ['as'=>'dashboard','uses'=>'DashboardController@index']);

	/* Route for Change Password for admin */
	Route::post('changePassword',['as'=>'changePassword','uses'=> 'UserController@updatePassword']);
    Route::get('changePassword', ['as'=>'changePassword','uses'=> 'UserController@changePassword']);
    /* Route for Logout */
    Route::get('logout',['as'=>'logout', 'uses'=>'UserController@getLogout']);
    
    /* Route for  web site  setting */
   	Route::controller('settings', 'SettingsController');

    /* Route for Admin User Management */
    Route::resource('users','UserController');
    /* Route for Admin Tags Management */
    Route::resource('tags','TagsController');

});
/* Admin routes ends here. */
	
