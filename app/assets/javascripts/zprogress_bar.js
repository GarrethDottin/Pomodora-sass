angular.module("App").directive("progressBar", function() {
	progressBar = {};
	progressBar.width = 0;
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
		
		progressMeter.css("width", progressBarWidth );
	};

	progressBar.watch = function (scope,element,attr){
		progressMeter = element.children().children().children();

		scope.$watch("progress", function () {
			if(scope.progress == 0) {
				progressBar.reset(progressMeter);
			};
			if (scope.progress > 10) {
				progressBar.add(progressMeter, progressBar.width);
			};
		});
	};

	progressBar.add = function (progressMeter, progressBarwidth) {
		if (progressBar.width >= 945) { 
			reset(progressMeter)
		}
		if (progressBar.width <= 680)  { 
			if (progressBar.width >= 680) {
				progressBar.width += 265;
			}
			if (progressBar.width < 680 ){ 
				progressBar.width += 220;
			};
			var width = progressBar.width.toString();
			progressBarChange(progressMeter,progressBar.position, width);
		}
	};

	progressBar.reset = function (progressMeter, progressContainer) {
		progressBarChange(progressMeter,progressBar.position, 20);
		progressBar.width = 20;
	};

	return {
		controller: ['$scope', function($scope) {
			$scope.add = add;
			$scope.reset = reset;
			$scope.progress = 0;

			$scope.checkProgress = checkProgress;

			function checkProgress () { 
				if (progressBar.width >= 945) { 
					progressBar.reset(progressMeter);
				}
			};

			function add () {
				$scope.progress += 250;
			};

			function reset  () {
				$scope.progress = 0;
			};

		}],
		template: '<div id="container"> <div id="glass"><span class="progress-bar-hashmark"> | </span>  <span class="progress-bar-hashmark"> | </span> <span class="progress-bar-hashmark"> | </span>	<div id="water"></div></div></div>',
		link: progressBar.watch
	};
});


