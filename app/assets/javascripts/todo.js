angular.module("App").controller("TodoCtrl", ["$scope", "localStorage", "$timeout", function($scope, localStorage, $timeout){
  $scope.model = {};
  $scope.model.todos;
  $scope.toggleEditing = toggleEditing;
  $scope.archiveRefresh =archiveRefresh;
  $scope.archivedTodos = [];
  $scope.refreshTodos = refreshTodos;
  $scope.getArchivedItems = getArchivedItems;
  $scope.addTodo = addTodo;
  $scope.removeTask = removeTask;
  $scope.editTodo = editTodo;
  $scope.firstTime = true;
  $scope.showOnLoad = true;

  window.scope = $scope;
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
    if (todo) {
      todo.done = true;
      todo.date = setDate();
      todo.text = todo.text.split('');
      for (var i =0; i < todo.text.length; i++) { 
        if (i != 0) {
          todo.text[i] = todo.text[i].toLowerCase();
        }
      }
      todo.text = todo.text.join('');
      debugger
    }

    // $scope.archivedTodos.push(todo);
    if (!localStorage.getItem('archivedTodos')){
      $scope.archivedTodos.push(todo);
      localStorage.setItem('archivedTodos', $scope.archivedTodos);
    }
    else {
      var tempArray = localStorage.getItem('archivedTodos');
      tempArray.push(todo);
      $scope.archivedTodos = tempArray;
      localStorage.setItem('archivedTodos', $scope.archivedTodos);
    }
  };

  function getArchivedItems () { 
    if (localStorage.getItem('archivedTodos')) { 
      $scope.archivedTodos = localStorage.getItem('archivedTodos'); 
    }
  };

  function setDate () {
    var currentDay = new Date().toString();
    var modifiedDay = currentDay.slice(0,10);
    return modifiedDay;
  };

  function refreshTodos () {
    var oldTodos = $scope.model.todos;
    $scope.model.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) $scope.model.todos.push(todo);
    });
  };

  function addTodo ($index) {
    $scope.firstTime = false;
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
    $scope.firstTime = false;
    if (input =='checkmark') {
      $timeout( function () {
        $scope.model.todos.remove(index);
        localStorage.setItem('todos',$scope.model.todos);
      },1000);
    }
    else {
      $scope.model.todos.splice(index,1);
      localStorage.setItem('todos',$scope.model.todos);
    }
  }
}]);
