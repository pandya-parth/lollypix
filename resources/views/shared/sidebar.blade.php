 <nav class="page-sidebar" data-pages="sidebar">
      <!-- BEGIN SIDEBAR MENU HEADER-->
      <div class="sidebar-header">
        <a href='{!!route('dashboard')!!}'> <img src="{!!asset('img/logo_white.png')!!}" alt="logo" class="brand" data-src="{!!asset('img/logo_white.png')!!}" data-src-retina="{!!asset('img/logo_white_2x.png')!!}" width="78" height="22"></a>
        <div class="sidebar-header-controls">
            <button type="button" class="btn btn-link visible-lg-inline" data-toggle-pin="sidebar"><i class="fa fs-12"></i>
          </button>
        </div>
      </div>
      <!-- END SIDEBAR MENU HEADER-->
      <!-- START SIDEBAR MENU -->
      <div class="sidebar-menu">
        <!-- BEGIN SIDEBAR MENU ITEMS-->
        <ul class="menu-items">
          <li class="m-t-30 ">
            <a href="{!!route('dashboard')!!}" class="detailed">
              <span class="title">Dashboard</span>
              <span class="details">12 New Updates</span>
             </a>
            <span class="icon-thumbnail bg-success"><i class="pg-home"></i></span>
          </li>
           <li class="m-t-30 ">
            <a href="{!!route('admin.users.index')!!}" class="detailed">
              <span class="title">User({!!DB::table('users')->count()!!})</span>
              <span class="details">12 New Updates</span>
            </a>
            <span class="bg-success icon-thumbnail "><i class="fa fa-user"></i></span>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <!-- END SIDEBAR MENU -->
</nav>