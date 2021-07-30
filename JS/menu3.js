//menu3.js
function init(){

    fetch('JS/data_journal.json')
    .then( res => res.json() )
    .then( data=>callback(data) );

    function callback(data){

        let name,pic,tagList='';
        const elJournal = document.querySelector('.jour_list');


        data.journal.forEach(function(v,k){

            tit = v.name;
            pic = v.pic;

            tagList += 
                        `<figure>
                            <a href="#"><img src="${pic}" alt="${tit}"></a>
                            <figcaption>${tit}</figcaption>
                        </figure>`;
        });
        
        elJournal.innerHTML = tagList;






    }


}//init end

window.onload = init;