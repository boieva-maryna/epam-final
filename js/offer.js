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
createSlides(left,slider_wrp[0],0);
createSlides(right,slider_wrp[1],1);
countPrice();
sliders[0].addEventListener('click',function(e){
    e.preventDefault();
    if(e.target.className=="up"||e.target.className=="down"){
        clickSlide(e,slider_wrp[0],0);
    }
    countPrice();
},false)

sliders[1].addEventListener('click',function(e){
    e.preventDefault();
    if(e.target.className=="up"||e.target.className=="down"){
        clickSlide(e,slider_wrp[1],1);
    }
    countPrice();
},false);

function createSlides(arr,parent,num){
    for(var i=0;i<arr.length;i++){
        var slide=document.createElement('article');
        slide.setAttribute('data-price',arr[i].price);
        slide.setAttribute('data-slider',num);
        slide.className="product";
        slide.innerHTML='<figure class="product__img">\
                <img src='+arr[i].thumbnail+'>\
            </figure>\
            <h4 class="small-heading product__title">'+arr[i].title+'</h4>\
            <h5 class="price product__price">£'+ arr[i].price+'</h5>';
        if(i!=0) slide.style.display="none"; 
        else slide.setAttribute('data-active',true);
        parent.appendChild(slide);
    }
}
function clickSlide(e,slider,num){
    var curr=document.querySelector('[data-active="true"][data-slider="'+num+'"]');
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
    document.getElementById('oldPrice').innerHTML='£'+price;
    document.getElementById('newPrice').innerHTML='£'+(price-window.bestOffer.discount);
}