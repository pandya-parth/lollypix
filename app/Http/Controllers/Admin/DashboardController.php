<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Former\Facades\Former;
use Auth;

class DashboardController extends Controller
{
	public function __construct()
    {
      //this is for checking authentication 
        $this->middleware(['auth','auth.admin']);
    }

    public function index()
    {
      // to view admin dashboard
    	return view('admin/index');
    }

    //to view change password form
     public function changePassword()
    {
    
        return view('auth/change-password');
    }
    
    //to update password 
    public function updatePassword(Request $request)
    {
      //set validation for each request
        $this->validate($request, [
                'oldpassword'=>'required',
                'newpassword'=>'required|min:3|different:oldpassword|same:password_confirmation',
                'password_confirmation' => 'required|min:3'
        ],[
            //  set custom message for validation rule if not set it will display default error message
            'oldpassword.required'=>'This field is required',
            'newpassword.required'=>'This field is required',
            'password_confirmation.required'=>'This field is required',
        ]);

       $user=Auth::user();// logged user 
       $credentials = [
            'email' => Auth::user()->email,
            'password' => $request->get('oldpassword'),
         ];

      if(Auth::validate($credentials))//check credentials if validate
         {
         
            $user->password = bcrypt($request->get('newpassword'));
            $user->save(); // update in database 
            return redirect('admin/dashboard'); //redirect to admin dashboard after changing password
         }
         return redirect()->back()->with('error_msg','Invalid Current Password'); // redirect back if credential not match 
    }
}
