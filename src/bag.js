let shoppingBag=JSON.parse(localStorage.getItem('shopping-bag'));
updateBagView(shoppingBag);
function addToShoppingBag(product){
    if(shoppingBag!==null){
        let fl=false;
        for(let i=0;i<shoppingBag.length;i++){
            if(shoppingBag[i].id===product.id&&shoppingBag[i].color===product.color&&shoppingBag[i].size===product.size){
                fl=true;
                shoppingBag[i].quantity+=1;
            }
        }
        if(!fl){
            product.quantity=1;
            shoppingBag.push(product);
        }
    }
    else {
        shoppingBag=[];
        product.quantity=1;
        shoppingBag.push(product);
    }
    localStorage.setItem('shopping-bag',JSON.stringify(shoppingBag));
    updateBagView(shoppingBag);
}
function deleteFromShoppingBag(product){
    for(let i=0;i<shoppingBag.length;i++){
        if(shoppingBag[i].id===product.id&&shoppingBag[i].size===product.size&&shoppingBag[i].color===product.color){
            shoppingBag[i].quantity-=1;
            if(shoppingBag[i].quantity===0) shoppingBag.splice(i,1);
            break;
        }
    }
    updateBagView(shoppingBag);
    localStorage.setItem('shopping-bag',JSON.stringify(shoppingBag));
}
function getBagSum(shoppingBag){
    let count=0;
    for(let i=0;i<shoppingBag.length;i++){
        count+=shoppingBag[i].price*shoppingBag[i].quantity;
    }
    return count;
}
function getBagQuantity(shoppingBag){
    let quantity=0;
    for(let i=0;i<shoppingBag.length;i++){
        quantity+=shoppingBag[i].quantity;
    }
    return quantity;
}
function updateBagView(shoppingBag){
    if(shoppingBag!=null){
        let discount=checkDiscount(shoppingBag);
        document.getElementById('bagSum').innerHTML=(getBagSum(shoppingBag) - discount);
        document.getElementById('bagNumber').innerHTML=getBagQuantity(shoppingBag);
    }
    else {
        document.getElementById('bagSum').innerHTML=0;
        document.getElementById('bagNumber').innerHTML=0;
    }
}
function checkDiscount(shoppingBag){
    //в корзине должен быть товар из bestOffer.left и bestOffer.right
        let left,right=0;
        for(let i=0;i<window.bestOffer.left.length;i++){
            left=shoppingBag.map(val=>val.id).indexOf(window.bestOffer.left[i]);
            if(left!=-1) break;
        }
        for(let i=0;i<window.bestOffer.right.length;i++){
            right=shoppingBag.map(val=>val.id).indexOf(window.bestOffer.right[i]);
            if(right!=-1) break;
        }
        if(left!==-1&&right!==-1) {
            return window.bestOffer.discount;
        }
    return 0;
}