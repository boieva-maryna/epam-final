let container=document.getElementById('bagProducts');
function renderBag(){
    if(shoppingBag!==null) {
        return `${shoppingBag.map(el=>
        `<article class="product product--bag" data-new=${el.hasNew} data-id=${el.id}>
            <a href="item.html">
            <figure class="product__img">
                <img src=${el.thumbnail}>
            </figure>
        </a>
        <div class="product--bag__details">
            <h4 class="small-heading product__title">${el.title}</h4>
            <h5 class="price product__price">£${el.price}</h5>
            <p class="color">Color: ${el.color}</p>
            <p class="size">Size: ${el.size}</p>
            <p>Quantity<button class="control minus">-</button><span class="quantity">${el.quantity}</span><button class="control plus">+</button></p>
            <h4 class="small-heading product__title product__remove">Remove item</h4>
        </div>
    </article>`).join('')}`
    }
    else return `<h2 class='heading'>Your shopping bag is empty. Use Catalog to add new items.</h2>`
}
container.innerHTML=renderBag();
container.addEventListener('click',e=>{
    let product={},parent;
    let quantityElem=e.target.parentNode.querySelector('.quantity');
    if(e.target.classList.contains('plus')) {
        parent=e.target.parentNode.parentNode.parentNode;
        product=getProductAttributes(parent);
        addToShoppingBag(product);
        quantityElem.innerHTML=Number(quantityElem.innerHTML)+1;
    }
    else if(e.target.classList.contains('minus')) {
        parent=e.target.parentNode.parentNode.parentNode;
        product=getProductAttributes(parent);
        deleteFromShoppingBag(product);
        if(quantityElem.innerHTML==="1") parent.parentNode.removeChild(parent);
        quantityElem.innerHTML=Number(quantityElem.innerHTML)-1;
    }
    else if(e.target.classList.contains('product__remove')){
        parent=e.target.parentNode.parentNode;
        product=getProductAttributes(parent);
        deleteFromShoppingBag(product,Number(product.quantity));
        parent.parentNode.removeChild(parent);
    }
});
function getProductAttributes(elem){
    return {
        id:elem.getAttribute('data-id'),
        title:elem.querySelector('.product__title').innerHTML.trim(),
        price:elem.querySelector('.product__price').innerHTML.split('£')[1],
        size:elem.querySelector('.size').innerHTML.split(":")[1].trim(),
        color:elem.querySelector('.color').innerHTML.split(':')[1].trim(),
        quantity:elem.querySelector('.quantity').innerHTML.trim(),
        thumbnail:elem.querySelector('.product__img').firstElementChild.getAttribute('src')
    }
}