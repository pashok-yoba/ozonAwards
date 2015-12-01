if (window.addEventListener) {
    window.addEventListener('DOMContentLoaded', start);
}
else {
    document.attachEvent('onreadystatechange', start);
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

function scrollTop() {
    if (window.location.href.split('?')[1] == 'voting') {
        var elementToScroll = document.getElementsByClassName('voating')[0];
        var scrollPx = getOffsetRect(elementToScroll).top;
        TweenLite.to(window, 1, {scrollTo: scrollPx });
    }
    if ( window.location.href.split('#')[1] ) {
        var name = window.location.href.split('#')[1];
        var elementToScroll = document.getElementsByClassName(name)[0];
        var scrollPx = getOffsetRect(elementToScroll).top;
        TweenLite.to(window, 1, {scrollTo: scrollPx });
    }
}

function start() {
    if (document.addEventListener) {
        document.getElementById('mainTop').addEventListener('mouseover', function(){
            TweenMax.to(document.getElementsByClassName('votingButton'), 0.1,  {className: "-=votingButton--active", ease: Power4.easeOut});
        });
        document.getElementsByClassName('bloggerLink')[0].addEventListener('click', function(){
            var scrollPx = getOffsetRect(document.getElementsByClassName('bloggerScroll')[0]).top;
            TweenLite.to(window, 1, {scrollTo: scrollPx });
        })
    }
    if ((document.documentElement.className.split(' ').indexOf('mobile') == -1) | (document.documentElement.clientWidth > 667)) {
        var slider = new Slider(document.getElementsByClassName('mainSlider--art')[0], document.getElementsByClassName('sliderArt')[0]);

        var slider1 = new Slider(document.getElementsByClassName('mainSlider--non')[0], document.getElementsByClassName('sliderNon')[0]);

        var slider2 = new Slider(document.getElementsByClassName('mainSlider--child')[0], document.getElementsByClassName('sliderChild')[0]);

        var slider2 = new Slider(document.getElementsByClassName('mainSlider--bis')[0], document.getElementsByClassName('sliderBis')[0]);
    }
}
window.onload = function(){
    scrollTop();
}

