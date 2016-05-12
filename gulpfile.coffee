elixir = require 'laravel-elixir'

bowerPath = (parts...)-> ['.','bower_components'].concat(parts).join('/')

elixir (mix)->
    mix.styles [
      'bootstrap.css'
      bowerPath('bootstrap','dist','css','bootstrap.min.css')
      'bootstrap-timepicker.min.css'
      'bootstrap-theme.css'
      'pace-theme-flash.css'
      'font-awesome.css'
      'jquery.scrollbar.css'
      'select2.css'
      'switchery.min.css'
      'pages-icons.css'
      'pages.css'
      'windows.chrome.fix.css'

      'style.css'
    ], 'public/backend/css/vendor.css'

    mix.scripts [
      'pace.min.js'
      bowerPath('jquery','dist', 'jquery.min.js')
      'modernizr.custom.js'
      'jquery-ui.min.js'
      bowerPath('bootstrap','dist','js','bootstrap.min.js')      
      bowerPath('bootstrap-timepicker','js','bootstrap-timepicker.js') 
      'jquery.unveil.min.js'
      'jquery.bez.min.js'
      'jquery.ioslist.min.js'
      'jquery.actual.min.js'
      'jquery.scrollbar.min.js'
      'select2.min.js'
      'classie.js'
      'switchery.min.js'
      'jquery.dataTables.min.js'
      'dataTables.tableTools.min.js'
      'jquery-datatable-bootstrap.js'
      'datatables.responsive.js'
      'lodash.min.js'
      'pages.min.js'
      'datatables.js'
      'plupload.full.min.js'
      'scripts.js'

    ], 'public/backend/js/vendor.js'

    mix.version [

      'backend/css/vendor.css'
      'backend/js/vendor.js'
    ]