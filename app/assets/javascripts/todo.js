angular.module("App").controller("TodoCtrl", ["$scope", "localStorage", "$timeout", function($scope, localStorage, $timeout){
  $scope.model = {};
  $scope.model.todos;
  $scope.toggleEditing = toggleEditing;
  $scope.archiveRefresh =archiveRefresh;
  $scope.archivedTodos = [];
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

  function archiveRefresh(todo) {
    todo.done = true;
    // $scope.archivedTodos.push(todo);
    if (!localStorage.getItem('archivedTodos')){
      $scope.archivedTodos.push(todo);
      localStorage.setItem('archivedTodos', $scope.archivedTodos);
      console.log('initial value set')
    }
    else { 
      var tempArray = localStorage.getItem('archivedTodos');
      tempArray.push(todo); 
      $scope.archivedTodos = tempArray;
      localStorage.setItem('archivedTodos', $scope.archivedTodos);
    }
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
