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
function animateHeaderOver(element, nameClass, time) {
    TweenMax.to(element, time, {className: "+="+nameClass});
}

function animateHeaderOut(element, nameClass, time) {
    TweenMax.to(element, time, {className: "-="+nameClass})
}

function animateSocialOver(element, time) {
    var classNameLast = element.className.split(' ')[1];
    classNameLast += 'Active'
    animateHeaderOver(element, classNameLast, time);
}

function animateSocialOut(element, time) {
    var classNameLast = element.className.split(' ')[1];
    classNameLast += 'Active'
    animateHeaderOut(element, classNameLast, time);
}


function start() {
    addEventListenerAll(document.getElementsByClassName('socialIcon'), 'mouseover', function(){
        var elem = this;
        animateSocialOver(elem, 0.15)
    });
    addEventListenerAll(document.getElementsByClassName('socialIcon'), 'mouseout', function(){
        var elem = this;
        animateSocialOut(elem, 0.15)
    });

    straggerElements(document.getElementsByClassName('bubblesList__bubble'));

}
