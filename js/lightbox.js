function closeListeners() {
    const closeBtns = document.querySelectorAll(".lightbox__close__btn, .lightbox__close__btn i")
    const overlay = document.querySelector('.lightbox__container')

    for(const el of [...closeBtns, overlay]) {
        el.addEventListener('click', closeLightbox)
    }
}

function closeLightbox(e) {
    if(e.target !== this) {
        return
    }
    const lightbox = document.querySelector('.lightbox__container')
    let fadeEffect = setInterval(function () {
        if (!lightbox.style.opacity) {
            lightbox.style.opacity = 1;
        }
        if (lightbox.style.opacity > 0) {
            lightbox.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
            lightbox.remove()
        }
    }, 10)
}

function createLightbox(heading, body, footer) {
    const html = `
    <div class="lightbox__container">
        <div class="lightbox">
            <div class="lightbox__header">
                <span class="lightbox__close__btn"><i class="fa-solid fa-xmark"></i></span>
            </div>
            <div class="lightbox__body">
                <h2 class="lightbox__heading">${heading}</h2>
                <div class="lightbox__content">
                    ${body}
                </div>
            </div>
            <div class="lightbox__footer">
                <ul>
                    ${footer}
                </ul>
            </div>
        </div>
    </div>
    `

    const placeHolder = document.createElement('div')
    placeHolder.innerHTML = html
    document.body.appendChild(placeHolder.firstElementChild)
    closeListeners()

}