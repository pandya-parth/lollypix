@extends('admin.layouts.app')
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
			<li><a href="#" class="active">{!!$user_detail->profile->name!!}</a>
			</li>
		</ul>
		<!-- START PANEL -->
		<div class="panel panel-transparent">
			<div class="panel-heading">
			</div>
			<div class="panel-body">
				<div class="row">
					<div class="col-sm-10">
						<div class="form-horizontal" >
							<div class="form-group">
								<label  class="col-sm-1 control-label"><img src="{!!$user_detail->profile->profile_pic!!}"></label>
								<div class="col-sm-9">
									<label  class="col-sm-3 control-label">{!!$user_detail->profile->name!!}</label><br>
									<span class="detailed">{!!$user_detail->profile->status !!}</span>
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-3 control-label">Email:</label>
								<div class="col-sm-9">
									<label  class="col-sm-3 control-label">{!!$user_detail->email!!}</label>
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-3 control-label">Birth Date:</label>
								<div class="col-sm-9">
									<label  class="col-sm-3 control-label">{!!$user_detail->profile->birth_date!!}</label>
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-3 control-label">Gender:</label>
								<div class="col-sm-9">
									<label  class="col-sm-3 control-label">{!!$user_detail->profile->gender!!}</label>
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-3 control-label">Location:</label>
								<div class="col-sm-9">
									<label  class="col-sm-3 control-label">{!!$user_detail->profile->city."-".$user_detail->profile->zip_code." | ". $user_detail->profile->country!!}</label>
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-3 control-label">BIO:</label>
								<div class="col-sm-9">
									<label  class="col-sm-3 control-label">{!!$user_detail->profile->bio !!}</label>
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-3 control-label">Id Proof:</label>
								<div class="col-sm-9">
									<img src="{!!$user_detail->profile->id_proof !!}">
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-3 control-label">Subscribe:</label>
								<div class="col-sm-9">
									<label  class="col-sm-3 control-label">{!!$user_detail->profile->subscribe !!}</label>
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-3 control-label">Height:</label>
								<div class="col-sm-9">
									<label  class="col-sm-3 control-label">{!!$user_detail->profile->height !!}</label>
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-3 control-label">Chest/Bust:</label>
								<div class="col-sm-9">
									<label  class="col-sm-3 control-label">{!!$user_detail->profile->chest_bust !!}</label>
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-3 control-label">Waist:</label>
								<div class="col-sm-9">
									<label  class="col-sm-3 control-label">{!!$user_detail->profile->waist !!}</label>
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-3 control-label">Physique:</label>
								<div class="col-sm-9">
									<label  class="col-sm-3 control-label">{!!$user_detail->profile->physique !!}</label>
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-3 control-label">Hair Color:</label>
								<div class="col-sm-9">
									<label  class="col-sm-3 control-label">{!!$user_detail->profile->hair_color !!}</label>
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-3 control-label">Shoe Size:</label>
								<div class="col-sm-9">
									<label  class="col-sm-3 control-label">{!!$user_detail->profile->shoe_size !!}</label>
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-3 control-label">Eye Color:</label>
								<div class="col-sm-9">
									<label  class="col-sm-3 control-label">{!!$user_detail->profile->eye_color !!}</label>
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-3 control-label">Facebook Link:</label>
								<div class="col-sm-9">
									<label  class="col-sm-3 control-label"><a href="{!!$user_detail->profile->facebook !!}" target="_blank">{!!$user_detail->profile->facebook !!}</a></label>
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-3 control-label">Google+ Link:</label>
								<div class="col-sm-9">
									<label  class="col-sm-3 control-label"><a href="{!!$user_detail->profile->google_plus !!}">{!!$user_detail->profile->google_plus !!}</a></label>
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-3 control-label">Twitter Link:</label>
								<div class="col-sm-9">
									<label  class="col-sm-3 control-label"><a href="{!!$user_detail->profile->twitter !!}" target="_blank">{!!$user_detail->profile->twitter !!}</a></label>
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-3 control-label">Linked In Link:</label>
								<div class="col-sm-9">
									<label  class="col-sm-3 control-label"><a href="{!!$user_detail->profile->linked_in !!}" target="_blank">{!!$user_detail->profile->linked_in !!}</a></label>
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