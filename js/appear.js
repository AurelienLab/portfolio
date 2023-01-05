const elementsToAppear = document.getElementsByClassName('appear')

function inView(element) {
    // get window height
    const windowHeight = window.innerHeight;
    // get number of pixels that the document is scrolled
    const scrollY = window.scrollY;

    // get current scroll position (distance from the top of the page to the bottom of the current viewport)
    const scrollPosition = scrollY + windowHeight;
    // get element position (distance from the top of the page to the bottom of the element)
    const elementPosition = element.getBoundingClientRect().top + element.clientHeight;

    // is scroll position greater than element position? (is element in view?)
    return scrollPosition > elementPosition;
}

// animate element when it is in view
function startAppeareance() {

    for(const el of elementsToAppear) {
        if(animate) {
            if(inView(el)) {
                el.classList.add('animate')
            }
        }
        else {
            el.classList.add('animate')
        }

    }
}