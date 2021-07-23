window.addEventListener('DOMContentLoaded',function(){
//start



    // sns 슬라이드 index.html line 238  index.html line 738


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

    



//end
})