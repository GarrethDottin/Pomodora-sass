angular.module("App").controller("TodoCtrl", ["$scope", "localStorage", function($scope, localStorage){ 
  $scope.model = {};
  $scope.model.todos; 


  // Code Smell 
    if (localStorage.getItem('todos') != undefined) { 
      $scope.model.todos = localStorage.getItem('todos');
    } 
    else { 
      $scope.model.todos = [];
    };

  $scope.toggleEditing = function () { 
    $scope.editing =  !$scope.editing; 
  }; 

  $scope.archive = function(todo) {
  	var oldTodos = $scope.model.todos;
  	todo.done = true; 
  	$scope.model.todos = [];
  	angular.forEach(oldTodos, function(todo) {
  		if (!todo.done) $scope.model.todos.push(todo);
  	});  
  };

  $scope.addTodo = function($index) {
    if ($scope.todoText.length > 1) {
      $scope.model.todos.push({text:$scope.todoText + '.' , done:false});
      $scope.todoText = '';
      localStorage.setItem('todos',$scope.model.todos);
      console.log(localStorage);
    };
  };

  $scope.removeTask = function(index, todo) { 
  	$scope.model.todos.splice(index,1);
    localStorage.removeItem(todo)
  }
}]); 