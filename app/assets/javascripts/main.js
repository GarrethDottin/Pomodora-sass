angular.module("App", ['ngCookies'])
	.value('user', {
		username: '',
		firstName: ''
	})
	.controller("ApplicationController", ["$scope", "$timeout", function($scope, $timeout){
		window.scope = $scope;
		$scope.initialOverlay = initialOverlay; 
		$scope.secondOverlay = secondOverlay; 
		$scope.increaseCounter = increaseCounter; 
		$scope.setUser = setUser;
		$scope.closeOverlay = closeOverlay;
		$scope.exitOverlay = exitOverlay;

		$scope.counter = 0; 
		$scope.overlay1 = false; 
		$scope.overlay2 = false; 
		$scope.statement = "What can you do in 25 minutes?";
		$scope.currentUser = 'guest';



		function initialOverlay () { 
			// $scope.overlay1 = true;
		}; 

		function secondOverlay () { 
			// $scope.overlay1 = false; 
			// $scope.overlay2 = true; 
			// $scope.counter++;
			// $timeout(function(){ 
			// 	$scope.overlay2 = false; 
			// }, 1500)
		};

		function exitOverlay (num) { 
			// if (num == 1) { 
			// 	$scope.overlay1 = false; 
			// }
			// else { 
			// 	$scope.overlay2 = false; 
			// }
		}; 

		function closeOverlay () { 
			// $scope.overlay1 = false; 
			// $scope.overlay2 = false; 
		}

		function increaseCounter () { 
			$scope.counter++
		}

		$scope.close = function (event) { dom.closeModal(event)};

		$scope.closeModal = false;

		function setUser  (user) {
			$scope.currentUser = user;
		};
	}]);