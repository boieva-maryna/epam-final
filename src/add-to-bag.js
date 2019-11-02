function addToBag(id,color,size){
    let shoppingBag=JSON.parse(localStorage.getItem('shopping-bag'));
    if(shoppingBag!==null){
        let fl=false;
        for(let i=0;i<shoppingBag.length;i++){
            if(shoppingBag[i].id===id&&shoppingBag[i].color===color&&shoppingBag[i].size===size){
                fl=true;
                shoppingBag[i].quantity+=1;
            }
        }
        if(!fl){
            shoppingBag.push({id:id,color:color,size:size,quantity:1});
        }
    }
    else {
        shoppingBag=[];
        shoppingBag.push({id:id,color:color,size:size,quantity:1});
    }
    localStorage.setItem('shopping-bag',JSON.stringify(shoppingBag));
    updateBagView(shoppingBag);
}
function getBagSum(shoppingBag){
    let count=0;
    for(let i=0;i<shoppingBag.length;i++){
        for(let j=0;j<window.catalog.length;j++){
            if(shoppingBag[i].id===window.catalog[j].id) count+=window.catalog[j].discountedPrice;
        }
    }
    return count;
}
function getBagQuantity(shoppingBag){
    console.log(shoppingBag);
    let quantity=shoppingBag.reduce((accumulator,curr)=>{
        return accumulator+curr.quantity
    });
    return quantity;
}
function updateBagView(shoppingBag){
    document.getElementById('bagSum').innerHTML=getBagSum(shoppingBag);
    document.getElementById('bagNumber').innerHTML=getBagQuantity(shoppingBag);
}