angular.module("App").controller("HomeController", ["$scope", function($scope){
	$scope.fadeout = true;

	$scope.buttonClicked = function(num) {
		$scope.timerValue = num;
	};

}]);