angular.module("App").controller("HomeController", ["$scope", function($scope){
	$scope.fadeout = true;

	$scope.statement = "What can you do in 25 minutes"; 

	$scope.counter  = 0; 

	$scope.buttonClicked = function(num) {
		debugger
		$scope.timerValue = num;
	};

}]);