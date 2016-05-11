<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User; // call model  User
use App\UserProfile; //call model  UserProfile
use Auth;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users=User::where("role","<>","admin")->get(); // fetch users records only (not admin)
        return view('admin/users/index',compact('users'));// to view users page
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user_detail=User::findOrFail($id);// fetch record for selected id only
        return view('admin.users.user_detail',compact('user_detail')); // to view user_detail page this page will contain single user informtion
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }


    //to view change password form
    public function changePassword()
    {
      return view('auth.change-password');
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
            return redirect('admin'); //redirect to admin dashboard after changing password
         }
         return redirect()->back()->with('error_msg','Invalid Current Password'); // redirect back if credential not match 
    }


}
