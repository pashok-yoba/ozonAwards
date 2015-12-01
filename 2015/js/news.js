/**
 * Created by pshcherbakov on 17.09.15.
 */

if (window.addEventListener) {
    window.addEventListener('DOMContentLoaded', start);
}
else {
    document.attachEvent('onreadystatechange', start);
}
function start() {
    document.getElementsByClassName('newsButton')[0].addEventListener('mouseover', function(event){
        TweenMax.to(this, 0.2, {className: "+=newsButtonActive", ease: Power4.easeOut});
        if(event.stopPropagation) {
            event.stopPropagation();
        }
        else {
            event.cancelBubble = true;
        }
    });
    document.getElementById('newsSection').addEventListener('mouseover', function(){
       TweenMax.to('.newsButton', 0.1, {className: "-=newsButtonActive", ease: Power4.easeOut});
    })
}
