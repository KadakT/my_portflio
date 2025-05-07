jQuery(document).ready(function() {
  let windowWidth = $( window ).width();
  // Hide url parameters in address bar 
  //history.replaceState(null, document.querySelector("title").innerText, window.location.pathname);
  /*
    Function for scrolling to anchor
    ************************************/
  $(function () {
    $('a[href*="#"]:not([href="#"])').click(function () {
      // I need  to close nav but it breaks scroll to corect place, need to invistigate
    
      $(this).parent().addClass('selected').siblings().removeClass('selected');

        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                   scrollTop: target.offset().top - 100
                }, 1000, function(){
                    if (windowWidth < 900) {
                      $(".navigation__btn").removeClass("close");
                      $(".navigation__nav").slideUp("slow");
                    }
                });
                return false;
            }
        }
    });
  });
  
  $( window ).on( "resize scroll", function() {
    windowWidth = $( window ).width();
    if(windowWidth > 900){
      $(".navigation__nav").removeAttr('style'); 
      $(".navigation__btn").removeClass( "close" );
    }

    if($('.skills-bar__container').isInViewport()){
      $(".skills-bar").showProgressBar();
    } else {
      $(".skills-bar").removeProgressBar();
    }
  });

    $(document).click(function(e) {
      const isOutsideNav = !$(e.target).closest(".navigation__nav, .navigation__btn").length;
      if (windowWidth < 900) {
        if (isOutsideNav) {
          $(".navigation__btn").removeClass("close");
          $(".navigation__nav").slideUp("slow");
        } else {
          $(".navigation__btn").toggleClass("close");
          $(".navigation__nav").slideToggle("slow");
        }
      }
    });

});


$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

var lang = {
  "html": "90%",
  "css": "90%",
  "typescript": "70%",
  "angular": "80%",
  "react": "30%",
  "accessibility": "90%"
};

var multiply = 4;

$.fn.showProgressBar = function() {
  return this.each(function() {
    $.each(lang, function(language, percent) {
      var delay = 700;
      setTimeout(function() {
        $('#progress-' + language).addClass('animate');
        $('#' + language + '-percent').html(percent);
      }, delay * multiply);
      multiply++;
    });
  });
};

$.fn.removeProgressBar = function() {
  return this.each(function() {
    $.each(lang, function(language) {
        $('#progress-' + language).removeClass('animate');
      });
   
  });
}



