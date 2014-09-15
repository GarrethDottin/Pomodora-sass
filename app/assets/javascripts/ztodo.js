angular.module("App").controller("TodoCtrl", function($scope){ 
	$scope.todos = [];
	
	$scope.addTodo = function() {
		$scope.todos.push({text:$scope.todoText, done:false});
		$scope.todoText = '';
	};

   $scope.archive = function(todo) {
  	var oldTodos = $scope.todos;
  	todo.done = true; 
  	$scope.todos = [];
  	angular.forEach(oldTodos, function(todo) {
  		if (!todo.done) $scope.todos.push(todo);
  	});  
    };
}); 

// add connection with checkbox and archive
// What is the architecture setup for? 
	//High Affordance 
	//Consistency of behaviour 
	//Speed is less important 
	

// Ways to improve it 
	// I. Setup model better 