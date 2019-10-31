var filter=document.getElementById('filter');
filter.addEventListener('change',checkOption,false);
filter.addEventListener('click',function(e){
    filter.classList.toggle('filter--drop');
})
function checkOption(e){
    var bar=document.getElementById(e.target.name);
    var checked=document.getElementById(`${e.target.name}__checked`);
    if(e.target.value!="Not selected") {
        bar.classList.add('filter__category--checked');
        checked.innerHTML=e.target.value;
    }else{
        bar.classList.remove('filter__category--checked');
        checked.innerHTML=bar.getAttribute('data-category');
    }
}