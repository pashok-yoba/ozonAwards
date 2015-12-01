if (window.addEventListener) {
    window.addEventListener('DOMContentLoaded', start);
}
else {
    document.attachEvent('onreadystatechange', start);
}

function addEventListenerAll(elements, eventName, fn) {
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener(eventName, fn);
    }

}
function buttonActive(event) {
    TweenMax.to(this, 0.1,  {className: "+=aboutButton--active", ease: Power4.easeOut});
    if(event.stopPropagation) {
        event.stopPropagation();
    }
    else {
        event.cancelBubble = true;
    }
}
function animateSteps(){
    TweenMax.staggerTo(document.getElementsByClassName('aboutStep__image'), 0.3, {ease: Power4.easeOut, scale: 1, 'opacity': '1'}, 0.2);
}
function getOffsetRect(elem) {

    var box = elem.getBoundingClientRect()

    var body = document.body

    var docElem = document.documentElement

    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop

    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft

    var clientTop = docElem.clientTop || body.clientTop || 0

    var clientLeft = docElem.clientLeft || body.clientLeft || 0

    var top  = box.top +  scrollTop - clientTop

    var left = box.left + scrollLeft - clientLeft

    return { top: Math.round(top), left: Math.round(left) }

}
function start() {
    addEventListenerAll(document.getElementsByClassName('aboutButton'), 'mouseover', buttonActive);
    document.getElementById('aboutSection').addEventListener('mouseover', function(){
        TweenMax.to(document.getElementsByClassName('aboutButton--active'), 0.1,  {className: "-=aboutButton--active", ease: Power4.easeOut});
    });
    if (document.documentElement.clientHeight >= getOffsetRect(document.getElementsByClassName('aboutStep__number')[0]).top ) {
        animateSteps()
    }
    else {
        document.addEventListener('scroll', function(event){

            var body = document.body
            var docElem = document.documentElement

            var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop

            if (document.documentElement.clientHeight + scrollTop >= getOffsetRect(document.getElementsByClassName('aboutStep__number')[0]).top ) {
                animateSteps();
            }
        })
    }
}
