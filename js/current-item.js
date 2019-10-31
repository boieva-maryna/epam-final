localStorage.removeItem('current-item');
var main=document.querySelector('main');
//сохраним id товара, по которому кликнули
main.addEventListener('click',function(e){
    var product=e.target.parentNode.parentNode;
    if(product.hasAttribute('data-id')) {
        localStorage.setItem('current-item',product.getAttribute('data-id'));
    }
});