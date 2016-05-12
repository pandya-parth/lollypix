@extends('layouts.app')
@section('title','Tag')
@section('content')
<div class='content'>
	<div class="container-fluid container-fixed-lg bg-white">
			<div class="inner">
				<ul class="breadcrumb">
					<li>
						<a href="{!!route('dashboard')!!}">Dashboard</a>
					</li>
					<li>
						<a href="{!!url("admin/tags")!!}" >Tags</a>
					</li>
					<li>
						<a href="{!!route("admin.tags.create")!!}" class='active'>{!!isset($tag)?$tag->name:"New Tag"!!}</a>
					</li>
				</ul>
			</div>
	        <div class="row ">
	            @if (! empty(session('error_msg')))
			        <div class="alert alert-danger">
			    		{{ session('error_msg') }}
			        </div>
		        @endif
	       	  {!! Former::open()->action(isset($tag->id)? URL::route("admin.tags.update",array($tag->id),array('files' => true)) : URL::route("admin.tags.store") )->method(isset($tag->id)? 'put':'post')->enctype("multipart/form-data")->class('p-t-15')->role('form') !!}
	         
	            <div class="row">
	                <div class="col-sm-6">
	                  <div class="form-group form-group-default">
	                    {!!  Former::label('Name')!!}
	                    {!!  Former::text('name')->placeholder('Tags/Categories')->id(false)->label(false)->class('form-control required') !!}
	                    </div>
	                </div>
	            </div>
	            <div class="row">
	                <div class="col-sm-6">
	                  <div class="form-group form-group-default ">
	                    {!!  Former::label('Photo')!!}
	                    <div id="filelist" >Upload photos from here..</div>
	                        <div id="container">
	                        <a id="pickfiles" href="javascript:;">[Select files]</a>
	                    	</div>
	                    	<td></td>
	                    	<div id="preview"></div>
	                    	@if(isset($tag))
	                    	<div class="form-group">
	                   	   		<img src={!!$tag->photo_url("thumb")!!}>
	                    	</div>
	                    	@endif
	                      {!! Former::hidden('photo')->id('photo') !!}
	                      <div class="error">{!! $errors->first('photo') !!}</div>
	                  </div>
	                </div>
	            </div>
	            {!!Former::submit((isset($tag)?"Update":'Add'))->class('btn btn-primary btn-cons m-t-10')!!}
	            {!! Former::close() !!}
		</div>
	</div>
</div>
@endsection
          
