//menu2.js
function init(){

    fetch('JS/data_local.json')
    .then( res=> res.json() )
    .then( data=>callback(data) );

    function callback(data){
        let url = location.hash.substr(1);   //????????????????????????사이트명은 어디서 어떻게 지어지는거지???
        
        
        
        let name,cate,pic,tagList='';

        const elUl = document.querySelector('.items_1_1 > ul');
        const elHeadLocal = document.querySelectorAll('.header .menu_local li');
        const elMainMenu = document.querySelectorAll('.menu_div ul:first-child li');
        const elSubMenu = document.querySelectorAll('.menu_div ul:last-child li');


        data[url].forEach(function(v,k){

            name = v.name;
            cate = v.cate;
            pic = v.pic;

            tagList += 
                        `<li>
                            <a href="#">
                                <figure>
                                    <img src="${pic}" alt="${name}">
                                    <figcaption>${name}</figcaption>
                                </figure>
                                <p>${cate}</p>
                            </a>
                        </li>`;

        });

        elUl.innerHTML = tagList;

        
        console.log(elHeadLocal);
        for(let i=0;i<elMainMenu.length;i++){   //클릭한 메뉴(지역별이름)에 active + 클릭하면 내용바뀌기 for문
            if(elMainMenu[i].children[0].href.match(url)){     // ☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆공부할거  선택메뉴 active
                elMainMenu[i].children[0].classList.add('active');
                elHeadLocal[i].children[0].classList.add('active');
                console.log(elHeadLocal[i].children[0].innerText);
            }   //????????????????????????????active되어있는건 어떻게 없어지는거지???
            

            elMainMenu[i].addEventListener('click', function(e){    // 클릭하면 내용바뀌기
                location.href = e.target.href;
                location.reload();
            });        
        }

        let elList = document.querySelectorAll('.items_1_1 > ul >li');
        let elCate = document.querySelectorAll('.items_1_1 > ul >li p');

        
        for(let i=0; i<elCate.length; i++){
            if(elCate[i].innerText == '음식'){
                elCate[i].style = 'background:#82230D';
            }else if(elCate[i].innerText == '체험'){
                elCate[i].style = 'background:#003F4F';
            }else{
                elCate[i].style = 'background:#CF9915';
            }

        }//for


        for(let k=0; k<elSubMenu.length; k++){ //서브메뉴 전부 클릭이벤트 주기
            
            elSubMenu[k].addEventListener('click',function(e){

                    e.preventDefault();   //href 기능

                    $(elSubMenu).find('a').removeClass('active');   //메뉴선택
                    $(elSubMenu).eq(k).find('a').addClass('active');

                    if(k==0){
                        dataLocal_2();
                    }else{ dataSelect(k); }

                    // dataSelect(k);
                
            });//submenu click event
            
        }

        function dataSelect(x){  //서브메뉴에 해당하는 리스트 뽑기

            for(let j=0; j<data.local_2.length; j++){
    
                if(elSubMenu[x].innerText != $(elList).eq(j).find('p').text()){  //sumenu랑  cate랑 일치하는가
    
                    elList[j].style = 'display:none';
    
                }else{
                    elList[j].style = 'display:block';

                }//if
    
            } //j for

        }//function dataSelect

        function dataLocal_2(){

            for(let p=0; p<elList.length; p++){
                elList[p].style = 'display:block';
            }
        }//dataLocal_2




    }






}//init end

window.onload = init;