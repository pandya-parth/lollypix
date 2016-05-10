@extends('layouts.app')
@section('title','User Detail')
@section('content')
<!-- START PAGE CONTENT -->
<div class="content">
	<!-- START CONTAINER FLUID -->
	<div class="container-fluid container-fixed-lg">
		<!-- START BREADCRUMB -->
		<ul class="breadcrumb">
			<li>
				<a href="{!! url('/admin/users')!!}">Users</a>
			</li>
			<li><a href="#" class="active">{!!$user_detail->name!!}</a>
			</li>
		</ul>
		{!!$user_detail->profile->gender!!}

		<!-- START PANEL -->
		<div class="panel panel-transparent">
			<div class="panel-heading">
				{!!$user_detail->profile!!}
			</div>
			<div class="panel-body">
				<div class="row">
				<div class="col-sm-10">
							<div class="form-horizontal" >
								<div class="form-group">
									<label  class="col-sm-3 control-label">Name:</label>
									<div class="col-sm-9">
										<label  class="col-sm-3 control-label">{!!$user_detail->name!!}</label>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-3 control-label">Email:</label>
									<div class="col-sm-9">
										<label  class="col-sm-3 control-label">{!!$user_detail->email!!}</label>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-3 control-label">Registration Date:</label>
									<div class="col-sm-9">
										<label  class="col-sm-3 control-label">{!!$user_detail->created_at!!}</label>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-3 control-label">Last Profile Updated On:</label>
									<div class="col-sm-9">
										<label  class="col-sm-3 control-label">{!!$user_detail->created_at!!}</label>
									</div>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- END PANEL -->
		</div>
		<!-- END CONTAINER FLUID -->
	</div>
	<!-- END PAGE CONTENT -->
	@endsection