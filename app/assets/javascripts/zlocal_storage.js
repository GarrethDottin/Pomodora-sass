angular.module("App").factory("localStorage", ["$cookieStore", function($cookieStore) { 
	localStorage = {}; 

	localStorage.setItem = function (key, value) { 
		$cookieStore.put(key, value);
	}; 

	localStorage.getItem = function (key) { 
		return $cookieStore.get(key)
	}; 

	localStorage.removeItem = function(key) {
		$cookieStore.expire(key)
	}; 
	return localStorage;

}]); 