angular.module("App").factory("localStorage", ["$cookieStore", function($cookieStore) {
	localStorage = {};
	var storedTodos = $cookieStore.get('todos');
	
	localStorage.setItem = function (key, value) {
		$cookieStore.put(key,value);
	};

	localStorage.getItem = function (key) {
		if (key == 'Todos') { 
			return storedTodos;
		}
		else { 
			return $cookieStore.get(key);
		}
	};

	localStorage.removeItem = function(input) {
		var storedTodos = [];
		angular.forEach($cookieStore.get('todos'), function(key) {
			if (key.text != input) {
   				storedTodos.push(key);
			}
		});
		$cookieStore.put("todos", storedTodos);
	};

	return localStorage;
}]);