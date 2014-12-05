angular.module("App").directive("flipClock", function() {
	flipClockApi = {};
	flipClockApi.currentTime = 1500;
	var internalClockTime; 
	var timerInProgress = false;
	var audio = new Audio('/assets/warning1.mp4')

	var timeExpired;
	flipClockApi.createClock = function () {
				console.log('inside correct function')
		var Clock = $('.your-clock').FlipClock({
			autoStart: false,
			countdown: true,
			clockFace: "MinuteCounter",
		});
		console.log('inside correct function')
		console.log(Clock);
		return Clock;
	};

	flipClockApi.startClock = function(scope) {
			flipClockApi.clock.start();
			internalClock(flipClockApi.currentTime, scope);
			warningSound(flipClockApi.currentTime);
			timerInProgress = true;
	};

	flipClockApi.initClock = function (scope) {
		flipClockApi.clock = flipClockApi.createClock();
		flipClockApi.setTimer(1500, scope);
		changeClock(scope);
	};

	flipClockApi.getTime = function (clock) {
		flipClockApi.currentTime = flipClockApi.clock.getTime().time;
	};

	flipClockApi.setTimer = function (time, scope) {
		flipClockApi.currentTime = roundTime(time);
		scope.time = flipClockApi.currentTime/60; 
		flipClockApi.clock.setTime(time);
	};

	flipClockApi.adjustTime = function (input, scope) {
		if (timerInProgress == false) {
			if (input == 'add') { 
				flipClockApi.currentTime = roundTime(flipClockApi.currentTime + 60);
				flipClockApi.setTimer(flipClockApi.currentTime, scope); 
			}
			else { 
				flipClockApi.currentTime = roundTime(flipClockApi.currentTime - 60);
				flipClockApi.setTimer(flipClockApi.currentTime, scope); 
			}
		};
	}; 

	var changeClock = function (scope){
		scope.$watch('timerValue', function() {
			if (scope.timerValue != undefined && scope.timerValue != 0) {
				var inputTime = parseInt(scope.timerValue) * 60;
				flipClockApi.setTimer(inputTime,scope);
				flipClockApi.startClock(scope);
			};
		});
	};

	var internalClock  = function (time,scope) { 
		var timeInput = ((time) * 1000) +100;
			if (timeInput != 0) {
				internalClockTime = setTimeout(function(){
				scope.overlay1 = true; 
				scope.$apply(); 
				timerInProgress = false;
			}, timeInput)
		};	
	}; 

	var warningSound = function (time) { 
		var timeInput = ((time - 60) * 1000);
		if (timeInput != -60000) {
			oneMinuteWarning = setTimeout(function() { 
				audio.play();
			}, timeInput); 	
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
			$scope.buttonClicked = buttonClicked;
			$scope.startClicked = startClicked;
			$scope.stopClicked = stopClicked;

			function adjustTime (input) { 
				flipClockApi.adjustTime(input, $scope);
			}

			function buttonClicked(num) {
				$scope.timerValue = 0;
				$scope.$apply();
				$scope.timerValue = num;
			}

			function startClicked (num) {
				flipClockApi.startClock($scope);
			}

			function stopClicked() {
				timerInProgress = false;
				var time = roundTime(flipClockApi.currentTime);
				flipClockApi.setTimer(flipClockApi.currentTime, $scope);
				flipClockApi.clock.stop();
				clearInterval(internalClockTime); 
				clearInterval(oneMinuteWarning);
				$scope.overlay1 = true;
			}

		}],
		template: '<div class="your-clock test"></div>',
		link: flipClockApi.initClock
	};
});