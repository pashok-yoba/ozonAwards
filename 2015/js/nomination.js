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
function rotateNomination(event){
    var elementToRotate = this.getElementsByClassName('nominationItem__circle')[0];
    var numberClass  = elementToRotate.className.split(' ')[1].split('--')[1];
    var tl = new TimelineLite({paused: true});
    tl.to(elementToRotate, 0.5, {rotationY:180, ease: Power0.easeNone});
    tl.to(elementToRotate, 0, {className: '+=nominationItem__circleHover--'+numberClass}, 0.25);
    tl.play();
    if(event.stopPropagation) {
        event.stopPropagation();
    }
    else {
        event.cancelBubble = true;
    }
}
function rotateNominationOut() {
    var elements = document.getElementsByClassName('nominationItem__circle');
    for (var i = 0; i < elements.length; i++) {
        TweenLite.killTweensOf(elements[i]);
        var numberClass  = elements[i].className.split(' ')[2];
        var tl = new TimelineLite({paused: true});
        tl.to(elements[i], 0.5, {rotationY:0, ease: Power0.easeNone});
        tl.to(elements[i], 0, {className: '-='+numberClass}, 0);
        tl.play();
    }
}

function buttonActive(event) {
    TweenMax.to(this, 0.1,  {className: "+=votingButton--active", ease: Power4.easeOut});
    if(event.stopPropagation) {
        event.stopPropagation();
    }
    else {
        event.cancelBubble = true;
    }
}

function scrollTop(event) {
    var nameLink = this.getAttribute('href').split('#')[1];
    var elementToScroll = document.getElementsByName(nameLink)[0];
    var scrollPx = getOffsetRect(elementToScroll).top;
    TweenLite.to(window, 1, {scrollTo: scrollPx });
    if(event.stopPropagation) {
        event.stopPropagation();
    }
    else {
        event.cancelBubble = true;
    }
    if(event.preventDefault) event.preventDefault();
    else event.returnValue = false;
}

function scrollTopFromMain() {
    if ( window.location.href.split('?')[1] ) {
        var name = window.location.href.split('?')[1];
        console.log(name);
        var elementToScroll = document.getElementsByName(name)[0];
        var scrollPx = getOffsetRect(elementToScroll).top;
        TweenLite.to(window, 1, {scrollTo: scrollPx });
    }
}
function start() {
    var classesHtml = document.documentElement.className.split(' ');
    if (classesHtml.indexOf('mobile') == -1) {
        addEventListenerAll(document.getElementsByClassName('nominationItem'), 'mouseover',rotateNomination);
        document.getElementById('nominationSection').addEventListener('mouseover', rotateNominationOut);
    }
    addEventListenerAll(document.getElementsByClassName('votingButton'), 'mouseover',buttonActive);

    document.getElementById('nominationSection').addEventListener('mouseover', function(){
        TweenMax.to(document.getElementsByClassName('votingButton'), 0.1,  {className: "-=votingButton--active", ease: Power4.easeOut});
    });
    addEventListenerAll(document.getElementsByClassName('nominationItem__circle'), 'click',scrollTop);
}

window.onload = function() {
    scrollTopFromMain()
}