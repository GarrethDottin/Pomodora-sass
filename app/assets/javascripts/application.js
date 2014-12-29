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
//= require foundation
//= require_tree .


testApp = 17;
var domManipulations = {
  init: function () {
    this.todoButton();
  }, 
  todoButton: function () {
    var timerBody = $('.timer-body');
    var newTodo = $('#newtodo');
    var clock = $('.your-clock');
    var fortyFiveButton = $('#button45')

    $('#tasks, .off-canvas-button').on("click", function () {
      if ($('.addButton').css('z-index') === "3") {

        // hide timer buttons 
        $('.timerButtonContainer').css('z-index', '0');
        clock.css('z-index', '0');
        fortyFiveButton.css('z-index', '0');

        // change placeholder text
        newTodo.attr('placeholder', 'Write Your Activities Here... ');
        newTodo.on('click', function () { 
          newTodo.attr('placeholder', '');
        });
      }
      else { 
        // Shift body right 
        // timerBody.addClass('push-todo-list-right');
        // setTimeout(function () { 
        //   timerBody.removeClass('push-todo-list-right');
        //   timerBody.removeClass('push-todo-list-left');
        // },1000); 

        setTimeout(function () { 
          $('.timerButtonContainer').css('z-index', '3'); 
          fortyFiveButton.css('z-index', '3');
          clock.css('z-index', ''); 
        },500); 
      }
    }); 
  }, 
}



$(document).ready(function() {
    domManipulations.init();
    $(document).foundation();
});


