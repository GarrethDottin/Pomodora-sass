angular.module("App").controller("HomeController", ["$scope", function($scope){ 
	$scope.editing = false; 
	
	$scope.toggleEditing = function () { 
		$scope.editing =  !$scope.editing; 
	}; 

	$scope.buttonClicked = function(num) { 
		$scope.timerValue = num;
	}
}]);