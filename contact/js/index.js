$(document).ready(function() {
  $("body").toggleClass("lightmode");
});

$(".fa-facebook-square").hover(function() {
  $(".fbinfo").toggle();
  $(".welcome").hide();
  });
$(".welcome").show ();

$(".fa-camera-retro").hover(function() {
  $(".iginfo").toggle();
  $(".welcome").hide();

});

$(".fa-twitter").hover(function() {
  $(".twinfo").toggle();
  $(".welcome").hide();
});

$(".fa-google-plus").hover(function() {
  $(".gpinfo").toggle();
  $(".welcome").hide();
});

$(".fa-linkedin").hover(function() {
  $(".liinfo").toggle();
  $(".welcome").hide();
});

$(".fa-youtube").hover(function() {
  $(".ytinfo").toggle();
  $(".welcome").hide();
});