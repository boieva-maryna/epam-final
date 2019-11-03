var left=[],right=[];
for(var i=0;i<window.catalog.length;i++){
    for(var j=0;j<window.bestOffer.left.length;j++){
        if(window.catalog[i].id==window.bestOffer.left[j]) left.push(window.catalog[i]);
        else if(j<2&&window.catalog[i].id==window.bestOffer.right[j]) right.push(window.catalog[i]);
    }
}
right=right.reverse();
var slider_wrp=document.getElementsByClassName('slider__wrapper');
var sliders=document.getElementsByClassName('slider');
var addToBag=document.getElementById('addToBag');
addToBag.addEventListener('click',clickAddToBag);
createSlides(left,slider_wrp[0],0);
createSlides(right,slider_wrp[1],1);
countPrice();
sliders[0].addEventListener('click',function(e){
    if(e.target.className=="up"||e.target.className=="down"){
        e.preventDefault();
        clickSlide(e,slider_wrp[0],0);
    }
    countPrice();
},false)

sliders[1].addEventListener('click',function(e){
    if(e.target.className=="up"||e.target.className=="down"){
        e.preventDefault();
        clickSlide(e,slider_wrp[1],1);
    }
    countPrice();
},false);

function createSlides(arr,parent,num){
    for(var i=0;i<arr.length;i++){
        var slide=document.createElement('article');
        slide.setAttribute('data-price',arr[i].price);
        slide.setAttribute('data-slider',num);
        slide.setAttribute('data-new',arr[i].hasNew);
        slide.setAttribute('data-id',arr[i].id);
        slide.className="product";
        slide.innerHTML=`<a href="item.html"><figure class="product__img">
                <img src=${arr[i].thumbnail} alt="${arr[i].title}">
            </figure>
            <h4 class="small-heading product__title">${arr[i].title}</h4>
            <h5 class="price product__price">£${arr[i].price}</h5></a>`;
        if(i!=0) slide.style.display="none"; 
        else slide.setAttribute('data-active',true);
        parent.appendChild(slide);
    }
}
function clickSlide(e,slider,num){
    var curr=document.querySelector(`[data-active="true"][data-slider="${num}"]`);
    curr.style.display="none";
    curr.setAttribute('data-active',false);
    if(e.target.className=="up"){
        if(curr==slider.firstElementChild){
            slider.lastElementChild.setAttribute('data-active',true);
            slider.lastElementChild.style.display="block";
        }
        else {
            curr.previousElementSibling.setAttribute('data-active',true);
            curr.previousElementSibling.style.display="block";
        }
    }
    else {
        if(curr==slider.lastElementChild){
            slider.firstElementChild.setAttribute('data-active',true);
            slider.firstElementChild.style.display="block";
        }
        else{
            curr.nextSibling.setAttribute('data-active',true);
            curr.nextSibling.style.display="block";
        }
    }
}
function countPrice(){
    var curr=document.querySelectorAll('[data-active="true"]');
    var price=0;
    for(var i=0;i<curr.length;i++){
        price+=Number(curr[i].getAttribute('data-price'));
    }
    document.getElementById('oldPrice').innerHTML=`£${price}`;
    document.getElementById('newPrice').innerHTML=`£${(price-window.bestOffer.discount)}`;
}
function clickAddToBag(e){
    let products=document.querySelectorAll('[data-active="true"]');
    let product1={
        id:products[0].getAttribute('data-id'),
        price:products[0].getAttribute('data-price'),
        thumbnail:products[0].querySelector('img').getAttribute('src'),
        title:products[0].querySelector('.product__title').innerHTML
    };
    let product2={
        id:products[1].getAttribute('data-id'),
        price:products[1].getAttribute('data-price'),
        thumbnail:products[1].querySelector('img').getAttribute('src'),
        title:products[1].querySelector('.product__title').innerHTML   
    };
    for(let i=0;i<left.length;i++){
        if(left[i].id===product1.id){
            product1.size=left[i].sizes[0];
            product1.color=left[i].colors[0];
            break;
        }
    }
    for(let i=0;i<right.length;i++){
        if(right[i].id===product2.id){
            product2.size=right[i].sizes[0];
            product2.color=right[i].colors[0];
            break;
        }
    }
    addToShoppingBag(product1);
    addToShoppingBag(product2);
}