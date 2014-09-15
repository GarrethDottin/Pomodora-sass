angular.module("App", [])
	.value('user', { 
		username: '', 
		firstName: ''
	})
	.controller("ApplicationController", function($scope){ 
		$scope.currentUser = 'guest'; 
		$scope.setUser = function (user) { 
			$scope.currentUser = user;
		}	
	})
