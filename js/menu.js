var search=document.querySelector('[for="search"]');
        var input=document.getElementById('search');
        var menu=document.querySelector('.header__menu');
        var drop=document.getElementById('drop');
        search.onclick=function(e){
            search.classList.add('header__search--active');
        }
        input.onblur=function(){
            search.classList.remove('header__search--active');
        }
        drop.onclick=function(e){
            e.preventDefault();
            menu.classList.toggle('header__menu--drop');
            drop.children[0].classList.toggle('dropdown__icon--close');
        }