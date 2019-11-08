var main=document.querySelector('main');
//сохраним id товара, по которому кликнули
main.addEventListener('click',function(e){
    var product=e.target.parentNode.parentNode;
    if(product.hasAttribute('data-id')) {
        localStorage.setItem('current-item',product.getAttribute('data-id'));
    }
    if(e.target.parentNode.parentNode.id==="promo__item"||
    e.target.parentNode.parentNode.parentNode.id==="promo__item") localStorage.setItem('current-item','80d32566-d81c-4ba0-9edf-0eceda3b4360');
});