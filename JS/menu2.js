//menu2.js
function init(){

    fetch('JS/data_local.json')
    .then( res=> res.json() )
    .then( data=>callback(data) );

    function callback(data){
        let url = location.hash.substr(1);   //????????????????????????사이트명은 어디서 어떻게 지어지는거지???
        
        console.log(url);
        let name,cate,pic,color,tagList='', item=9, endNum = item;

        const elUl = document.querySelector('.items_1_1 > ul');
        const elHeadLocal = document.querySelectorAll('.header .menu_local li'); //헤더 지역별
        const elMainMenu = document.querySelectorAll('.menu_div ul:first-child li'); //지역별
        const elSubMenu = document.querySelectorAll('.menu_div ul:last-child li');   //전체관광체험음식
        const elMore = document.querySelector('.more a');//더보기



        // default  list
        let dataArr = [], type="전체";
        function list(){
            let dataArr = [];
            tagList = '';
            
            data[url].forEach(function(v,k){

                if(type == v.cate || type == '전체'){
                    name = v.name;
                    cate = v.cate;
                    pic = v.pic;

                    //카테고리별로 색깔주기 - 관광체험음식
                    switch (cate){
                        case '관광' : color = '#CF9915';break;
                        case '체험' : color = '#003F4F';break;
                        case '음식' : color = '#82230D';break;
                    }
                    dataArr.push( 
                                `<li>
                                    <a href="https://tourdure.mcst.go.kr/home/homeIndex.do">
                                        <figure>
                                            <img src="${pic}" alt="${name}">
                                            <figcaption>${name}</figcaption>
                                        </figure>
                                        <p style="background: ${color}">${cate}</p>
                                    </a>
                                </li>`);
                }


            }); //foreach end
            dataArr.forEach(function(v,k){
                if(k<endNum) tagList += v;
            });
            elUl.innerHTML = tagList;

        } list('전체');

        elMore.addEventListener('click',function(e){
            e.preventDefault();
            endNum += item;
            list(type);
        });
        

        //지역별 사이트이동
        for(let i=0;i<elMainMenu.length;i++){   //클릭한 메뉴(지역별이름)에 active + 클릭하면 내용바뀌기 for문
            if(elMainMenu[i].children[0].href.match(url)){     // ☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆공부할거
                elMainMenu[i].children[0].classList.add('active');
                elHeadLocal[i].children[0].classList.add('active');

                //mobile 헤더메뉴 지역명 선택시
                if (window.matchMedia("(max-width: 1023px)").matches) {
                    $(elMainMenu).css('display', 'none');
                    elMainMenu[i].style = 'display : block';      

                }


            }   //?active되어있는건 어떻게 없어지는거지 : 새로고침
            
            // 클릭하면 내용바뀌기
            elMainMenu[i].addEventListener('click', function(e){    
                if (window.matchMedia("(min-width: 1024px)").matches) {
                    location.href = e.target.href;
                    location.reload(); //새로고침
                }

            });        
        } //for end

        let elList = document.querySelectorAll('.items_1_1 > ul >li');  // item list
        let elCate = document.querySelectorAll('.items_1_1 > ul >li p'); //체험관광음식전체
        


        //elSubMenu 클릭이벤트
        
        for(let b=0; b<elSubMenu.length; b++){
            
            elSubMenu[b].addEventListener('click',function(e){
                    dataArr = [];
                    endNum = 9;
                    e.preventDefault();   //href 기능

                    $(elSubMenu).find('a').removeClass('active');
                    $(this).find('a').addClass('active');
                    type = elSubMenu[b].textContent;
                    list();

            });//submenu click event
            
        }

 
        //mobile menu select
        const elSelectMain = document.querySelector('.select_main');  //모바일 지역선택
        const elSelectSub = document.querySelector('.select_sub');   //모바일관광체험 선택

        //mobile mainmenu select 지역별
        for(let l=0; l<elMainMenu.length;l++){

           //mobile select 창으로 넘어가기 :지역명
           elMainMenu[l].addEventListener('click',function(e){
                if (window.matchMedia("(max-width: 1023px)").matches) {
                    e.preventDefault();
                    elSelectMain.classList.add('active');
                }
            });

            //mobile select 에서 선택하기  : 지역명
            elSelectMain.children[l].addEventListener('click', function(){

                if (window.matchMedia("(max-width: 1023px)").matches) {

                    $(elMainMenu).css('display', 'none');  //원래 서브메뉴  모두  display none
                    $(elMainMenu).find('a').removeClass('active');  //원래 서브메뉴 active제거
                    elMainMenu[l].children[0].classList.add('active');  //석택한 서브메뉴 active 추가
                    elMainMenu[l].style =  'display:block';  //선택한 서브메뉴 display block 추가
                    elSelectMain.classList.remove('active'); //팝업 서브메뉴  active 제거

                    list();
                }
            }); 

        }
        
        //mobile submenu select 체험 관광 선택
        for(let l=0; l<elSubMenu.length; l++){
 
            //mobile select창으로 넘어가기 : 관광체험음식
            elSubMenu[l].addEventListener('click', function(e){
                e.preventDefault();
                elSelectSub.classList.add('active');
            }); 

            //mobile select 에서 선택하기  : 관광체험음식
            elSelectSub.children[l].addEventListener('click', function(){

                $(elSubMenu).css('display', 'none');  //원래 서브메뉴  모두  display none
                $(elSubMenu).find('a').removeClass('active');  //원래 서브메뉴 active제거
                elSubMenu[l].children[0].classList.add('active');  //석택한 서브메뉴 active 추가
                elSubMenu[l].style =  'display:block';  //선택한 서브메뉴 display block 추가
                elSelectSub.classList.remove('active'); //팝업 서브메뉴  active 제거

                if(l != 0){ //관광 체험 음식

                    tagList='';
                    data[url].forEach(function(v,k){

                        if(k < endNum && elSubMenu[l].textContent == v.cate){
                            name = v.name;
                            cate = v.cate;
                            pic = v.pic;
        
                            //카테고리별로 색깔주기 - 관광체험음식
                            switch (cate){
                                case '관광' : color = '#CF9915';break;
                                case '체험' : color = '#003F4F';break;
                                case '음식' : color = '#82230D';break;
                            }
                            tagList += 
                                        `<li>
                                            <a href="#">
                                                <figure>
                                                    <img src="${pic}" alt="${name}">
                                                    <figcaption>${name}</figcaption>
                                                </figure>
                                                <p style="background: ${color}">${cate}</p>
                                            </a>
                                        </li>`;
                        }
        
        
                    }); //foreach end
        
                    elUl.innerHTML = tagList;
                }else{ list(); }
        
                    

            }); //mobile SubMenu click  end 
        }






    } //callback end






}//init end

window.onload = init;