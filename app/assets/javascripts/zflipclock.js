angular.module("App").directive("flipClock", function() {
	flipClockApi = {};
	flipClockApi.currentTime = 1500;
	var internalClockTime; 
	var timerInProgress = false;

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
			flipClockApi.currentTime = roundTime(time);
			flipClockApi.clock.start();
			internalClock(time, scope)
			timerInProgress = true;
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

		flipClockApi.currentTime = roundTime(time);
		scope.time = flipClockApi.currentTime/60; 
		flipClockApi.clock.setTime(time);
	};



	flipClockApi.adjustTime = function (input, scope) {
		if (timerInProgress == false) {
			var time = flipClockApi.getTime(); 
			if (input == 'add') { 
				flipClockApi.currentTime = roundTime(time + 60);
				flipClockApi.setTimer(flipClockApi.currentTime, scope); 
			}
			else { 
				flipClockApi.currentTime = roundTime(time - 60);
				flipClockApi.setTimer(flipClockApi.currentTime, scope); 
			}
		};
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
		var timeInput = (time + 1) * 1000;
			if (timeInput != 1000) {
				internalClockTime = setTimeout(function(){
				// scope.overlay1 = true; 
				// scope.$apply(); 
				scope.initialOverlay(); 
				timerInProgress = false;
			}, timeInput)
		}	
	}; 

	var roundTime = function (currentTime) { 
		var modifiedTime = currentTime.toString();
		var arrayofTime = modifiedTime.split('');
		var roundedNumber; 
		if (arrayofTime[arrayofTime.length -1] == 9 ) { 
			var roundedNumber = currentTime + 1 
		}
		else if (arrayofTime[arrayofTime.length -1] == 8) {
			roundedNumber = currentTime + 2;
		 }
		else { 
			roundedNumber = currentTime;
		}
		return roundedNumber
	}; 

	return {
		controller: ['$scope', function($scope) {
			$scope.adjustTime = adjustTime; 

			function adjustTime (input) { 
				flipClockApi.adjustTime(input, $scope);
			}

			$scope.buttonClicked = function(num) {
				$scope.timerValue = 0;
				$scope.$apply();
				$scope.timerValue = num;
			}

			$scope.startClicked = function (num) {
				flipClockApi.startClock($scope);
			}

			$scope.stopClicked =function() {
				timerInProgress = false;
				var time = roundTime(flipClockApi.currentTime);
				flipClockApi.setTimer(flipClockApi.currentTime, $scope);
				flipClockApi.clock.stop();
				clearInterval(internalClockTime);
				$scope.overlay1 = true;
			}

		}],
		template: '<div class="your-clock test"></div>',
		link: flipClockApi.initClock
	};
});