 <nav class="page-sidebar" data-pages="sidebar">
      <!-- BEGIN SIDEBAR MENU HEADER-->
      <div class="sidebar-header">
        <a href='{!!route('dashboard')!!}'> <img src="{!!asset('backend/img/logo_white.png')!!}" alt="logo" class="brand" data-src="{!!asset('backend/img/logo_white.png')!!}" data-src-retina="{!!asset('backend/img/logo_white_2x.png')!!}" width="78" height="22"></a>
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
          <li class="m-t-30">
            <a href="{!!route('dashboard')!!}" class="detailed">
              <span class="title">Dashboard</span>
              <span class="details">12 New Updates</span>
             </a>
            <span class="icon-thumbnail bg-success"><i class="pg-home"></i></span>
          </li>
           <li class=''>
            <a href="{!!route('admin.users.index')!!}" class="detailed">
              <span class="title">Users({!!DB::table('users')->count()!!})</span>
            </a>
            <span class="bg-success icon-thumbnail "><i class="fa fa-user"></i></span>  
          </li>
           <li class="">
            <a href="{!!route('admin.users.index')!!}" class="detailed">
              <span class="title">Gifts(0)</span>
            </a>
            <span class="bg-success icon-thumbnail "><i class="fa fa-gift"></i></span>
          </li>
            <li class="">
            <a href="{!!url('admin/settings')!!}" class="detailed">
              <span class="title">Settings</span>
            </a>
            <span class="bg-success icon-thumbnail title"><i class="fa fa-cogs"></i></span>
          </li>
            <li class="">
            <a href="{!!url('admin/tags')!!}" class="detailed">
              <span class="title">Tags</span>
            </a>
            <span class="bg-success icon-thumbnail "><i class="fa fa-tags"></i></span>
          </li>
          
        </ul>
        <div class="clearfix"></div>
      </div>
      <!-- END SIDEBAR MENU -->
</nav>