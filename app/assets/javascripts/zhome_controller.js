angular.module("App").controller("HomeController", ["$scope", function($scope){
	$scope.fadeout = true;

	$scope.statement = "What can you do in 25 minutes"
	$scope.buttonClicked = function(num) {
		$scope.timerValue = num;
	};

}]);