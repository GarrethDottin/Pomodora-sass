angular.module("App").factory("localStorage", function() { 
	localStorage = {}; 

	localStorage.setItem = function (key, value) { 
		// $cookieStore.put(key, value);
	}; 

	localStorage.getItem = function (key) { 
		// return $cookieStore.get(key);
	}; 

	localStorage.removeItem = function(key) {
		// $cookieStore.expire(key);
	}; 
	return localStorage;
}); 