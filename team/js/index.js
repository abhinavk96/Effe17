$(window).on('load', function(){
  
  var $container = $('.icon-list').isotope({
        layoutMode: 'masonry',
        itemSelector: '.icon'
    });
  
  $('.icon').each(function(i){
    var self = this;
    setTimeout(function(){
        $(self).addClass('shown');
    }, i*200);
  });
  setTimeout(function(){
        $('#first').click();
    }, 16*200);
  
  $('.icon').on('click', function(){
    $('.icon').removeClass('active').addClass('inactive');
    $(this).removeClass('inactive').addClass('active');
    $('.inner-wrapper').animate({
      scrollTop: 0
    }, 500);
  });
});