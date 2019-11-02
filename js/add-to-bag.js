"use strict";

function addToBag(id, color, size) {
  var shoppingBag = JSON.parse(localStorage.getItem('shopping-bag'));

  if (shoppingBag !== null) {
    var fl = false;

    for (var i = 0; i < shoppingBag.length; i++) {
      if (shoppingBag[i].id === id && shoppingBag[i].color === color && shoppingBag[i].size === size) {
        fl = true;
        shoppingBag[i].quantity += 1;
      }
    }

    if (!fl) {
      shoppingBag.push({
        id: id,
        color: color,
        size: size,
        quantity: 1
      });
    }
  } else {
    shoppingBag = [];
    shoppingBag.push({
      id: id,
      color: color,
      size: size,
      quantity: 1
    });
  }

  localStorage.setItem('shopping-bag', JSON.stringify(shoppingBag));
  updateBagView(shoppingBag);
}

function getBagSum(shoppingBag) {
  var count = 0;

  for (var i = 0; i < shoppingBag.length; i++) {
    for (var j = 0; j < window.catalog.length; j++) {
      if (shoppingBag[i].id === window.catalog[j].id) count += window.catalog[j].discountedPrice;
    }
  }

  return count;
}

function getBagQuantity(shoppingBag) {
  console.log(shoppingBag);
  var quantity = shoppingBag.reduce(function (accumulator, curr) {
    return accumulator + curr.quantity;
  });
  return quantity;
}

function updateBagView(shoppingBag) {
  document.getElementById('bagSum').innerHTML = getBagSum(shoppingBag);
  document.getElementById('bagNumber').innerHTML = getBagQuantity(shoppingBag);
}