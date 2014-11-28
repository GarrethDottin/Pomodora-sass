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
//= todo
//= zflipclock
//= zlocal_storage
//= push_menu
//= progress_bar
//= outside_libraries 
//= require_tree .

var appcontroller = {
  init: function () {
    $('#about').on("click", function () { 
      $('body,html').animate({ scrollTop: $('.panel').offset().top -50 }, 1600);
    });

    $('#timer').on("click", function () { 
      $('body,html').animate({ scrollTop: $('main').offset().top -50 }, 1600);
    }); 
  }
}


$(function (){
  appcontroller.init()
});

