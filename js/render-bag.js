"use strict";

var container = document.getElementById('bagProducts');

function renderBag() {
  if (shoppingBag !== null) {
    return "".concat(shoppingBag.map(function (el) {
      return "<article class=\"product product--bag\" data-new=".concat(el.hasNew, " data-id=").concat(el.id, ">\n            <a href=\"item.html\">\n            <figure class=\"product__img\">\n                <img src=").concat(el.thumbnail, ">\n            </figure>\n        </a>\n        <div class=\"product--bag__details\">\n            <h4 class=\"small-heading product__title\">").concat(el.title, "</h4>\n            <h5 class=\"price product__price\">\xA3").concat(el.price, "</h5>\n            <p class=\"color\">Color: ").concat(el.color, "</p>\n            <p class=\"size\">Size: ").concat(el.size, "</p>\n            <p>Quantity<button class=\"control minus\">-</button><span class=\"quantity\">").concat(el.quantity, "</span><button class=\"control plus\">+</button></p>\n            <h4 class=\"small-heading product__title product__remove\">Remove item</h4>\n        </div>\n    </article>");
    }).join(''));
  } else return "<h2 class='heading'>Your shopping bag is empty. Use Catalog to add new items.</h2>";
}

container.innerHTML = renderBag();
container.addEventListener('click', function (e) {
  var product = {},
      parent;
  var quantityElem = e.target.parentNode.querySelector('.quantity');

  if (e.target.classList.contains('plus')) {
    parent = e.target.parentNode.parentNode.parentNode;
    product = getProductAttributes(parent);
    addToShoppingBag(product);
    quantityElem.innerHTML = Number(quantityElem.innerHTML) + 1;
  } else if (e.target.classList.contains('minus')) {
    parent = e.target.parentNode.parentNode.parentNode;
    product = getProductAttributes(parent);
    deleteFromShoppingBag(product);
    if (quantityElem.innerHTML === "1") parent.parentNode.removeChild(parent);
    quantityElem.innerHTML = Number(quantityElem.innerHTML) - 1;
  } else if (e.target.classList.contains('product__remove')) {
    parent = e.target.parentNode.parentNode;
    product = getProductAttributes(parent);
    deleteFromShoppingBag(product, Number(product.quantity));
    parent.parentNode.removeChild(parent);
  }
});

function getProductAttributes(elem) {
  return {
    id: elem.getAttribute('data-id'),
    title: elem.querySelector('.product__title').innerHTML.trim(),
    price: elem.querySelector('.product__price').innerHTML.split('£')[1],
    size: elem.querySelector('.size').innerHTML.split(":")[1].trim(),
    color: elem.querySelector('.color').innerHTML.split(':')[1].trim(),
    quantity: elem.querySelector('.quantity').innerHTML.trim(),
    thumbnail: elem.querySelector('.product__img').firstElementChild.getAttribute('src')
  };
}