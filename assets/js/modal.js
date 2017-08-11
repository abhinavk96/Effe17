$(document).ready(function() {
$('#balloon').click(function() {
	//alert("hey");
  var buttonId = $(this).attr('id');
  //alert(buttonId);
  $('#modal-container').removeAttr('class').addClass(buttonId);
  $('body').addClass('modal-active');
  $('.modal-background').css("background", "rgba(0,0,0,0.6)");
  $('#modal-container').css("background", "rgba(0,0,0,0.6)");
  $('#boat-main').css("z-index", "0");
  $("#cross").fadeIn(1000);
})

$('#modal-container').click(function(){
  $(this).addClass('out');
  $('body').removeClass('modal-active');
  $('.modal-background').css("background", "transparent");
  $('#modal-container').css("background", "transparent");
    $('#balloon').css("z-index","5");
    $("boat-main").css("z-index", "5");
});

$("#cr").click(function() {
  $("#cross").css("display", "none");
});

});