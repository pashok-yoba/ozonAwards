if(mobilecheck()) {
    document.getElementsByTagName('html')[0].className += ' mobile';
}
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

function straggerElements(elements) {
    TweenMax.staggerFrom(elements, 0.2, {y: '50px', 'opacity': '0'}, 0.1);
}
function deleteClass(element, className) {
    var classes = element.className.split(' ');
    classes.splice(classes.indexOf(className));
    element.className = '';
    for (var i  = 0; i < classes.length; i ++) {
        element.className += classes[i]+' ';
    }
}

function start() {
    document.getElementsByClassName('headerMenu__item--voting')[0].addEventListener('mouseover', function(){
        var element = this;
        animateHeaderOver(element, 'headerMenu__item--votingActive', 0.3);
    });
    document.getElementsByClassName('headerMenu__item--voting')[0].addEventListener('mouseout', function(){
        var element = this;
        animateHeaderOut(element, 'headerMenu__item--votingActive', 0.3);
    });


    addEventListenerAll(document.getElementsByClassName('socialIcon'), 'mouseover', function(){
        var elem = this;
        animateSocialOver(elem, 0.15)
    });
    addEventListenerAll(document.getElementsByClassName('socialIcon'), 'mouseout', function(){
        var elem = this;
        animateSocialOut(elem, 0.15)
    });

    straggerElements(document.getElementsByClassName('bubblesList__bubble'));


    if (document.documentElement.className.split(' ').indexOf('mobile') != -1) {
        document.getElementsByClassName('headerSocial')[0].addEventListener('click', function(event){
            event.preventDefault();
            event.stopPropagation();
            this.className += ' headerSocial-active'
        });
        document.getElementsByClassName('headerSocial__close')[0].addEventListener('click', function(){
            var listSocial = document.getElementsByClassName('headerSocial')[0];
            deleteClass(listSocial, 'headerSocial-active');
            event.preventDefault();
            event.stopPropagation();
        })
    }
}

