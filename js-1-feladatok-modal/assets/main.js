/*Bármilyen .trigger class elem megnyitja a felugró ablakot*/
let modalTriggers = document.querySelectorAll(".trigger")
function modalTrigger(){
    for (var i = 0; i < modalTriggers.length; i++) {
        modalTriggers[i].addEventListener('click', modalOpener);
    }
};
modalTrigger();
function modalOpener(){
    document.querySelector('.container').classList.add("container--visible");
};
/*Modal bezárása*/
document.querySelector(".container").addEventListener('click', modalCloser);
document.querySelector(".fa-times").addEventListener('click', modalCloser);
document.querySelector(".btn-ok").addEventListener('click', modalCloser);
document.querySelector(".btn-cancel").addEventListener('click', modalCloser);

function modalCloser(){
    document.querySelector('.container').classList.remove("container--visible");
    
};
/* A modal akkor is bezárul, ha a felugró ablakra kattintunk, ezt a következő function meggátolja - source: https://codepen.io/nbalaguer/pen/PVbEjm */
document.querySelector(".container__modal").addEventListener('click', modalClick);
function modalClick(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
  };