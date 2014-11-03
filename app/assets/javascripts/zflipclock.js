angular.module("App").directive("flipClock", function() {
	flipClockApi = {};
	flipClockApi.currentTime = 1500;

	var timeExpired;
	flipClockApi.createClock = function () {
		var Clock = $('.your-clock').FlipClock({
			autoStart: false,
			countdown: true,
			clockFace: "MinuteCounter",
		});
		return Clock;
	};

	flipClockApi.startClock = function(scope) {
		var time = flipClockApi.getTime();
		flipClockApi.currentTime = time;
		flipClockApi.clock.start();
		internalClock(time, scope)
	};

	flipClockApi.initClock = function (scope) {
		flipClockApi.clock = flipClockApi.createClock();
		flipClockApi.setTimer(1500, scope);
		changeClock(scope);
	};

	flipClockApi.getTime = function (clock) {
		flipClockApi.currentTime = flipClockApi.clock.getTime().time;
		return flipClockApi.currentTime;
	};

	flipClockApi.setTimer = function (time, scope) {
		flipClockApi.currentTime = time;
		scope.time = flipClockApi.currentTime/60; 
		flipClockApi.clock.setTime(time);
	};



	flipClockApi.adjustTime = function (input) {
		var time = flipClockApi.getTime(); 
		if (input == 'add') { 
			flipClockApi.currentTime = time + 60;
			flipClockApi.clock.setTime(time + 61); 
		}
		else { 
			flipClockApi.currentTime = time + 60;
			flipClockApi.currentTime = time + 120;
			flipClockApi.clock.setTime(time - 59); 
		}
	}; 

	var changeClock = function (scope){
		scope.$watch('timerValue', function() {
			if (scope.timerValue != undefined) {
				var inputTime = parseInt(scope.timerValue) * 60;
				flipClockApi.setTimer(inputTime,scope);
				flipClockApi.startClock(scope);
			};
		});
	};

	var internalClock  = function (time,scope) { 
		if (time != 0) { 
			setTimeout(function(){
				scope.overlay1 = true; 
				scope.$apply(); 
			}, time * 10000)
		}
	}; 


	return {
		controller: ['$scope', function($scope) {
			$scope.adjustTime = adjustTime; 

			function adjustTime (input) { 
				flipClockApi.adjustTime(input);
			}

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
					var modifiedTime = currentTime +60; 
					flipClockApi.clock.setTimer(modifiedTime, $scope);
				}
				else {
					flipClockApi.clock.setTimer(modifiedTime, $scope);
				};
			}

			$scope.stopClicked =function($scope) {
				console.log(flipClockApi.currentTime)
				var time = flipClockApi.currentTime;
				flipClockApi.clock.setTime(flipClockApi.currentTime, $scope);
				flipClockApi.clock.stop();
			}

		}],
		template: '<div class="your-clock test"></div>',
		link: flipClockApi.initClock
	};
});