<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Former\Facades\Former;


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
    	return view('admin.index');
    }

  
       
}
