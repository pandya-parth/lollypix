<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
    <meta charset="utf-8" />
    <title>Pages - Admin Dashboard UI Kit</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="apple-touch-icon" href="pages/ico/60.png">
    <link rel="apple-touch-icon" sizes="76x76" href="ico/76.png">
    <link rel="apple-touch-icon" sizes="120x120" href="ico/120.png">
    <link rel="apple-touch-icon" sizes="152x152" href="ico/152.png">
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-touch-fullscreen" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta content="" name="description" />
    <meta content="" name="author" />

    <link rel="stylesheet" href="{{ elixir('backend/css/vendor.css') }}">

    <!--[if lte IE 9]>
        <link href="pages/css/ie9.css" rel="stylesheet" type="text/css" />
    <![endif]-->
    <script type="text/javascript">
    window.onload = function()
    {
      // fix for windows 8
      if (navigator.appVersion.indexOf("Windows NT 6.2") != -1)
        document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="{!!asset('css/windows.chrome.fix.css')!!}" />'
    }
    </script>
  </head>

 <body class="fixed-header   ">
    <!-- BEGIN SIDEBPANEL-->
   @include('admin.shared.sidebar')
    <!-- END SIDEBAR -->
    <!-- END SIDEBPANEL-->
    <!-- START PAGE-CONTAINER -->
    <div class="page-container">
     @include('admin.shared.header')
      <!-- START PAGE CONTENT WRAPPER -->
 

     <div class="page-content-wrapper">
        <!-- START PAGE CONTENT -->
        @yield('content')
        <!-- END PAGE CONTENT -->
        @include('admin.shared.footer')
     </div>
      <!-- END PAGE CONTENT WRAPPER -->
    </div>
    <!-- END PAGE CONTAINER -->
    
   
    <!-- BEGIN VENDOR JS -->

    <script src="{{ elixir('backend/js/vendor.js') }}"></script>

    <!-- END PAGE LEVEL JS -->
  </body>
</html>
