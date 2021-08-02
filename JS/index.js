window.addEventListener('DOMContentLoaded',function(){
//start

    //visual img
    $.ajax({
        url:'./JS/data_visual.xml',
        success:function(data){

            let source,num=0;
            let timer
            $(data).find('source').each(function(i){
                $('.visual .photo').append(`<figure><img src="${ $(this).text()}"></figure>`);
                $('.slide').append(`<a href="#"><span>${i+1}</span></a>`);
            });
            $('.visual .photo figure:first').addClass('active');
            $('.slide a:first').addClass('active');



            // 비주얼 슬라이드 만들기  Q.슬라이드화면 점만들기, transition 효과 주기
            //autoslide
            function autoSlide(){
                timer = setInterval(fadePlay,2000,'next');
            }autoSlide();

            //play
            function fadePlay(dir){
                $('.visual figure').eq(num).fadeOut();
                update(dir);
                $('.visual figure').eq(num).fadeIn();
            }
            //update
            function update(dir){
                source = $(data).find('source');
                if(dir == 'next'){
                    if( num == source.length-1){num= 0;}else{num++}
                }else if(dir == 'prev'){
                    if( num < 0){num= 3;}else{num--;}
                }else{
                    num = dir;
                }
                $('.visual .slide > a').removeClass('active');
                $('.visual .slide > a').eq(num).addClass('active')
            }

            $('.visual').on({
                mouseenter : function(){ clearInterval(timer) },
                mouseleave : function(){ autoSlide(); }
            })

            //next prev click
            $('.visual .indi >a').on('click', function(e){
                e.preventDefault();
                if( $(this).index() == 1){   //next
                    fadePlay('next');
                }else{ //pre
                    fadePlay('prev');
                }
            });

            //indi click
            $('.visual .slide > a').on('click', function(e){
                e.preventDefault();
                fadePlay($(this).index());
            });







        },   //success end
        error:function(e){
            console.log(e.status);
            console.log(e.error);
            console.log(e.responseText);
            // 200 > 정상
            // 304 > 요구한 데이터를 변경하지 않음
            // 404 > 페이지 경로가 잘못되었을때
            // 503 > 서비 종류 중,  서버사용량이 많음            
        }

    
    
    }); //visual img end



    //지역별 best4 만들기
    $.ajax({
        url:'./JS/data_map.xml',
        success:function(data){

            //map
            let tit,detail1,detail2,pic,cap,cl,c,mapList='',tagList='',selectList='';
            let num=0;
            let color=[ '#56ade2','#e5a49e','#69c071','#fdce4a','#bc95c4','#44c2bc' ];

            //slide
            let address,photo,name,slideList='';

            //map - default
            dataChange(0); 
            $('.map >svg >g>g').eq(0).addClass('active');
            
            //map - click event
            $('.map >svg >g>g').on('click',function(e){

                $('.local .map_info').html('');
                mapList = '';
                num = $(this).index();
                dataChange(num);


            }); //click

            //mobile -menu select 만들기
            for(let i=0; i<$(data).find('local').length; i++){

                tit = $(data).find('local').eq(i).find('tit').text();
                cl = color[i];

                selectList +=  //???????????????배경색이 안입혀지는 이유는????
                                `<li style="background: ${cl} ; border:1px solid grey">  
                                <a href="#">${tit}</a>
                                </li>`;
            }
            $('.local_select').append(selectList);

            
            //mobile menu select 하기
            $('.local_select li').on('click', function(e){
                
                e.preventDefault();
                mapList='';
                c= $(this).index();

                dataChange(c);

                $('.local_select').removeClass('active');

            });


            //map - section information
            function dataChange(a){

                //best4  내용만들기
                tit = $(data).find('local').eq(a).find('tit').text();
                detail1 = $(data).find('local').eq(a).find('detail').eq(0).text();
                detail2 = $(data).find('local').eq(a).find('detail').eq(1).text();

                //지도 active지우기
                $('.map >svg >g>g').removeClass('active');

                //사진4개 리스트만들기
                for(let j=0; j<$(data).find('local').eq(a).find('pic').length;j++){  
                    pic = $(data).find('local').eq(a).find('pic').eq(j).text();
                    cap = $(data).find('local').eq(a).find('cap').eq(j).text();
    
                    mapList +=
                            `<a href="https://www.gangwon.to/gwtour">
                                <figure>
                                    <img src="${pic}" alt="${cap}">
                                    <figcaption>${cap}</figcaption>
                                </figure>
                            </a>`;
    
                }   //for

                // best4 section 만들기
                tagList =  
                `<p>${tit}</p>
                <p>${detail1} <br>${detail2}</p>
                <div class="map_list">${mapList}</div>`;

                $('.local .map_info').html(tagList);

                // 제목색깔 바꿔주기
                $('.map_info >p:nth-of-type(1)').css('background',color[a]);  

                //지도 색깔변하게하기
                $('.map >svg >g>g').eq(num).addClass('active');


                
                //mobile menu select 열기 ????????????????????다시클릭하니까클릭이안되????
                $('.map_info > p:nth-of-type(1)').on('click', function(e){
                    if (window.matchMedia("(max-width: 1023px)").matches) {
                        e.preventDefault();
                        $('.local_select').addClass('active');
                    }

                });



            }  //function dataChange end

        },
        error:function(e){
            console.log(e.status);
            console.log(e.error);
            console.log(e.responseText);
            // 200 > 정상
            // 304 > 요구한 데이터를 변경하지 않음
            // 404 > 페이지 경로가 잘못되었을때
            // 503 > 서비 종류 중,  서버사용량이 많음            
        }
    }); //지역별 best4 만들기 end



    //sns slide
    $.ajax({
        url:'./JS/data_slide.xml',
        success:function(data){

            const elSlider = document.querySelector('.slider');
            let address,photo,name,tagList='';

            $(data).find('card').each(function(v){

                name = $(this).find('name').text();
                address = $(this).find('address').text();
                photo = $(this).find('photo').text();

                tagList += `<li><a href="${address}"><img src="${photo}" alt="${name}"></a></li>`;

            });

            elSlider.innerHTML = tagList;

            // sns 슬라이드 slick   :  index.html line 238  index.html line 738
            $(".sns .sns_slide ul").slick({
                arrows:true,
                dots: false,
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: false,
                autoplaySpeed: 2000,
        
                responsive: [
                    {
                        breakpoint: 1279,
                        settings: {
                            arrows:true,
                            dots: false,
                            infinite: true,
                            slidesToShow: 4,
                            slidesToScroll: 1,
                            autoplay: false,
                            autoplaySpeed: 2000,
                        }
                    },
                    {
                        breakpoint: 1024,
                        settings: {
                            arrows:true,
                            dots: false,
                            infinite: true,
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            autoplay: false,
                            autoplaySpeed: 2000,
                        }
                    },
                    {
                        breakpoint: 768, //768전에는 이렇게 하겠다.
                        settings: {
                            arrows:true,
                            dots: false,
                            infinite: true,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            autoplay: false,
                            autoplaySpeed: 2000,
                        }
                    },
        
                ]
            });//slick end
        
        },
        error:function(e){
            console.log(e.status);
            console.log(e.error);
            console.log(e.responseText);
            // 200 > 정상
            // 304 > 요구한 데이터를 변경하지 않음
            // 404 > 페이지 경로가 잘못되었을때
            // 503 > 서비 종류 중,  서버사용량이 많음            
        }
    }); //sns slide end











//end
})