window.addEventListener('DOMContentLoaded',function(){
//start

    //common.css 174 line(menu) 232 line(submenu)
    const elTri = document.querySelector('.header .toggle');
    const elMenu = document.querySelector('.header .menu');
    const elMenuSub = document.querySelector('.header .sub_menu');

    elTri.addEventListener('click',function(){
        elMenu.classList.toggle('active');
        elMenuSub.classList.toggle('active');

    });

    // sns 슬라이드 index.html line 238  index.html line 738
    const elSnsPre = document.querySelector('.sns .indi a:first-child');
    const elSnsNex = document.querySelector('.sns .indi a:last-child');
    const elSnsIndi = document.querySelectorAll('.sns .indi a') // indigator
    const elSnsUl = document.querySelector('.sns .sns_slide ul');
    const elImg = document.querySelectorAll('.sns .sns_slide ul img');


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
    });

//end
})