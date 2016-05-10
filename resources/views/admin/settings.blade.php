@extends('layouts.app')
@section('title','Settings')
@section('content')
<div class= "content">
    <!-- START CONTAINER FLUID -->
     <div class="container-fluid container-fixed-lg">
        <div class="inner">
                <ul class="breadcrumb">
                    <li>
                        <a href="{!!route('dashboard')!!}">Dashboard</a>
                    </li>
                    <li>
                        <a href="{!!url("admin/settings")!!}" class='active'>Settings</a>
                    </li>
                </ul>
        </div>
        <h2>Site Settings</h2>
        @if(Auth::user()->role=='admin')
        {!! Former::open()->method('post')->class('p-t-15')->role('form') !!}
            {!! Former::text("site_name","Site Name",Config::get('site.name')) !!}
            {!! Former::text("site_email","Site Email",Config::get('site.email')) !!}
            {!! Former::text("site_phone","Site Phone",Config::get('site.phone')) !!} 
            {!! Former::text("site_fax","Site Fax",Config::get('site.fax')) !!}       
            {!! Former::submit('Update')->class('btn btn-primary btn-cons m-t-10') !!}
        {!! Former::close() !!}
        @else
        {!! Former::open()->method('post')->class('p-t-15')->role('form') !!}
            {!! Former::text("site_name","Site Name",Config::get('site.name'),['readonly']) !!}
            {!! Former::text("site_email","Site Email",Config::get('site.email'),['readonly']) !!}
            {!! Former::text("site_phone","Site Phone",Config::get('site.phone'),['readonly']) !!} 
            {!! Former::text("site_fax","Site Fax",Config::get('site.fax'),['readonly']) !!}       
        {!! Former::close() !!}
         @endif
    </div>
</div>
@endsection