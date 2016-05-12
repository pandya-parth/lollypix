 <!-- START HEADER -->
      <div class="header ">
        <!-- START MOBILE CONTROLS -->
        <!-- LEFT SIDE -->
        <div class="pull-left full-height visible-sm visible-xs">
          <!-- START ACTION BAR -->
          <div class="sm-action-bar">
            <a href="#" class="btn-link toggle-sidebar" data-toggle="sidebar">
              <span class="icon-set menu-hambuger"></span>
            </a>
          </div>
          <!-- END ACTION BAR -->
        </div>
        <!-- RIGHT SIDE -->
        <div class="pull-right full-height visible-sm visible-xs">
          <!-- START ACTION BAR -->
          <div class="sm-action-bar">
            <a href="#" class="btn-link" data-toggle="quickview" data-toggle-element="#quickview">
              <span class="icon-set menu-hambuger-plus"></span>
            </a>
          </div>
          <!-- END ACTION BAR -->
        </div>
        <!-- END MOBILE CONTROLS -->
        <div class=" pull-left sm-table">
          <div class="header-inner">
            <div class="brand inline">
             <a href='{!!route('dashboard')!!}'> <img src="{!!asset('img/logo.png')!!}" alt="logo" data-src="{!!asset('img/logo.png')!!}" data-src-retina="{!!asset('img/logo_2x.png')!!}" width="78" height="22"></a>
            </div>
           </div>
        </div>
        
        <div class=" pull-right">
          <!-- START User Info-->
           <!-- START User Info-->
          <div class="visible-lg visible-md m-t-10">
            <div class="pull-left p-r-10 p-t-10 fs-16 font-heading">
            @if(Auth::check())
              <span class="semi-bold" >{!! Auth::user()->name !!}</span> 
            @else
              <span class="semi-bold">Guest </span> 
            @endif
            </div>
            <div class="dropdown pull-right">
              <button class="profile-dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="thumbnail-wrapper d32 circular inline m-t-5">
                <img src="{!!asset('img/profiles/avatar.jpg')!!}">
                <img src="{!! asset('/img/profiles/avatar.jpg')!!}" alt="" data-src="{!! asset('/img/profiles/avatar.jpg')!!}" data-src-retina="{!! asset('/img/profiles/avatar_small2x.jpg')!!}" width="32" height="32">
            </span>
              </button>
              <ul class="dropdown-menu profile-dropdown" role="menu">
               @if (Auth::guest())
                  <li><a href="{{ url('/login') }}">Login</a></li>
                  
               @else
                  <li><a href="{!!route('changePassword')!!}"><i class="pg-settings_small"></i> Change Password</a></li>
                  <li><a href="#"><i class="pg-outdent"></i> Feedback</a></li>
                  <li><a href="#"><i class="pg-signals"></i> Help</a></li>  
               

                
                <li class="bg-master-lighter">
                  <a href="{!! route('logout') !!}" class="clearfix">
                    <span class="pull-left">Logout</span>
                    <span class="pull-right"><i class="pg-power"></i></span>
                  </a>
                </li>
                @endif
              </ul>
            </div>
          </div>
          <!-- END User Info-->
        </div>
      </div>
      <!-- END HEADER -->