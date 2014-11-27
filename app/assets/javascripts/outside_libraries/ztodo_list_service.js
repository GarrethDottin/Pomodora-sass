angular.module("App").service("dom", function (){
  this.closeModal = function (event){
    $('nav').css("right", "-320px");
    $('body').css("left", "0px")
  };

  this.positionModal = function () {
      setInterval (function(){
        if($('nav').position().left == 1280) {
          $('nav').css("right", "0px")
          $('body').css("left", "0px")
        }
        if ($("nav").position().left < 1230) {
          console.log("this is hit less than")
          $('nav').css("right", "-320px");
          $('body').css("left", "0px")
        }
        if ($('nav').position().left > 1280) {
          console.log("this is hit greater")
          $('nav').css("right", "-320px");
        }
      },1000);
  };
});