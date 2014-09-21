angular.module("App").controller("HomeController", ["$scope", "localStorage", function($scope, localStorage){ 
	$scope.editing = false; 
	
	$scope.toggleEditing = function () { 
		$scope.editing =  !$scope.editing; 
		return $scope.editing; 
	}; 

}])

	// Create jquery plugins as hidden abstractions wrapped in angular 
 //  	I. Only use a few methods and primarily pass one parameter
 //  	II. Curry the functions 
 //  Go over Naming Conventions 