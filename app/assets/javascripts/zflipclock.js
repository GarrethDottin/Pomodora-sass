angular.module("App").directive("flipClock", function(	) {
	flipClockApi = {};

	flipClockApi.createClock = function () {
		var Clock = $('.your-clock').FlipClock({
			autoStart: false,
			countdown: true,
			clockFace: "MinuteCounter",
		});
		return Clock;
	};

	flipClockApi.startClock = function() {
		flipClockApi.clock.start();
	};

	flipClockApi.initClock = function (scope) {
		flipClockApi.clock = flipClockApi.createClock();
		flipClockApi.setTimer(1500);
		changeClock(scope);
	};

	flipClockApi.getTime = function (clock) {
		return flipClockApi.clock.getTime().time;
	};

	flipClockApi.setTimer = function (time) {
		flipClockApi.clock.setTime(time);
	};

	var changeClock = function (scope){
		scope.$watch('timerValue', function() {
			if (scope.timerValue != undefined) {
				var inputTime = parseInt(scope.timerValue) * 60;
				flipClockApi.clock.setTime(inputTime);
				flipClockApi.startClock();
			};
		});
	};


	return {
		controller: ['$scope', function($scope) {
			$scope.buttonClicked = function(num) {
				$scope.timerValue = 0;
				$scope.$apply();
				$scope.timerValue = num;
			}

			$scope.startClicked = function (num) {
				flipClockApi.startClock();
			}

			$scope.changeClockTime = function (direction) {
				var currentTime = flipClockApi.getTime();
				if (direction == "plus") {
					flipClockApi.clock.setTimer(currentTime + 60);
				}
				else {
					flipClockApi.clock.setTimer(currentTime - 60);
				};
			}

			$scope.stopClicked =function() {
				flipClockApi.setTimer(1500);
				flipClockApi.clock.stop();
			}

		}],
		template: '<div class="your-clock"></div>',
		link: flipClockApi.initClock
	};
});