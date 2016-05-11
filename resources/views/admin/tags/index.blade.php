@extends('layouts.app')
@section('titile','Tag')
@section('content')
<div class='content'>
  <div class="container-fluid container-fixed-lg bg-white">
    <div class="inner">
                <ul class="breadcrumb">
                    <li>
                        <a href="{!!route('dashboard')!!}">Dashboard</a>
                    </li>
                    <li>
                        <a href="{!!url("admin/tags")!!}" class='active'>Tags</a>
                    </li>
                </ul>
          </div>
          
            <!-- START PANEL -->
            <div class="panel panel-transparent">
              <div class="panel-heading">
                <div class="panel-title">Tags/Categories Listing
                </div>
                 <div class="pull-right">
                  <div class="col-xs-12">
                    <button  class="btn btn-primary btn-cons"><i class="fa fa-plus"></i> Add row</button>
                  </div>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="panel-body">
                <table class="table table-striped" id="">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Photo</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="odd gradeX">
                      <td>Trident</td>
                      <td>Internet Explorer 4.0</td>
                      <td>Win 95+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- END PANEL -->
          </div>
  </div>
@endsection