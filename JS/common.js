$(function(){

    $('header').load('inc.html header .header', toggle);
    $('footer').load('inc.html footer .footer_div');


    function toggle(){  //헤더 토글버튼은 여기에다가

            //common.css 174 line(menu) 232 line(submenu)  토글버튼
            const elTri = document.querySelector('.header .toggle');
            const elMenu = document.querySelector('.header .menu');
            const elMenuSub = document.querySelector('.header .sub_menu');
            const menuLocal = document.querySelector('.menu_local');

            elTri.addEventListener('click',function(){
                elMenu.classList.toggle('active');
                elMenuSub.classList.toggle('active');

            });

            menuLocal.addEventListener('click',function(e){  //헤더(지역별관광) > 소메뉴 클릭했을때
                location.href = e.target.href;
                location.reload();  //새로고침 >> 자바다시한번시행하려구
            });
    }
});
