angular.module("App").factory("localStorage", ["$cookieStore", function($cookieStore) {
	localStorage = {};
	var storedTodos = $cookieStore.get('todos');
		localStorage.setItem = function (key, value) {
		$cookieStore.put(key,value);
	};

	localStorage.getItem = function (key) {
		return storedTodos;
	};

	localStorage.removeItem = function(input) {
		var storedTodos = [];
		angular.forEach($cookieStore.get('todos'), function(key) {
			if (key.text != input) {
   			storedTodos.push(key);
		}});
		$cookieStore.put("todos", storedTodos);

	};
	return localStorage;
}]);

// keep an array of items
// delete the item from the list
// anytime you delete an item reset the todos