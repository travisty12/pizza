function Order() {
  this.name = "";
  this.pizzas = [];
  this.cost = 0;
  this.currentId = 0;
  this.number = "";
}

Order.prototype.addPizza = function(pizza) {
  pizza.id = this.assignId();
  this.pizzas.push(pizza);
}

Order.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

Order.prototype.deletePizza = function(id) {
  for (var i=0; i < this.pizzas.length; i++) {
    if (this.pizzas[i]) {
      if (this.pizzas[i].id == id) {
        delete this.pizzas[i];
        return true;
      }
    }
  };
  return false;
}

function Pizza() {
  this.size = 0;
  this.toppings = [];
  this.price = 0;
}

Pizza.prototype.sizeIn = function(size) {
  this.size = size;
}

Pizza.prototype.topIn = function(toppings) {
  this.toppings.push(toppings);
}

var order = new Order();

var pizza;

$(document).ready(function() {

  $("#disclaimer").click(function() {
    $("#disclaimerDiv").fadeOut();
    setTimeout(function() {
      $("#infoDiv").fadeIn();
    }, 400);
  });

  $("#infoBtn").click(function() {
    order.name = $("#nameIn").val();
    $("#infoDiv").fadeOut();
    setTimeout(function() {
      $("#sizeDiv").fadeIn();
    }, 400);
  });

  $("#sizeBtn").click(function() {
    pizza = new Pizza();
    pizza.sizeIn($("input:radio[name=size]:checked").val());
    $("#sizeDiv").fadeOut();
    setTimeout(function() {
      $("#topDiv").fadeIn();
    }, 400);
  });

  $("#topBtn").click(function() {
    $("input:checkbox[name=top]:checked").each(function(){
      var topping = $(this).val();
      pizza.topIn(topping);
    });
    alert(pizza.toppings);
    $("#topDiv").fadeOut();
    $("#cartPending").fadeOut();
    setTimeout(function() {
      $("#cartResult").fadeIn();
    }, 400);
  });





});
