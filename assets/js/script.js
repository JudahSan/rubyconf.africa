(function ($) {
  "use strict";

  // Handle preloader
  function handlePreloader() {
    // Check for the old preloader (preloader)
    if ($(".preloader").length) {
      // Show the old preloader (fade-in)
      $(".preloader").fadeIn(200);

      // Hide the old preloader after a delay and fade it out
      setTimeout(function () {
        $(".preloader").fadeOut(200); // Fade out the old preloader
      }, 2000); // Adjust delay (e.g., 2 seconds)
    }
    // Check for the new preloader (preloader-new)
    else if ($(".preloader-new").length) {
      // Show the new preloader (fade-in)
      $(".preloader-new").fadeIn(200);

      // Hide the new preloader after the page has fully loaded
      $(window).on("load", function () {
        $(".preloader-new").fadeOut(200); // Fade out the new preloader
      });
    }
  }

  // Run the handlePreloader function when the page is ready
  $(document).ready(function () {
    handlePreloader();
  });

  // Windows load

  $(window).on("load", function () {
    // Site loader

    $(".loader-inner").fadeOut();
    $(".loader").delay(200).fadeOut("slow");
  });

  // Currency
  $("#currency").change(function () {
    var selectedCurrency = $(this).val();

    $(".amount").each(function () {
      var newPrice = $(this).data(selectedCurrency);
      $(this).text(newPrice);
    });

    $(".cur").text(selectedCurrency === "kes" ? "KSh" : "$");
  });

  // Scroll to

  $("a.scroll").smoothScroll({
    speed: 800,
    offset: -50,
  });

  // Slider

  $(".slider").flexslider({
    animation: "fade",
    slideshow: true,
    directionNav: true,
    controlNav: false,
    pauseOnAction: false,
    animationSpeed: 500,
  });

  $(".review-slider").flexslider({
    animation: "fade",
    slideshow: true,
    directionNav: false,
    controlNav: true,
    pauseOnAction: false,
    animationSpeed: 1000,
  });

  // Mobile menu

  var mobileBtn = $(".mobile-but");
  var nav = $(".main-nav ul");
  var navHeight = nav.height();

  $(mobileBtn).on("click", function () {
    $(".toggle-mobile-but").toggleClass("active");
    nav.slideToggle();
    $(".main-nav li a").addClass("mobile");
    return false;
  });

  $(window).resize(function () {
    var w = $(window).width();
    if (w > 320 && nav.is(":hidden")) {
      nav.removeAttr("style");
      $(".main-nav li a").removeClass("mobile");
    }
  });

  $(".main-nav li a").on("click", function () {
    if ($(this).hasClass("mobile")) {
      nav.slideToggle();
      $(".toggle-mobile-but").toggleClass("active");
    }
  });

  // Append images as css background

  $(".background-img").each(function () {
    var path = $(this).children("img").attr("src");
    $(this)
      .css("background-image", 'url("' + path + '")')
      .css("background-position", "initial");
  });

  // Count down setup

  $(".countdown").countdown("2025/7/18", function (event) {
    $(this).html(event.strftime("%D days %H:%M:%S"));
  });

  // Tabbed content

  $(".block-tabs li").on("click", function () {
    if (!$(this).hasClass("active")) {
      var tabNum = $(this).index();
      var nthChild = tabNum + 1;
      $(".block-tabs li.active").removeClass("active");
      $(this).addClass("active");
      $(".block-tab li.active").removeClass("active");
      $(".block-tab li:nth-child(" + nthChild + ")").addClass("active");
    }
  });

  // Zoom	effect

  $(".block-gallery li").on("mouseenter", function () {
    $(this).closest(".gallery").find(".block-gallery li").removeClass("active");
    $(this).addClass("active");
  });

  $(".block-ticket").on("mouseenter", function () {
    $(this).closest(".tickets").find(".block-ticket").removeClass("active");
    $(this).addClass("active");
  });

  // Images zoom

  $(".venobox").venobox({
    titleattr: "data-title",
    numeratio: true,
  });

  // Instagram feed setup

  var instaFeed = new Instafeed({
    get: "user",
    userId: "305801553",
    accessToken: "305801553.1677ed0.3d872300c10c4ff687868875ee8abc5d",
    limit: 6,
    template:
      '<li class="col-sm-4"><a href="{{link}}"><img src="{{image}}"/></a></li>',
  });
  instaFeed.run();

  // Form validation

  // var resgistryForm = $('.registry-form');
  // resgistryForm.validate({
  //     validClass: 'valid',
  //     errorClass: 'error',
  //     errorPlacement: function(error, element) {
  //         return true;
  //     },
  //     onfocusout: function(element, event) {
  //         $(element).valid();
  //     },
  //     rules: {
  //         email: {
  //             required: true,
  //             email: true
  //         }
  //     },
  //
  //     rules: {
  //         name: {
  //             required: true,
  //             minlength: 3
  //         }
  //     }
  //
  //
  // });
})(jQuery);

// Replace Google Maps whti Leaflet
function initializeMap() {
  var lat = -1.2534411,
    lng = 36.8568778;

  // Initialize Leaflet map
  var map = L.map("map").setView([lat, lng], 14);

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  // Custom map marker
  var markerIcon = L.icon({
    iconUrl: "img/marker.png",
    iconSize: [80, 80],
  });

  // Add marker to map
  L.marker([lat, lng], { icon: markerIcon })
    .addTo(map)
    .bindPopup("Your Location")
    .openPopup();
}
document.addEventListener("DOMContentLoaded", initializeMap);
