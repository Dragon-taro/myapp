//= require jquery
//= require jquery_ujs
//= require js-routes
//= require ./lib/toastr


$(window).ready(function(){
  $("#js_headerMenuOpen").click(function() {
    $("#jsMenuWrapper").addClass('active')
    $("#js_headerMenuClose").addClass('active')
  });
  $("#js_headerMenuClose").click(function() {
    $("#jsMenuWrapper").removeClass('active')
    $("#js_headerMenuClose").removeClass('active')
  });
});
