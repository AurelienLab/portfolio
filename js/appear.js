const elementsToAppear = document.getElementsByClassName('appear')

function display(entries, observer) {
    for (const entry of entries) {

        let ratio = entry.intersectionRatio;
        if(entry.target.id === "my-work") console.log(entry)
        if (ratio > 0) {
            entry.target.classList.add('animate')
        }
    }
}

let observer = new IntersectionObserver(display, {
    threshold: [0, 1]
});

function setObservers() {
    for(const el of elementsToAppear) {
        observer.observe(el)
    }
}