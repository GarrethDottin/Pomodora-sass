angular.module("App").controller("HomeController", ["$scope", function($scope){
	$scope.fadeout = true;

	$scope.counter  = 0; 

	$scope.buttonClicked = function(num) {
		$scope.timerValue = num;
		$scope.time = num;
	};
	

}]);