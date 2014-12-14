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
//= zpush_menu
//= zprogress_bar
//= ztodo_list_service
//= require_tree .

var appcontroller = {
  init: function () {
    $('#about').on("click", function () { 
      $('body,html').animate({ scrollTop: $('.panel').offset().top -50 }, 1600);
    });

    $('#timer').on("click", function () { 
      $('body,html').animate({ scrollTop: $('main').offset().top -50 }, 1600);
    }); 
    $('#tasks').on('click', function () { 
    	$('a.spmenu-button.show').click()
    }); 
    $('[data-magellan-expedition], [data-magellan-expedition-clone]').css("padding", "0px !important");
  }
}





$(function (){
	appcontroller.init();
	$(document).foundation();
});

