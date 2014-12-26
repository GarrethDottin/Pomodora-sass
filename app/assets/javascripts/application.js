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


testApp = 17;
var domManipulations = { 
  init: function () { 
    this.todoButton();
    this.slider();
  }, 
  todoButton: function () { 
    $('#tasks, .off-canvas-button').on("click", function () { 
      if ($('.addButton').css('z-index') === "3") { 
        $('.timerButtonContainer').css('z-index', '0');
        $('.your-clock').css('z-index', '0');
      }
      else { 
        $('.timerButtonContainer').css('z-index', '3'); 
        $('.your-clock').css('z-index', '');
      }
    }); 
  }, 
  slider: function () { 
    $("#slider").slider({ 
      value:25,
      min: 0,
      max: 62,
      step: 1, 
      slide: function (event, ui) {
        console.log(ui.value) 
        if (ui.value > this.previousUIvalue) { 
          // $('.addButton').click();
        }
        if (ui.value < this.previousUIvalue) { 
          // $('.timerButtonContainer')[1].click();
        }
        this.previousUIvalue = ui.value;
      }
    });
  }, 
  previousUIvalue: 0
}



$(document).ready(function() {
    domManipulations.init();
    $(document).foundation();
});


