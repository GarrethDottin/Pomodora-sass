// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require foundation
//= require angular
//= require angular-route
//= main
//= ztodo
//= zflipclock
//= zhome_controller
//= zprogress_bar
//= ztodo_list_service
//= require foundation
//= require_tree .


var domManipulations = { 
  init: function () { 
    this.todoButton();
    this.slider();
  }, 
  todoButton: function () { 
    $('#tasks, .off-canvas-button').on("click", function () { 
      if ($('.addButton').css('z-index') === "3") { 
        $('.addButton').css('z-index', '0');
      }
      else { 
       $('.addButton').css('z-index', '3'); 
      }
    }); 
  }, 
  slider: function () { 
    $( "#slider" ).slider({ 
      value:0,
      min: 0,
      max: 99,
      step: 1, 
      slide: function (event, ui) { 
        console.log(ui.value); 
      }
    });
  }

}



$(document).ready(function() {
    domManipulations.init();

    $(document).foundation();
});


