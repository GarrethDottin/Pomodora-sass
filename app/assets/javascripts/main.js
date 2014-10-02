angular.module("App", [])
	.value('user', { 
		username: '', 
		firstName: ''
	})
	.controller("ApplicationController", ["$scope", function($scope){ 
			$scope.click = function () { 
			$scope.progress += 150;
		}; 

		$scope.currentUser = 'guest'; 
		$scope.setUser = function (user) { 
			$scope.currentUser = user;
		};	
	}]);