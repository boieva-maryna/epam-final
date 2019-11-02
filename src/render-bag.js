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
            <p>Color</p>
            <p>Size</p>
            <p>Quantity<button class="control minus">-</button><span class="quantity">${el.quantity}</span><button class="control plus">+</button></p>
            <h4 class="small-heading product__title product__remove">Remove item</h4>
        </div>
    </article>`).join('')}`
    }
    else return `<h2 class='heading'>Your shopping bag is empty. Use Catalog to add new items.</h2>`
}
document.getElementById('bagProducts').innerHTML=renderBag();