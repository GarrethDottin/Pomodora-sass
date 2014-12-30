angular.module("App").controller("TodoCtrl", ["$scope", "localStorage", "$timeout", function($scope, localStorage, $timeout){
  $scope.model = {};
  $scope.model.todos;
  $scope.toggleEditing = toggleEditing;
  $scope.archive =archive;
  $scope.refreshTodos = refreshTodos;
  $scope.addTodo = addTodo;
  $scope.removeTask = removeTask;
  $scope.editTodo = editTodo;
  Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
  };

  if (localStorage.getItem('todos') != undefined) {
    $scope.model.todos = localStorage.getItem('todos');
  }
  else {
    $scope.model.todos = [];
  };

  function toggleEditing () {
    $scope.editing =  !$scope.editing;
  };

  function archive(todo) {
    // save oldTodos into Local Storage
    todo.done = true;
    $timeout(refreshTodos, 3500);
  };

  function refreshTodos () {
    var oldTodos = $scope.model.todos;
    $scope.model.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) $scope.model.todos.push(todo);
    });
  };

  function addTodo ($index) {
    if ($scope.todoText.length > 1 && $scope.todoText.length < 60) {
      $scope.model.todos.push({text:$scope.todoText, done:false});
      $scope.todoText = '';
      localStorage.setItem('todos',$scope.model.todos);
    };
  };

  function editTodo ($index, input) { 
    $scope.model.todos[$index].text = input;
    localStorage.setItem('todos',$scope.model.todos);
  }

  function removeTask (index, todo, input ) {
    if (input =='checkmark') { 
      $timeout( function () { 
        $scope.model.todos.remove(index);
        localStorage.setItem('todos',$scope.model.todos);
      },1500);
    }
    else { 
      $scope.model.todos.splice(index,1);
      localStorage.setItem('todos',$scope.model.todos);
    }
  }
}]);
