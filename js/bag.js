"use strict";

var shoppingBag = JSON.parse(localStorage.getItem('shopping-bag'));
updateBagView(shoppingBag);

function addToShoppingBag(product) {
  if (shoppingBag !== null) {
    var fl = false;

    for (var i = 0; i < shoppingBag.length; i++) {
      if (shoppingBag[i].id === product.id && shoppingBag[i].color === product.color && shoppingBag[i].size === product.size) {
        fl = true;
        shoppingBag[i].quantity += 1;
      }
    }

    if (!fl) {
      product.quantity = 1;
      shoppingBag.push(product);
    }
  } else {
    shoppingBag = [];
    product.quantity = 1;
    shoppingBag.push(product);
  }

  localStorage.setItem('shopping-bag', JSON.stringify(shoppingBag));
  updateBagView(shoppingBag);
}

function deleteFromShoppingBag(product) {
  for (var i = 0; i < shoppingBag.length; i++) {
    if (shoppingBag[i].id === product.id && shoppingBag[i].size === product.size && shoppingBag[i].color === product.color) {
      shoppingBag[i].quantity -= 1;
      if (shoppingBag[i].quantity === 0) shoppingBag.splice(i, 1);
      updateBagView(shoppingBag);
      localStorage.setItem('shopping-bag', JSON.stringify(shoppingBag));
      return;
    }
  }
}

function getBagSum(shoppingBag) {
  var count = 0;

  for (var i = 0; i < shoppingBag.length; i++) {
    for (var j = 0; j < window.catalog.length; j++) {
      if (shoppingBag[i].id === window.catalog[j].id) {
        console.log(shoppingBag[i]);
        count += window.catalog[j].discountedPrice * shoppingBag[i].quantity;
      }
    }
  }

  return count;
}

function getBagQuantity(shoppingBag) {
  console.log(shoppingBag);
  var quantity = 0;

  for (var i = 0; i < shoppingBag.length; i++) {
    quantity += shoppingBag[i].quantity;
  }

  return quantity;
}

function updateBagView(shoppingBag) {
  if (shoppingBag != null) {
    document.getElementById('bagSum').innerHTML = getBagSum(shoppingBag);
    document.getElementById('bagNumber').innerHTML = getBagQuantity(shoppingBag);
  } else {
    document.getElementById('bagSum').innerHTML = 0;
    document.getElementById('bagNumber').innerHTML = 0;
  }
}