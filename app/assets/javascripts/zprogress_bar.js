angular.module("App").directive("progressBar", function() { 
	progressBar = {}; 
	progressBar.width = 100;
	progressBar.position = "100% 100%"; 

	var progressBarChange = function (progressMeter,progressBarPositioning, progressBarWidth) { 
		if (progressBar.position == "100% 100%") { 
			progressBar.position = "100% 0%";
		}
		else { 
			progressBar.position = "100% 100%";
		};

		progressMeter.css("background-position", progressBar.position);
		progressMeter.css("tansition", "all 2s ease-out");
		progressMeter.css("width", progressBarWidth);
	};

	progressBar.watch = function (scope,element,attr){ 
		var progressMeter = element.children().children().children();

		scope.$watch("progress", function () {
			if(scope.progress == 0) { 
				progressBar.reset(progressMeter);
			};
			if (scope.progress > 0) { 
				progressBar.add(progressMeter, progressBar.width);
			};
		});
	};

	progressBar.add = function (progressMeter, progressBarwidth) { 
		progressBar.width += 50; 
		var width = progressBar.width.toString();
		progressBarChange(progressMeter,progressBar.position, width);
	}; 

	progressBar.reset = function (progressMeter, progressContainer) { 
		progressBarChange(progressMeter,progressBar.position, 0); 
		progressBar.width = 0; 
	};

	return { 
		controller: ['$scope', function($scope) { 
			$scope.add = add; 
			$scope.reset = reset;
			$scope.progress = 0; 

			function add () { 
				console.log("this function is hit")
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


// Take function out of add and reset √
// Test out function 
// read over https://thinkster.io/egghead/animating-the-angular-way/