angular.module("App").controller("TodoCtrl", ["$scope", "localStorage", function($scope, localStorage){ 
	$scope.todos = [];
	$scope.test ="hello";
	$scope.addTodo = function($index) {
		$scope.todos.push({text:$scope.todoText, done:false});
		$scope.todoText = '';
    localStorage.setItem($scope.todoText,$scope.todoText);
	};

  $scope.archive = function(todo) {
  	var oldTodos = $scope.todos;
  	todo.done = true; 
  	$scope.todos = [];
  	angular.forEach(oldTodos, function(todo) {
  		if (!todo.done) $scope.todos.push(todo);
  	});  
    };

  $scope.removeTask = function(index, todo) { 
  	$scope.todos.splice(index,1);
    localStorage.removeItem(todo)
  }
}]); 