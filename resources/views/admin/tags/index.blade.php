@extends('admin.layouts.app')
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

 		<div class="row">
 			
					<div class="pull-right">
						<div class="col-xs-12">
							<a href="{!! route('admin.tags.create') !!}" class="btn btn-primary btn-cons"><i class="fa fa-plus"></i>Add New</a>
						</div>
					</div>
	        <div class="col-lg-7 col-md-6 ">
	        	     <!-- START PANEL -->
	        	<div class="panel panel-transparent">

					<div class="panel-heading">
						
						<div class="panel-title">Tags/Categories Listing

						</div>
					</div>
					<div class="panel-body">
						<table class="table table-striped" id="tableWithDynamicRows">
							<thead>
								<tr>
									<th>photo</th>
									<th>name</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
							@foreach($tags as $tag)
								<tr class="odd gradeX">
									<td><img src="{!!url("uploads/tag-thumb",$tag->photo)!!}"></td>
									<td>{!!$tag->name!!}</td>
									{!!Former::open()->method('DELETE')->action(url('admin/tags',$tag->id))!!}
									<td><a href="{!! route('admin.tags.edit',$tag->id) !!}" class="btn btn-success btn-xs"><i class="fa fa-edit"></i></a>
									
									{!! Former::submit("X")->class('btn btn-danger btn-xs')!!}
									{!!Former::close()!!}</td>
					
								</tr>
							@endforeach
							</tbody>
						</table>
					</div>
				</div>
				<!-- START PANEL -->
			</div>
              <div class="col-lg-5 col-md-6">
                <!-- START PANEL -->
                <div class="panel panel-transparent">
			      <div class="panel-heading">Filters</div>
			      	<div class="panel-body">
			        	{!! Former::open_vertical()->method('GET') !!}
			        	{!! Former::text("id")->label("ID") !!}      
			        	{!! Former::text("name","name") !!} 	
			        	{!! Former::actions()->success_submit('Filter')->small_link('Reset',URL::current()) !!}
			        	{!! Former::close() !!}
			         </div>
                </div>
                <!-- END PANEL -->
              </div>
		</div>
	</div>
</div>
@endsection