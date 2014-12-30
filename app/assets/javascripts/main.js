angular.module("App", ['ngCookies'])
	.value('user', {
		username: '',
		firstName: ''
	})	
	.controller("ApplicationController", ["$scope", "$timeout","localStorage", function($scope, $timeout, localStorage) {
		
		// Initial Values 
		window.scope = $scope;
		$scope.currentUser = 'guest';
		$scope.setUser = setUser;
		$scope.time = 25;	
		$scope.counter = 0; 
		$scope.triggerSound = triggerSound;	
		$scope.storedCount = storedCount; 
		$scope.notifyUser = false; 	


		var date = new Date();
		var today = date.getDay();
		resetCounter(today);


		//Overlay Configuration 
		$scope.closeOverlay = closeOverlay;
		$scope.initialize = initialize; 
		$scope.secondOverlay = secondOverlay;	
		$scope.overlay1 = false; 
		$scope.overlay2 = false; 
		$scope.increaseSuccessCount = increaseSuccessCount;


		// Statement 
		$scope.statement = "What can you do in " + $scope.time +  " minutes?"; 
		$scope.changeStatement = changeStatement;


		// Page interactions 
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

		function triggerSound () { 
			var alarm = document.getElementById("reward");
            alarm.currentTime = 0;
            alarm.load();
            alarm.play();
		}; 

		// Stored Info 
		function resetCounter (today) { 
			if (today == localStorage.getItem('currentDay')) { 
				$scope.counter = localStorage.getItem('counter');
			}	
			else { 
				$scope.counter = 0; 
				localStorage.setItem('currentDay', $scope.counter);
			}
		};

		function increaseSuccessCount (input) {
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
		};

		function storedCount () {
			var oldCount = localStorage.getItem('totalCount');
			if (oldCount == 1) {
				animateTodoButton(); 
			}
			if (oldCount != undefined) { 
				var newTotal = parseInt(localStorage.getItem('totalCount')) + 1; 
				localStorage.setItem('totalCount', newTotal);
			} 
			else { 
				localStorage.setItem('totalCount',1);
				animateTodoButton(); 
			}
		}; 

		function animateTodoButton () { 
			$timeout(function () { 
					$scope.notifyUser = true;
			}, 1000)
			$timeout(function () { 
					$scope.notifyUser = false;
			}, 5000)
		}

		// User 
		function setUser (user) {
			$scope.currentUser = user;
		};

		// Overlay interaction 
		function initialize () { 
			$scope.overlay1 = true; 
		}; 

		function secondOverlay () { 
			$scope.overlay1 = false; 
			$scope.overlay2 = true; 
			$timeout(function(){ 
				$scope.overlay2 = false; 
			}, 1500)
		};

		function closeOverlay () { 
			$scope.overlay1 = false; 
			$scope.overlay2 = false; 
		};
 	}])
	// angular.module("App").factory('OverlayFactory', ['$scope', function ($scope) { 
	// 	var OverlayFactory = {}; 

	// 	OverlayFactory.initialize = function () { 
	// 		console.log("correct overlay hit")
	// 		$scope.overlay1 = true; 
	// 	}; 

	// 	return OverlayFactory;

	// }]); 

