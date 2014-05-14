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
//= require_tree .
var appcontroller = {
  init: function (selectors) {
    startClicked.init(selectors);
    timerSetting.init(selectors);
    NewsFeed.init(selectors);
    buttonClicked.init(selectors);
    about.init(selectors);
  },
  hideYesandNo: function (selectors) {
    $('#yes').fadeToggle( "slow", "linear" );
    $('#no').fadeToggle( "slow", "linear" );
    $('#start').prop("disabled",false);
  },
  showStartHideYesNo: function(selectors) {
    selectors.no.css("display", "none")
    selectors.yes.css("display", "none")
    selectors.starts.fadeToggle( "slow", "linear")
    selectors.starts.css("display", "inline")
    selectors.starts.prop("disabled", false)
    $('#textbox').css("display", "inline")
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
    console.log("showStopButton")
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
    var signupCheck = function (selectors) {
      if (+selectors.counterText.text() == '1' && window.location.hash.length == 0 && logincounter == 0) {
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
      var facebook = $('#facebook')
      if(+selectors.counterText.text() >= 0 && window.location.hash.length > 0) {
        var url = window.location.search
        var data = +$('#current-user').text().split(" ")[1]
        $.ajax({
          type: 'POST',
          data: data,
          beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
          url: '/users/increment/' + data
        })
       }
    }
    storePomodoros(selectors)

    //Check if the user needs to login
    var addNewsFeeditem = function (selectors) {
      var textbox = $('#textbox')
      var name = $('#current-user').text().split(" ")[2]
      var inputstring = []
      if (textbox.val().length >= 3 && name.length > 1 ) {
        inputstring[0] =  name + " ~ " + textbox.val()
        var index = NewsFeed.counterDisplay + 1
        NewsFeed.texts.splice(index,0, inputstring)
      }
    }
    addNewsFeeditem(selectors)

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

var NewsFeed = {
  init: function () {
    NewsFeed.displays()
  },
  texts: [["Jenna ~ Read two chapters"], ["Mary ~ Write a Cover Letter"], ["Dave ~ Practice Designing"], ["Alex ~ Outline Blog Post"],["Jamie ~ finish reading the news"]],
  textdisplay: document.getElementById('newsfeed'),
  counterDisplay: 0,
  displays: function () {
    var feed = document.getElementById('newsfeed')
      setInterval(function(){
        $('#newsfeed').css("display", "none")
        feed.innerHTML = NewsFeed.texts[NewsFeed.counterDisplay][0]
        $('#newsfeed').show( 1500, function() {});
        NewsFeed.counterDisplay++
        if (NewsFeed.counterDisplay == NewsFeed.texts.length) {
            NewsFeed.counterDisplay = 0;
          }
        },11000)
  }
}

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
  selectors = {
    no: $('#no'),
    yes: $('#yes'),
    starts: $('#start'),
    countdown: $('.timer-container h1'),
    longPomodoro: $('#twenty-five'),
    shortPomodoro: $('#five'),
    medPomodoro: $('#ten'),
    counterText: $('.counter-container'),
    primaryContent: $('.primary-content'),
    signupContent: $('.signup-content'),
    loginPartial: $('#login-partial'),
    loginContent:  $('#login-content'),
    submitButton:  $('#facebook'),
    about: $('.menu-container h3'),
    counter: $('.timer-container h1'),
    stop: $('#stop-button')
  };
  appcontroller.init(selectors)
});
