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

var domState = {
  openTodo: false
}
var domManipulations = {
  init: function () {
    this.todoButton();
    this.todoSubmit();
    this.changeOverlay();
  },
  changeOverlay: function () {
    window.setTimeout(function () {
      $('#overlays').removeClass('invisible');
    },1500);
  },
  todoListOpen: false,
  todoButton: function () {
    var timerBody = $('.timer-body');
    var newTodo = $('#newtodo');
    var clock = $('.your-clock');
    var fortyFiveButton = $('#button45')
    var mainBody = $('.timer-container');
    var addButton = $('.addButton');
    var timerButtonContainer = $('.timerButtonContainer');

    $('#tasks, .off-canvas-button, .exit-mark').on("click", function () {
      if (!domState.openTodo) {
        console.log('closed')
        domManipulations.todoListOpen = true;

        // shift main body
        $('.timer-container').removeClass('todo-closed');
        $('.timer-container').addClass('todo-open');


        // hide timer buttons
        if ($(window).width() <= 1202) { 
          console.log('this is inside width')
           timerButtonContainer.css('z-index', '0');
        };
        // timerButtonContainer.css('z-index', '0');
        clock.css('z-index', '0');

        // domManipulations.checkSliderAlignment();
        domState.openTodo = true;
      }
      
      else {
        mainBody.removeClass('todo-open');
        mainBody.addClass('todo-closed');
        domState.openTodo = false;
        $('.timerButtonContainer').css('z-index', 3);
      }
    });
  },
  checkSliderAlignment: function () {
    if ($('.timer-container').hasClass('todo-open') && domManipulations.todoListOpen == false) {
      // $('.timer-container').addClass('todo-closed');
      // $('.timer-container').removeClass('todo-open');
    };
  }
  ,
  todoSubmit: function () {
    var newTodo = $('#newtodo');
    $('#todo-list-input').on('submit', function() {
      newTodo.attr('placeholder', 'Feeling distracted, write your tasks here... ');
    });
  }
}



$(document).ready(function() {
    domManipulations.init();
    $(document).foundation();
});


