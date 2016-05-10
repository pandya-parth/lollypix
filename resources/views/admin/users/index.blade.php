@extends('layouts.app')
@section('title','User Details')
@section('content')
<div class="content">
		 <div class="container-fluid container-fixed-lg bg-white">

		 	<ul class="breadcrumb">
			<li>
			<a href="{!! url("admin/dashboard")!!}">Dashboard</a>
			</li>
			<li><a href="#" class="active">Users</a>
			</li>
		</ul>
    <!-- START PANEL -->
    <div class="panel panel-transparent">
      <div class="panel-heading">
        <div class="panel-title">User Information
        </div>
        <div class="export-options-container pull-right"></div>
        <div class="clearfix"></div>
      </div>
      <div class="panel-body">
        <table class="table table-striped" >
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Birth Date</th>
              <th>City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          @foreach($users as $user)
           <tr>
            <td><img src="{!!$user->profile->profile_pic!!}" alt="{!!$user->profile->profile_pic!!}"></td>
            <td>{!!$user->name!!}</td>
            <td>{!!$user->email!!}</td>
            <td>{!!$user->profile->birth_date!!}</td>
            <td>{!!$user->profile->city!!}</td>
            <td class="center"><button class="btn btn-success">Active </button>
            <button class="btn btn-warning">Inactive </button>
            <a href="{!!route('admin.users.show',['id'=>$user->id])!!}" class="btn btn-warning">View</a>
            <button class="btn btn-danger">Suspend </button></td>
            </tr>
           @endforeach
          </tbody>
        </table>
      </div>
    </div>
    <!-- END PANEL -->
  </div>
</div>
@endsection