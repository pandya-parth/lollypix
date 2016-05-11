<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Former\Facades\Former;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Setting;
use Illuminate\Support\Facades\Input;
use Redirect;
use Validator;
use Config;
use Cache;


class SettingsController extends Controller
{

     public function getIndex() {
     	$settings = Cache::remember('settings', 60, function() {
             return Setting::lists('value', 'id');
        });
   		foreach ($settings as $id => $value)
    	{

      		Config::set($id, $value);
    	}
   		return view('admin/settings/index');
  	}

  	public function postIndex() {
	    $rules = array(
	        'site_name' => 'required',
	        'site_email' => 'required|email',
	        'site_phone' => 'required',
	        'site_fax' => 'required',
	    );
	        
	    $validation = Validator::make(Input::all(), $rules);
	    if ($validation->fails()) {
	      return Redirect::back()
	                      ->withErrors($validation)
	                      ->withInput()
	                      ->with("error", "Please correct following details.");
	    }
	    foreach (Input::all() as $id => $value) {
	      $id = str_replace('_', '.', $id);
	      $setting = Setting::find($id);
	      if (!$setting) {
	        $setting = new Setting();
	        $setting->id = $id;
	      }
	      $setting->value = $value;
	      $setting->save();
	    }
	     \Cache::forget('settings');
	     return redirect('/admin');
	}
}