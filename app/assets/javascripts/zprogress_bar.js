angular.module("App").directive("progressBar", function() {
	progressBar = {};
	progressBar.width = 20;
	progressBar.position = "100% 100%";
	progressBar.counter = 0; 
	progressBar.done = false; 

	var progressBarChange = function (progressMeter, progressBarWidth) {
		if (progressBar.counter >= 1) { 
			setTimeout(function(){
				$('#hashmark' + progressBar.counter).addClass('progress-bar-circle');
			},2000)
		};
		
		var width = progressBar.width.toString();
		progressMeter.css("width", width);
		if (progressBar.done) { 
			progressBar.counter--
			progressBar.reset(progressMeter);
		}; 
		
	};

	progressBar.watch = function (scope,element,attr){
		var progressMeter = element.children().children().children();

		scope.$watch("counter", function (){ 
			// if (scope.counter % 4 == 0 && scope.counter != 0) { 
			// 	setTimeout(function(){
			// 		progressBar.reset(progressMeter);
			// 		progressBar.counter = 0;
			// 	},5000);
			// };
		})
		scope.$watch("progress", function () {
			if (scope.progress > 10) {
				progressBar.counter++
				progressBar.add(progressMeter, progressBar.width);
			};
		});
	};

	progressBar.add = function (progressMeter, progressBarwidth) {
		if (progressBar.width <= 695)  { 
			console.log(progressBar.width);
			if (progressBar.width == 20) {
				progressBar.width += 200;
				progressBar.done = false; 
				progressBarChange(progressMeter);
			}
			else if (progressBar.width == 220 ){ 
				progressBar.width += 235;
				progressBarChange(progressMeter);
			}
			else if (progressBar.width == 455) { 
				progressBar.width += 240;
				progressBarChange(progressMeter);
			}
			else if (progressBar.width == 695) { 
				progressBar.width += 245;
				progressBar.done = true
				progressBarChange(progressMeter);
			}
		}
	};

	progressBar.reset = function (progressMeter) {
			if (progressBar.counter == 3) {
				setTimeout(function(){
					progressMeter.css('width', '695x');
					$('#hashmark3').addClass('progress-bar-reset-unique');
					progressBar.counter = 2
					progressBar.reset(progressMeter);
				},3300); 
			}
			if (progressBar.counter == 2) { 
				setTimeout(function(){
					$('#hashmark2').addClass('progress-bar-reset');
					progressMeter.css('width', '455px');
					progressBar.counter = 1
					progressBar.reset(progressMeter);
				},3000); 
			}

			if (progressBar.counter == 1) { 
				setTimeout(function(){
					$('#hashmark1').addClass('progress-bar-reset-first');
					progressMeter.css('width', '220px');
					progressBar.counter = 0 
					progressBar.reset(progressMeter);
				},2500);
			}
			if (progressBar.counter == 0) { 
				progressMeter.css('width', '20px');
				progressBar.width = 20;
				progressBar.done = false;
				$('.progress-bar-hashmark').removeClass('progress-bar-circle');
				setTimeout(function() { 
					$('.progress-bar-hashmark').removeClass('progress-bar-reset-first');
					$('.progress-bar-hashmark').removeClass('progress-bar-reset');
					$('.progress-bar-hashmark').removeClass('progress-bar-reset-unique');
				}, 1500)
			}
	};

	return {
		controller: ['$scope', function($scope) {
			$scope.add = add;
			$scope.progress = 0;

			function add () {
				$scope.progress += 250;
			};

		}],
		template: '<div id="container"> <div id="glass"><span id="hashmark1" class="progress-bar-hashmark"> &nbsp</span> <span id="hashmark2" class="progress-bar-hashmark">&nbsp</span> <span id="hashmark3" class="progress-bar-hashmark">&nbsp</span>	<div id="water"></div></div></div>',
		link: progressBar.watch
	};
});





