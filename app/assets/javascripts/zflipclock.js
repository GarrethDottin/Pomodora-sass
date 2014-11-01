angular.module("App").directive("flipClock", function() {
	flipClockApi = {};
	console.log("This is working flipClockApi")

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
		flipClockApi.clock.start();
		var time = flipClockApi.getTime();
		internalClock(time, scope)
	};

	flipClockApi.initClock = function (scope) {
		flipClockApi.clock = flipClockApi.createClock();
		flipClockApi.setTimer(1500, scope);
		changeClock(scope);
	};

	flipClockApi.getTime = function (clock) {
		return flipClockApi.clock.getTime().time;
	};

	flipClockApi.setTimer = function (time, scope) {
		console.log(time + 1)
		flipClockApi.currentTime = time + 1;
		flipClockApi.clock.setTime(time);
	};



	flipClockApi.adjustTime = function (input ) {
		var time = flipClockApi.getTime(); 
		if (input == 'add') { 
			console.log("if statement")
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
				flipClockApi.clock.setTime(inputTime);
				flipClockApi.currentTime = inputTime;
				flipClockApi.startClock(scope);
			};
		});
	};

	var internalClock  = function (time,scope) { 
		console.log("internalClock is hit")
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
					console.log("this is hit")
					flipClockApi.clock.setTimer(modifiedTime, $scope);
				}
				else {
					flipClockApi.clock.setTimer(modifiedTime, $scope);
				};
			}

			$scope.stopClicked =function( $scope) {
				1
				flipClockApi.setTimer(flipClockApi.currentTime, $scope);
				flipClockApi.clock.stop();
			}

		}],
		template: '<div class="your-clock test"></div>',
		link: flipClockApi.initClock
	};
});