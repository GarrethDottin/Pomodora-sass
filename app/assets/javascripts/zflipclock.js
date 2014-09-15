angular.module("App").directive("flipClock", function() { 
	
	var createClock = function (time) { 
		var clock = $('.your-clock').FlipClock({
			autoStart: false, 
			countdown: true,
			clockFace: "MinuteCounter"
			
		});
		setTime(clock)
	}
	var UserInput = function (){ 
		// if user clicks the value is inserted 
		// return a call to startClock
	}

	var setTime = function (clock, time) {
		var startTime = clock.setTime(1500);
		UserInput(clock)
	}

	var startClock = function(clock) { 
		clock.start();
	}

	var initClock = function () { 
		createClock(time)
	}


	return { 
		restrict: 'A', 
		template: '<div class="your-clock"></div>',
		replace: true, 
		link: createClock, 
	}

})
