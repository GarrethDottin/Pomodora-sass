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

  }
}

var startClicked = (function (selectors) {
  counter = 0;
  counter1 = 0;

  var triggerCountdown = function (event, selectors){
    var time = +selectors.countdown.text().replace(':00','')
    showStopButton(selectors)
    countdown('countdown', time, 00, selectors);
  };

  var showStopButton = function(selectors) {
    selectors.starts.fadeToggle( "slow", "linear")
    selectors.stop.css("display", "inline");
  }

  var stopCountdown = function(event, selectors) {
    clearInterval(interval)
    $('.timer-container h1').text("25:00")
    selectors.stop.fadeToggle( "slow", "linear")
    selectors.starts.css("display", "inline");
    var time = +selectors.countdown.text().replace(':00','')
    return;
  }


  var countdown = function (element, minutes, seconds, selectors) {
    var time = minutes*60 + seconds;
    var countdown = $('.timer-container h1');
    interval = setInterval(function(selectors) {
      var el = document.getElementById(element);
        if(time == -1) {
          var audio = new Audio('/assets/ambiance.wav');
          audio.play();
          countdown.text('Done?')
          $('#start').fadeToggle( "slow", "linear" )
          $('#start').css("display", "none")
          $('#textbox').css("display", "none")
          $('#stop-button').css("display", "none")
          appcontroller.hideYesandNo()
          clearInterval(interval);
          return;
        }
        var minutes = Math.floor( time / 60 );
        if (minutes < 10) minutes = "0" + minutes;
        var seconds = time % 60;
        if (seconds < 10) seconds = "0" + seconds;
        var text = minutes + ':' + seconds;
        el.innerHTML = text;
        $('title').text(text)
        time--;
    }, 1000);
  };

  var bindFunctions = function (selectors) {
    selectors.starts.on("click", function (event){
      triggerCountdown(event, selectors);
    });

    selectors.stop.on("click", function(event) {
      stopCountdown(event,selectors);
    })
  };

  var init = function (selectors) {
    bindFunctions(selectors);
  };

  return {
    init: init,
    startClicked: startClicked
  };
}) ();

var about = (function(selectors) {
  var bindFunctions = function (selectors) {
    selectors.about.on("click", function(event) {
      aboutPartial(selectors)
    })

    $('.hidden-image').on("click", function(event) {
      selectors.countdown.fadeToggle()
      $('.about-container').css("display", "none")
      $('.hidden-image').css("display", "none")
    })
  }

  var aboutPartial = function(selectors) {
    $('.about-container').css("opacity", "0.0")
    $('.hidden-image').css("display", "inline-block")
    selectors.countdown.fadeToggle()
    $('.about-container').css("display", "inline-block").animate({opacity: 1.00},3000 )
  }

  var init = function(selectors) {
    bindFunctions(selectors)
  }

  return {
    init: init
  }
}) ();

var buttonClicked = (function (selectors) {
  var logincounter = 0;
  var id = 0;
  var noButton = function(event, selectors) {
    selectors.countdown.text("25:00")
    appcontroller.hideYesandNo(selectors);
    appcontroller.showStartHideYesNo(selectors);
  };
  var yesButton = function(event, selectors) {
    console.log("This is hit")
    var signupCheck = function (selectors) {
      if (+$('#pomodoro-count').text().split(" ")[1] == 1  && window.location.hash.length == 0 && logincounter == 0) {
        $('main').css("display", "none")
        $('header').css("display", "none")
        $('footer').css("display", "none")
        $('.sign-in-partial').fadeToggle( "slow", "linear")
        logincounter++
        }
        selectors.submitButton.on("click", function() {
          $('.sign-in-partial').fadeToggle( "slow", "linear")
          $('main').css("display", "block")
          $('header').css("display", "initial")
          $('footer').css("display", "initial")
        })
    }
    // signupCheck(selectors)

    var login = function (selectors) {
      selectors.loginPartial.click(function() {
        selectors.loginContent.css("display", "inline-block")
      })
    }

    login(selectors)

    var storePomodoros = function (selectors) {
      var data;
      var facebook = $('#facebook')
      if ($('#textbox').val().length >= 3) {
        data =$('#textbox').val()
      }
      else {
        data = +$('#current-user').text().split(" ")[1]
      }
      if(+selectors.counterText.text() >= 0 && window.location.hash.length > 0) {
        var url = window.location.search
        $.ajax({
          type: 'POST',
          data: data,
          beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
          url: '/users/increment/' + data
        })
       }
    }
    storePomodoros(selectors);


    var additemQue = function() {
      if ($('#textbox').val().length >= 1) {
        console.log("additemQue")
        var textDiv = document.createElement('div')
        textDiv.innerHTML = $('#textbox').val()
        $("#que-finished").append(textDiv);
        $('#que h4').css("opacity", .7);
        setInterval(function(){$('#que h4').css("opacity", 1) }, 1500)

      };

    }

    additemQue();


    //Show start button
    var showStartButton = function (selectors){
      selectors.countdown.text("25:00")
      appcontroller.hideYesandNo(selectors);
      appcontroller.showStartHideYesNo(selectors)
      counter1++
    }
    showStartButton(selectors)

    //determine increase of pomodoro count
    var increaseProgressBar = function () {
      id +=5
      $('#task').css("display", "none")
      $('.progressbar').attr("id", "max" + id)
      function progress(percent, element) {
        var progressBarWidth = percent * element.width() / 100;
        buttonClicked.progressBarCheck(progressBarWidth, element)
      };

      $('.progressbar').each(function() {
        var bar = $(this);
        var max = $(this).attr('id');
        max = max.substring(3);
        progress(max, bar);
      });
    }
    increaseProgressBar(selectors)

    //pomodoros display
    var correctPomodoros = function () {
        var number = $('#pomodoro-count').text()
        number = +number.split(" ")[1] + 1
        var text = "Count " + number
        $('#pomodoro-count').text(text)
    }
    correctPomodoros()
  }

  var progressBarCheck = function (progressBarWidth, element) {
    if (progressBarWidth <= 500) {
      element.find('div').animate({ width: progressBarWidth }, 500);
    }
  }

  var bindFunctions = function (selectors) {
    selectors.no.on("click",  function (event) {
      noButton(event, selectors);
    })
    selectors.yes.on("click",  function (event) {
      yesButton(event, selectors);
    })
  };

  var init = function (selectors) {
    bindFunctions(selectors);
  };

  return {
    noButton: noButton,
    init: init,
    progressBarCheck: progressBarCheck
  }
}) ();


var timerSetting = (function (selectors) {
  var setTimer = function (event, selectors, length) {
    switch (length)
    {
      case 3:
        selectors.countdown.text("25:00");
        break;
      case 2:
        selectors.countdown.text("10:00");
        break;
      case 1:
        selectors.countdown.text("5:00");
        break;
    }

  }

  var bindFunctions = function (selectors) {
    selectors.longPomodoro.on("click",  function (event) {
      setTimer(event, selectors, 3)
    });

    selectors.medPomodoro.on("click", function (event) {
      setTimer(event, selectors, 2)
    });

    selectors.shortPomodoro.on("click", function (event) {
      setTimer(event, selectors, 1)
    });
  };

  var init = function (selectors) {
    bindFunctions(selectors);
  };

  return {
    init: init
  }

  }) ();

$(function (){
  appcontroller.init()
});

