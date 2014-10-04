angular.module("App").controller("HomeController", ["$scope", function($scope){ 

	$scope.buttonClicked = function(num) { 
		$scope.timerValue = num;
	}; 
	
}]);