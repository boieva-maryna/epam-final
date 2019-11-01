"use strict";

var currentItem = localStorage.getItem('current-item');

if (currentItem != null) {
  var item = window.catalog.filter(function (el) {
    return el.id == currentItem;
  })[0];
  document.getElementById('preview').innerHTML = "<img src=\"".concat(item.preview[0], "\">");

  for (var i = 0; i < document.querySelectorAll('.thumbnail__img').length; i++) {
    document.querySelectorAll('.thumbnail__img')[i].innerHTML = "<img src=\"".concat(item.preview[i], "\">");
  }

  ;
  document.getElementById('productsDetails').innerHTML = "\n    <h2 class=\"small-heading product-details__title\">".concat(item.title, "</h2>\n    <p class=\"cursive product-details__description\">").concat(item.description, "</p>\n    <p class=\"product-details__price price\">\xA3").concat(item.price, "</p>\n    ").concat(item.sizes.length > 0 ? "<div class=\"product-details__buttons product-details__buttons--size\">\n        <span class=\"product-details__option\">Size</span>\n        ".concat(item.sizes.map(function (size, index) {
    if (index === 0) return "<a href=\"#\" class=\"button\" data-product_details=\"size:".concat(size, "\" data-checked=\"true\">").concat(size, "</a>");else return "<a href=\"#\" class=\"button\" data-product_details=\"size:".concat(size, "\">").concat(size, "</a>");
  }).join(""), "\n    </div>") : "", "\n    ").concat(item.colors.length > 0 ? "<div class=\"product-details__buttons product-details__buttons--color\">\n        <span class=\"product-details__option\">Color</span>\n        ".concat(item.colors.map(function (color, index) {
    if (index === 0) return "<a href=\"#\" class=\"button\" data-product_details=\"color:".concat(color, "\" data-checked=\"true\">").concat(color, "</a>");else return "<a href=\"#\" class=\"button\" data-product_details=\"size:".concat(color, "\">").concat(color, "</a>");
  }).join(""), "\n    </div>") : "", "\n    <a href=\"shopping-bag\" class=\"button button--big\" id=\"addToBag\">Add to bag</a>\n    ");
}

document.getElementById('productGallery').addEventListener('click', function (e) {
  if (e.target.parentNode.parentNode.className == "thumbnail") switchPhoto(e.target);
}, false);

function switchPhoto(elem) {
  document.querySelector('[data-active="true"]').setAttribute('data-active', false);
  document.querySelector('.preview__img').firstChild.setAttribute('src', elem.getAttribute('src'));
  elem.parentNode.parentNode.setAttribute('data-active', true);
}