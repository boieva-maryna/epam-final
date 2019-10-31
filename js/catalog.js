"use strict";

var filter = localStorage.getItem('filter-by');
var products = window.catalog;

if (filter != null) {
  products = products.filter(function (el) {
    return el[filter.split(':')[0]] === filter.split(':')[1];
  });
  if (filter.split(':')[0] == "category") document.querySelector("[data-filter_by='".concat(filter, "']")).setAttribute('data-active_filter', 'true');
} else {
  //условие задания
  products = products.filter(function (el) {
    return el.category === 'women' && el.fashion == "Casual style";
  });
  document.querySelector("[data-filter_by='category:women']").setAttribute('data-active_filter', 'true');
}

products.sort(function (a, b) {
  return new Date(b.dateAdded) - new Date(a.dateAdded);
});

function renderProducts() {
  if (products.length > 0) return "".concat(products.map(function (el) {
    return "<article class=\"product\" data-new=".concat(el.hasNew, " data-id=").concat(el.id, ">\n            <a href=\"item.html\">\n                <figure class=\"product__img\">\n                    <img src=").concat(el.thumbnail, ">\n                </figure>\n                <h4 class=\"small-heading product__title\">").concat(el.title, "</h4>\n                ").concat(el.discountedPrice !== null && el.discountedPrice < el.price ? "<h5 class=\"price product__price\">\n                    <span class=\"price--crossed\">\xA3".concat(el.price, "</span> \xA3").concat(el.discountedPrice, "</h5>") : "<h5 class=\"price product__price\">\xA3".concat(el.price, "</h5>"), "\n            </a>\n        </article>");
  }).join(''));else return "<h2 class='heading'>Catalog for ".concat(filter, " is empty :(</h2>");
}

document.querySelector('.products__wrp').insertAdjacentHTML('beforeend', renderProducts());
var showMore = document.getElementById('showMore');
showMore.addEventListener('click', function show(e) {
  e.preventDefault();
  var productsSection = document.querySelector('.products');

  if (productsSection.offsetWidth < 767) {
    productsSection.classList.remove('products--small');
  }
});