$(function () {
  $(".navbar-toggler").on("click", function (e) {
    $(".tm-header").toggleClass("show");
    e.stopPropagation();
  });

  $("html").click(function (e) {
    var header = document.getElementById("tm-header");

    if (header && !header.contains(e.target)) {
      $(".tm-header").removeClass("show");
    }
  });

  $("#tm-nav .nav-link").click(function () {
    $(".tm-header").removeClass("show");
  });
});
