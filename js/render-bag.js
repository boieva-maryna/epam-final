"use strict";

function renderBag() {
  if (shoppingBag !== null) {
    return "".concat(shoppingBag.map(function (el) {
      return "<article class=\"product product--bag\" data-new=".concat(el.hasNew, " data-id=").concat(el.id, ">\n            <a href=\"item.html\">\n            <figure class=\"product__img\">\n                <img src=").concat(el.thumbnail, ">\n            </figure>\n        </a>\n        <div class=\"product--bag__details\">\n            <h4 class=\"small-heading product__title\">").concat(el.title, "</h4>\n            <h5 class=\"price product__price\">\xA3").concat(el.price, "</h5>\n            <p>Color</p>\n            <p>Size</p>\n            <p>Quantity<button class=\"control minus\">-</button><span class=\"quantity\">").concat(el.quantity, "</span><button class=\"control plus\">+</button></p>\n            <h4 class=\"small-heading product__title product__remove\">Remove item</h4>\n        </div>\n    </article>");
    }).join(''));
  } else return "<h2 class='heading'>Your shopping bag is empty. Use Catalog to add new items.</h2>";
}

document.getElementById('bagProducts').innerHTML = renderBag();