let filter=localStorage.getItem('filter-by');
let products=window.catalog;
if(filter!=null){
    products=products.filter(el=>el[filter.split(':')[0]]===filter.split(':')[1]);
    if(filter.split(':')[0]=="category") document.querySelector(`[data-filter_by='${filter}']`).setAttribute('data-active_filter','true');
}
else{
    //условие задания
    products=products.filter(el=>el.category==='women'&&el.fashion=="Casual style");
    document.querySelector("[data-filter_by='category:women']").setAttribute('data-active_filter','true');
}
products.sort((a,b)=>{
    return new Date(b.dateAdded) - new Date(a.dateAdded);
});
function renderProducts(){
    if(products.length > 0) return `${products.map(el =>
        `<article class="product" data-new=${el.hasNew} data-id=${el.id}>
            <a href="item.html">
                <figure class="product__img">
                    <img src=${el.thumbnail}>
                </figure>
                <h4 class="small-heading product__title">${el.title}</h4>
                ${el.discountedPrice!==null&&el.discountedPrice<el.price ? `<h5 class="price product__price">
                    <span class="price--crossed">£${el.price}</span> £${el.discountedPrice}</h5>` : 
                    `<h5 class="price product__price">£${el.price}</h5>`}
            </a>
        </article>`).join('')}`
    else return `<h2 class='heading'>Catalog for ${filter} is empty :(</h2>`
}
document.querySelector('.products__wrp').insertAdjacentHTML('beforeend',renderProducts());
let showMore =document.getElementById('showMore');
showMore.addEventListener('click',function show(e){
    e.preventDefault();
    let productsSection=document.querySelector('.products');
    productsSection.classList.remove('products--small');
});