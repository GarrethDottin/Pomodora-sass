angular.module("App").controller("HomeController", ["$scope", function($scope){
	$scope.editing = false;

	$scope.toggleEditing = function () {
		$scope.editing =  !$scope.editing;
	};
}]);