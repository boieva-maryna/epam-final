var search=document.querySelector('[for="search"]');
var input=document.getElementById('search');
var menu=document.querySelector('.header__menu');
var drop=document.getElementById('drop');
var searchForm=document.getElementById('search__form');
drop.addEventListener('click',function(e){
    e.preventDefault();
    menu.classList.toggle('header__menu--drop');
    drop.children[0].classList.toggle('dropdown__icon--close');
});
menu.addEventListener('click',function(e){
    if(e.target==search) search.classList.toggle('header__search--active');
    if(e.target.getAttribute('href')==='catalog.html'){
        localStorage.setItem('filter-by',e.target.getAttribute('data-filter_by'));
    }
});
searchForm.addEventListener('submit',function(e){
    e.preventDefault();
    if(input.value!="") localStorage.setItem('filter-by','fashion:'+input.value);
    window.location.href="catalog.html";
})