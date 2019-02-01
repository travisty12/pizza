function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
}

Pizza.prototype.cost = function() {

}


$(document).ready(function() {

  $("#infoBtn").click(function() {
    $("#infoDiv").fadeOut();
    setTimeout(function() {
      $("#sizeDiv").fadeIn();
    }, 400);
  });

  $("#sizeBtn").click(function() {
    $("#sizeDiv").fadeOut();
    setTimeout(function() {
      $("#topDiv").fadeIn();
    }, 400);
  });

  $("#topBtn").click(function() {
    $("#topDiv").fadeOut();
    setTimeout(function() {
      $("#cartDiv").fadeIn();
    }, 400);
  });

});
