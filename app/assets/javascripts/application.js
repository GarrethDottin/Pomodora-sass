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

    $('#tasks, .off-canvas-button').on("click", function () {
      if (addButton.css('z-index') === "3") {
        domManipulations.todoListOpen = true;

        // shift main body
        $('.timer-container').removeClass('todo-closed');
        $('.timer-container').addClass('todo-open');

        // hide timer buttons
        timerButtonContainer.css('z-index', '0');
        clock.css('z-index', '0');

        // change placeholder text
        newTodo.attr('placeholder', 'Feeling distracted, write your tasks here... ');
        newTodo.on('click', function () {
          newTodo.attr('placeholder', '');
        });
        domManipulations.checkSliderAlignment();
      }
      else {
        setTimeout(function () {
          $('.timerButtonContainer').css('z-index', '3');
          // fortyFiveButton.css('z-index', '3');
          clock.css('z-index', '');
        },500);

          $('.timer-container').addClass('todo-closed');
          $('.timer-container').removeClass('todo-open');
          domManipulations.todoListOpen = false;

      }
    });
  },
  checkSliderAlignment: function () {
    if ($('.timer-container').hasClass('todo-open') && domManipulations.todoListOpen == false) {
      $('.timer-container').addClass('todo-closed');
      $('.timer-container').removeClass('todo-open');
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


