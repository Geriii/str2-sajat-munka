let modalTriggers = document.querySelectorAll(".trigger")
function modalTrigger(){
    for (var i = 0; i < modalTriggers.length; i++) {
        modalTriggers[i].addEventListener('click', modalOpener);
    }
}
modalTrigger();
function modalOpener(){
    document.querySelector('.container').classList.add("container--visible");
}

document.querySelector(".container").addEventListener('click', modalCloser);
document.querySelector(".fa-times").addEventListener('click', modalCloser);
document.querySelector(".btn-ok").addEventListener('click', modalCloser);
document.querySelector(".btn-cancel").addEventListener('click', modalCloser);

function modalCloser(){
    document.querySelector('.container').classList.remove("container--visible");
}