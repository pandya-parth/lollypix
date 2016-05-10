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
        $this->middleware(['auth','auth.admin']);
    }

    public function index()
    {
    	return view('admin/home');
    }

     public function changePassword()
    {
        return view('auth/change-password');
    }
 
    public function updatePassword(Request $request)
    {
        $this->validate($request, [
                'oldpassword'=>'required',
                'newpassword'=>'required|min:3|different:oldpassword|same:password_confirmation',
                'password_confirmation' => 'required|min:3'
        ],[
            'oldpassword.required'=>'This field is required',
            'newpassword.required'=>'This field is required',
            'password_confirmation.required'=>'This field is required',
        ]);

       $user=Auth::user();
       $credentials = [
            'email' => Auth::user()->email,
            'password' => $request->get('oldpassword'),
         ];

      if(Auth::validate($credentials))
         {
         
            $user->password = bcrypt($request->get('newpassword'));
            $user->save();
            return redirect('admin/dashboard');
         }
         return redirect()->back()->with('error_msg','Invalid Current Password');
    }
}
