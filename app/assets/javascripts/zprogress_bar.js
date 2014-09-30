angular.module("App").directive("progressBar", function() { 
	progressBar = {}; 

	progressBar.watch = function (scope,element,attr){ 
		console.log(element)
		console.log(attr)
		//Setup watch functionality
		scope.$watch("progress", function () {
			if(scope.progress == 0) { 
				progressBar.reset();
			}
			else { 
				progressBar.add(scope);
			}

		});
		debugger		
	}
	progressBar.add = function (scope) { 

	}; 

	progressBar.reset = function () { 

	};
	return { 
		controller: ['$scope', function($scope) { 
			$scope.add = add; 
			$scope.reset = reset;
			$scope.progress; 
			
			function add () { 
				$scope.progress += 50; 
			}; 
			
			function reset  () { 
				$scope.progress = 0; 
			}; 
		}], 
		template: '<div id="container"> <div id="glass"> <div id="water"></div></div></div>',
		link: progressBar.watch
	};
});

// clicking a button adds to the flow
//use the animate service 
// Should be in css 
// certain value 
// 