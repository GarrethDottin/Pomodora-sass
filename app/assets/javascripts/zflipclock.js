angular.module("App").directive("flipClock", [ function() { 
	flipClockApi = {}; 

	flipClockApi.createClock = function () { 
		var Clock = $('.your-clock').FlipClock({
			autoStart: false, 
			countdown: true,
			clockFace: "MinuteCounter", 
		});
		return Clock;
	};

	flipClockApi.startClock = function(clock) { 
		clock.start();
	};

	flipClockApi.initClock = function (scope) { 
		var clock = flipClockApi.createClock();
		var initialClock = clock.setTime(1500);
		scope.$watch('timerValue', function() { 
			if (scope.timerValue != undefined) { 
				var inputTime = parseInt(scope.timerValue) * 60; 
				clock.setTime(inputTime);
				flipClockApi.startClock(clock);
			};
		});
	};

	return { 
		transclude: false, 
		controller: function($scope) { 
			$scope.buttonClicked = function(num) { 
				$scope.timerValue = num;
			}
		}, 
		template: '<div class="your-clock"></div>',
		link: flipClockApi.initClock
	};
}]);