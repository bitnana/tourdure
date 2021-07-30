window.addEventListener('DOMContentLoaded',function(){
//start

    const elPre = document.querySelectorAll('.pre_charac, .pre_bi');
    const elBox = document.querySelectorAll('.charac, .bi');


        for(let i=0; i<elPre.length; i++){
            
            elPre[i].addEventListener('mouseover', function(){
                elBox[i].style.visibility = 'visible';
            });

            if (window.matchMedia("(min-width: 1024px)").matches) {
                    elBox[i].addEventListener('mouseleave', function(){

                            elBox[i].style.visibility = 'hidden';
                    });
            }

        }
    
    
    
    // else{ 
    //     for(let i=0; i<elPre.length; i++){
    //         elPre[i].style = 'display:none';
    //         elBox[i].style = 'display:flex';
    //     }
    // }




//end
});