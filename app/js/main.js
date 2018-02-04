import hello from './lib/hello.js';
import $ from 'jquery';
import '../libs/bootstrap/dist/js/bootstrap.bundle.js';
import svg4everybody from '../libs/svg4everybody/dist/svg4everybody.legacy.js';
import '../libs/slick-carousel/slick/slick.js';
import Waypoint from '../libs/waypoints/lib/jquery.waypoints.js';
import mixitup from 'mixitup';

hello();
svg4everybody({
  polyfill: true 
});

$(window).ready(function() {

  var mixer = mixitup('.portfolio__shuffle');

  $('.portfolio__pagination a').click(function(event) {
    event.preventDefault();
  });

  $('.s, .about__monitor').css('opacity', 0);

  $('.mobile__btn').click(function() {
    $('.hero__menu').toggleClass('is-active');
    $(this).toggleClass('is-active');
  });

  $('.hero__slider').slick({
    prevArrow: '.hero__prev',
    nextArrow: '.hero__next',
    draggable: false,
    infinite: true,
    adaptiveHeight: true,
    fade: true,
    infinite: true,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    touchThreshold: 100,
    speed: 900,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [{
      draggable: true
    }]
  });

  $('.services__slider').slick({
    arrows: false,
    draggable: false,
    dots: true,
    infinite: true,
    adaptiveHeight: true,
    fade: true,
    infinite: true,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    touchThreshold: 100,
    speed: 900,
    // autoplay: true,
    // autoplaySpeed: 5000,
    responsive: [{
      draggable: true
    }]
  });

  $('.study__slider').slick({
    arrows: false,
    draggable: false,
    dots: true,
    infinite: true,
    adaptiveHeight: true,
    fade: true,
    infinite: true,
    appendDots: $('.study__dots'),
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    touchThreshold: 100,
    speed: 900,
    // autoplay: true,
    // autoplaySpeed: 5000,
    responsive: [{
      draggable: true
    }]
  });

  $('.goup').click(function(e) {

    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    return false;

  });

});

$(window).on('load', function() {

  $.when($('.loader').addClass('loader--hidden').delay(400).queue(function(hideloader) { 
    $(this).css({
      display: 'none'
    });
    hideloader(); 
  })).done(function() {

    $.when($('.loader_inner').fadeOut())

      .done(function() {

        $('.s').each(function() {
          var self = $(this);
          $(this).waypoint({
            handler: function() {
              self.addClass('animated fade__bino').css('opacity', 1);;
            }, offset: '75%'
          });
        });

        $('.about__monitor').waypoint(function() {
          $('.about__monitor').addClass('animated fadeInLeftSlow');
        }, { offset: '80%'});

      });

  });
});



//counter
$(function() {


  $('.stats__counter').each(function() {
    var self = $(this);
    $(this).waypoint({
      handler: function() {


        $(self).each(function() {
          var dataperc;
          dataperc = $(this).data('perc'),
          $(this).find('.counter__number').delay(6000).countTo({
            from: 0,
            to: dataperc,
            speed: 2000,
            refreshInterval: 50,
          });
        });
        this.destroy();



      }, offset: '100%'
    });
  });
});

$(function() {
  $.fn.countTo = function(options) {
    // merge the default plugin settings with the custom options
    options = $.extend({}, $.fn.countTo.defaults, options || {});
  
    // how many times to update the value, and how much to increment the value on each update
    var loops = Math.ceil(options.speed / options.refreshInterval),
      increment = (options.to - options.from) / loops;
  
    return jQuery(this).each(function() {
      var _this = this,
        loopCount = 0,
        value = options.from,
        interval = setInterval(vntd_updateTimer, options.refreshInterval);
  
      function vntd_updateTimer() {
        value += increment;
        loopCount++;
        jQuery(_this).html(value.toFixed(options.decimals));
  
        if (typeof(options.onUpdate) == 'function') {
          options.onUpdate.call(_this, value);
        }
  
        if (loopCount >= loops) {
          clearInterval(interval);
          value = options.to;
  
          if (typeof(options.onComplete) == 'function') {
            options.onComplete.call(_this, value);
          }
        }
      }
    });
  };
  
  $.fn.countTo.defaults = {
    from: 0, // the number the element should start at
    to: 100, // the number the element should end at
    speed: 1000, // how long it should take to count between the target numbers
    refreshInterval: 1000, // how often the element should be updated
    decimals: 0, // the number of decimal places to show
    onUpdate: null, // callback method for every time the element is updated,
    onComplete: null, // callback method for when the element finishes updating
  };
});
