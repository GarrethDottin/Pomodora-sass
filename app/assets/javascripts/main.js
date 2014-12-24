angular.module("App", ['ngCookies'])
	.value('user', {
		username: '',
		firstName: ''
	})
	.controller("ApplicationController", ["$scope", "$timeout", function($scope, $timeout){
		$scope.initialOverlay = initialOverlay; 
		$scope.secondOverlay = secondOverlay; 
		$scope.increaseCounter = increaseCounter; 
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
			$scope.counter++;
			$timeout(function(){ 
				$scope.overlay2 = false; 
			}, 10000)
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

		function increaseCounter () { 
			$scope.counter++
		}

		function setUser  (user) {
			$scope.currentUser = user;
		};
	}]);