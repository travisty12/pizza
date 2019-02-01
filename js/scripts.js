function Order() {
  this.name = "";
  this.pizzas = [];
  this.cost = 0;
  this.currentId = 0;
  this.number = "";
}

Order.prototype.addPizza = function(pizza) {
  pizza.id = this.assignId();
  this.pizzas.unshift(pizza);
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

Order.prototype.findCost = function() {
  for (var i = 0; i < this.pizzas.length; i++) {
    if (this.pizzas[i]) {
      this.cost += this.pizzas[i].findCost();
    }
  }
  return this.cost;
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

Pizza.prototype.findCost = function() {
  this.price = this.size * 10 + this.toppings.length * 3;
  return this.price;
}

var order = new Order();

var pizza;
var pizzaList = "";

function sizeToString(size) {
  if (size == 1) {
    return "Personal";
  } else if (size == 2) {
    return "Medium";
  } else if (size == 3) {
    return "Family-sized";
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems);
});

$(document).ready(function() {
  $('.modal').modal();
  $('.fixed-action-btn').floatingActionButton();
  $("#disclaimer").click(function() {
    $("#disclaimerDiv").fadeOut();
    setTimeout(function() {
      $("#infoDiv").fadeIn();
    }, 400);
  });

  $("#infoBtn").click(function() {
    order.name = $("#nameIn").val();
    order.number = $("#number").val();
    if (order.name == "") {
      order.name = "buddy";
    }
    if (order.number == "") {
      order.number = "a payphone nearby. We know where you live already, and see all.";
    }
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
    order.addPizza(pizza);
    $("#topDiv").fadeOut();
    $(".nameSpot").text(order.name);
    setTimeout(function() {
      $("#cartDiv").fadeIn();
    }, 400);

    if (order.pizzas[0].toppings.length == 0) {
      pizzaList += "<li>- " + sizeToString(order.pizzas[0].size) + " pizza: $" + order.pizzas[0].findCost() + "</li>";
    } else {
      pizzaList += "<li>- " + sizeToString(order.pizzas[0].size) + " pizza with ";
      for (var j = 0; j < order.pizzas[0].toppings.length; j++) {
        if (j != order.pizzas[0].toppings.length - 1) {
          pizzaList += order.pizzas[0].toppings[j] + ", ";
        } else if (j > 0) {
          pizzaList += " and " + order.pizzas[0].toppings[j];
        } else {
          pizzaList += " " + order.pizzas[0].toppings[j];
        }
      }
      pizzaList += ": $" + order.pizzas[0].findCost() + "</li>";
    }
    $(".pizzaList").append(pizzaList);

  });

  $("#newBtn").click(function() {
    $("#cartDiv").fadeOut();
    setTimeout(function() {
      $("#sizeDiv").fadeIn();
    });
    $('input[type=checkbox]').each(function() {
            this.checked = false;
    });
    pizzaList = "";

  });

  $("#done").click(function() {
    $("#cartPending").fadeOut();


    $("#cartResult").append("<p>Your total is $" + order.findCost() + "</p>");
    $("#cartResult").append("<p>We'll call you in a couple hours with everything, at " + order.number + "</p>");

    setTimeout(function() {
      $("#cartResult").fadeIn();
    });

  });

  $("#homeDiv").click(function() {
    location.reload();
  });



});
