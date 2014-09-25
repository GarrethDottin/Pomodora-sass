angular.module("App", ["ngCookies"])
	.value('user', { 
		username: '', 
		firstName: ''
	})
	.controller("ApplicationController", ["$scope", function($scope){ 
		$scope.currentUser = 'guest'; 
		$scope.setUser = function (user) { 
			$scope.currentUser = user;
		};	
	}]);