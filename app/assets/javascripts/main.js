angular.module("App", ['ngCookies'])
	.value('user', {
		username: '',
		firstName: ''
	})	
	.controller("ApplicationController", ["$scope", "$timeout","localStorage", function($scope, $timeout, localStorage) {
		$scope.initialOverlay = initialOverlay; 
		$scope.secondOverlay = secondOverlay; 
			$scope.setUser = setUser;
		$scope.closeOverlay = closeOverlay;
		$scope.exitOverlay = exitOverlay;

		$scope.counter = 0; 
		$scope.overlay1 = false; 
		$scope.overlay2 = false; 
		$scope.time = 25;
		$scope.closeModal = false;
		$scope.statement = "What can you do in " + $scope.time +  " minutes?"; 
		$scope.currentUser = 'guest';
		$scope.changeStatement = changeStatement;
		$scope.buttonClicked = buttonClicked;
		$scope.triggerSound = triggerSound;
		$scope.increaseCount = increaseCount;
		var date = new Date();
		var today = date.getDay();
		resetCounter(today);

		function changeStatement (num) {
			if(num == 'add' || num == 'down') { 
				$scope.statement ="What can you do in " + $scope.time +  " minutes?";	
			}
			else { 
				$scope.time = parseInt(num);
				$scope.statement ="What can you do in " + $scope.time +  " minutes?";
			}
		}

		function buttonClicked(num) {
			$scope.timerValue = num;
		};

		function initialOverlay () { 
			$scope.overlay1 = true;
		}; 

		function secondOverlay () { 
			$scope.overlay1 = false; 
			$scope.overlay2 = true; 
			$timeout(function(){ 
				$scope.overlay2 = false; 
			}, 1500)
		};

		function exitOverlay (num) { 
			if (num == 1) { 
				$scope.overlay1 = false; 
			}
			else { 
				$scope.overlay2 = false; 
			}
		}; 

		function closeOverlay () { 
			$scope.overlay1 = false; 
			$scope.overlay2 = false; 
		}

		function increaseCount (input) { 
			var date = new Date();
			var today = date.getDay();
			if (input == 'increment') { 
				$scope.counter++; 
				localStorage.setItem('counter', $scope.counter); 
				localStorage.setItem('currentDay', today); 
			}
			else { 
				resetCounter(today); 
			}
			// if increase then increment the counter one and store it in local storage, set the day
			// if its called on load of page 
			// check to see if the time current day is the same 
			// if it is the same display counter as the current total 
			// otherwise empty out the todo and set a new date 
		}

		function resetCounter (today) { 
			if (today == localStorage.getItem('currentDay')) { 
				$scope.counter = localStorage.getItem('counter');
			}	
			else { 
				$scope.counter = 0; 
				localStorage.setItem('currentDay', $scope.counter);
			}
		}

		function setUser (user) {
			$scope.currentUser = user;
		};

		function triggerSound () { 
			var alarm = document.getElementById("reward");
            alarm.currentTime = 0;
            alarm.load();
            alarm.play();
		}; 
 	}]);
