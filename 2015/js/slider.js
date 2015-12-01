function Slider(list, container) {
    var widthContainer = container.offsetWidth;
    list.style.height = '0';
    list.style.overflow = 'hidden';
    var elements = list.querySelectorAll('li');
    container.style.height = elements[0].offsetHeight+10 + 'px';
    var activeList, leftList, rightList, leftArrow, rightArrow;

    function addAdditionAttr() {
        for (var i = 0; i < elements.length; i++) {
            elements[i].setAttribute('data-number',''+i);
        }
    }
    function addElementsToListRight(list ,positionStart) {

        var sumWidth = 0;
        var flag = true;
        while (flag) {
            if (sumWidth + elements[positionStart].offsetWidth > widthContainer) {
                flag = false
            }
            else {
                sumWidth += elements[positionStart].offsetWidth;
                var clone = elements[positionStart].cloneNode(true);
                list.appendChild(clone);
                list.innerHTML += '\n';
                if (positionStart == elements.length - 1) {
                    positionStart = 0;
                }
                else {
                    positionStart++
                }
            }
        }
    }
    function addElementsToListLeft(list ,positionStart) {
        var sumWidth = 0;
        var flag = true;
        while (flag) {
            if (sumWidth + elements[positionStart].offsetWidth > widthContainer) {
                flag = false
            }
            else {
                sumWidth += elements[positionStart].clientWidth;
                var clone = elements[positionStart].cloneNode(true);
                list.insertBefore(clone, list.firstChild);
                list.innerHTML =  '\n' + list.innerHTML;
                if (positionStart == 0) {
                    positionStart = elements.length - 1;
                }
                else {
                    positionStart--
                }
            }
        }
    }
    function createLists() {
        activeList = document.createElement('ul');
        activeList.setAttribute('class', 'activeList');
        leftList = document.createElement('ul');
        leftList.setAttribute('class', 'leftList');
        rightList = document.createElement('ul');
        rightList.setAttribute('class', 'rightList');
    }
    function createArrows() {
        leftArrow = document.createElement('div');
        leftArrow.setAttribute('class', 'arrowLeft');
        rightArrow = document.createElement('div');
        rightArrow.setAttribute('class', 'arrowRight');
        container.parentElement.appendChild(leftArrow);
        container.parentElement.appendChild(rightArrow);
        if (document.addEventListener ) {
            leftArrow.addEventListener('click', right);
            rightArrow.addEventListener('click', left);
        }
    }
    function init() {
        addAdditionAttr();
        createLists();
        addElementsToListRight(activeList, 0);
        addElementsToListLeft(leftList, elements.length-1);
        var lastIndex = activeList.getElementsByTagName('li').length-1;
        var lastDataAttribute = +activeList.getElementsByTagName('li')[lastIndex].getAttribute('data-number') + 1;
        addElementsToListRight(rightList, lastDataAttribute);
        container.appendChild(activeList);
        container.appendChild(leftList);
        container.appendChild(rightList);
        createArrows();
    }
    function resize() {
        activeList.innerHTML ='';
        leftList.innerHTML ='';
        rightList.innerHTML ='';
        addElementsToListRight(activeList, 0);
        addElementsToListLeft(leftList, elements.length-1);
        var lastIndex = activeList.getElementsByTagName('li').length-1;
        var lastDataAttribute = +activeList.getElementsByTagName('li')[lastIndex].getAttribute('data-number') + 1;
        addElementsToListRight(rightList, lastDataAttribute);
    }

    function left(time) {
        leftArrow.removeEventListener('click', right);
        rightArrow.removeEventListener('click', left);
        time = 0.5;
        var tl = new TimelineLite({paused: true});
        tl.to(activeList, time, {className: 'leftList'});
        tl.to(rightList,time, {className: 'activeList'}, 0);
        tl.to(leftList, 0, {className: 'rightList', onComplete: function(){
            activeList = container.getElementsByClassName('activeList')[0];
            leftList = container.getElementsByClassName('leftList')[0];
            rightList = container.getElementsByClassName('rightList')[0];
            rightList.innerHTML = '';
            var lastIndex = activeList.getElementsByTagName('li').length-1;
            var lastDataAttribute = +activeList.getElementsByTagName('li')[lastIndex].getAttribute('data-number') + 1;
            if ( lastDataAttribute == elements.length) {
                lastDataAttribute = 0;
            }
            addElementsToListRight(rightList, lastDataAttribute);
            leftArrow.addEventListener('click', right);
            rightArrow.addEventListener('click', left);
        }});
        tl.play();


    }
    function right(time) {
        leftArrow.removeEventListener('click', right);
        rightArrow.removeEventListener('click', left);
        time = 0.5;
        var tl = new TimelineLite({paused: true});
        tl.to(activeList, time, {className: 'rightList'});
        tl.to(leftList,time, {className: 'activeList'}, 0);
        tl.to(rightList, 0, {className: 'leftList', onComplete: function(){
            activeList = container.getElementsByClassName('activeList')[0];
            leftList = container.getElementsByClassName('leftList')[0];
            rightList = container.getElementsByClassName('rightList')[0];
            leftList.innerHTML = '';
            /* исправить */
            var lastDataAttribute = +activeList.getElementsByTagName('li')[0].getAttribute('data-number') - 1;
            if ( lastDataAttribute == -1) {
                lastDataAttribute = elements.length-1;
            }
            addElementsToListLeft(leftList, lastDataAttribute);
            leftArrow.addEventListener('click', right);
            rightArrow.addEventListener('click', left);
        }});
        tl.play();


    }
    init();

    window.addEventListener('resize', resize, true);

}


