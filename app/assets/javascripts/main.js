angular.module("App", ['ngCookies'])
	.value('user', { 
		username: '', 
		firstName: ''
	})
	.controller("ApplicationController", ["$scope", function($scope){ 
		$scope.setUser = setUser;
		$scope.currentUser = 'guest'; 
		
		var setUser = function (user) { 
			$scope.currentUser = user;
		};	
	}]);