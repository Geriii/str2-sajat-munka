document.querySelectorAll('.trigger').addEventListener('click', modalOpener);
function modalOpener(){
    document.querySelector('.container').style.display = "block";
}
modalOpener()