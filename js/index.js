let darkmode = window.localStorage.getItem('darkmode') === "true"
document.addEventListener('DOMContentLoaded', () => {
    if(darkmode) {
        document.getElementsByTagName('body')[0].classList.add('dark')
        document.getElementById('darkmode').innerHTML = "<i class=\"fa-solid fa-sun\"></i>"
    }

    handleTabs()
    initMenu()

    generateSitesList(sites)
    initHeader()
    // fetch('./js/works.json')
    //     .then(response => {
    //         if(response.ok) return response.json()
    //     })
    //     .then(sites => {
    //         generateSitesList(sites)
    //         initHeader()
    //     })
    //     .catch(error => console.log({error}))

    window.onbeforeunload = () => window.localStorage.setItem('scrollpos', window.scrollY)
})

function handleTabs() {
    const tabs = document.querySelectorAll('.folder__tab')

    for(const tab of tabs) {
        tab.addEventListener('click', (e) => {
            const target = e.currentTarget.dataset.target
            const folderContent = document.querySelector(target)

            for(const tab of tabs) {
                tab.classList.remove('active')
                tab.parentNode.classList.remove('active')
                document.querySelector(tab.dataset.target).classList.remove('active')
            }

            const cards = folderContent.querySelectorAll('.card__container')
            for(const card of cards) {
                card.classList.add('initial')
            }

            e.currentTarget.classList.add('active')
            e.currentTarget.parentNode.classList.add('active')
            folderContent.classList.add('active')

            handleAppear()
        })
    }
}

function removeInitialClass(e) {
    e.currentTarget.classList.remove('initial')
    e.currentTarget.removeEventListener('mouseenter', removeInitialClass, true)
}

function handleAppear() {
    const cards = document.getElementsByClassName('card__container')
    for(const card of cards) {
        card.addEventListener('mouseenter', removeInitialClass)
    }
}

function generateSitesList(sites) {
    for(const site of sites) {
        let keywordsHTML = ""
        for(const keyword of site.keywords) {
            keywordsHTML += `<li><a href="#">${keyword}</a></li>`
        }
        const html = `<div class="card__container initial">
                    <div class="card">
                        <div class="card__front">
                            <img src="${site.imageUrl}">
                            <div class="front__title">
                                <div class="shape"></div>
                                <h4>${site.name}</h4>
                            </div>
                        </div>
                        <div class="card__back">
                            <h4>${site.name}</h4>
                            <p>${site.description}</p>
                            <div class="card__back__icons">
                                <a href="#"><i class="fa-solid fa-link"></i></a>
                                <a href="#"><i class="fa-solid fa-calendar-days"></i></a>
                            </div>
                            <ul class="card__back__keywords">
                                ${keywordsHTML}
                            </ul>
                        </div>
                    </div>
                    <div class="card__shadow"></div>
                </div>`

        const placeholder = document.createElement('div')
        placeholder.innerHTML = html
        const cardNode = placeholder.firstChild

        switch(site.type) {
            case 1:
                cardNode.querySelector('.front__title').classList.add('front__title--courses')
                document.getElementById('myWork-courses').appendChild(cardNode.cloneNode(true))
                break;
            case 2:
                cardNode.querySelector('.front__title').classList.add('front__title--freelance')
                document.getElementById('myWork-freelance').appendChild(cardNode.cloneNode(true))
                break;
        }

        document.getElementById('myWork-all').appendChild(cardNode.cloneNode(true))
    }
    handleAppear()
}

document.getElementById('darkmode').addEventListener('click', (e) => {
    e.preventDefault()
    if(darkmode) {
        document.getElementsByTagName('body')[0].classList.remove('dark')
        e.currentTarget.innerHTML = "<i class=\"fa-solid fa-moon\"></i>"
    }
    else {
        document.getElementsByTagName('body')[0].classList.add('dark')
        e.currentTarget.innerHTML = "<i class=\"fa-solid fa-sun\"></i>"
    }

    darkmode = !darkmode
    window.localStorage.setItem('darkmode', darkmode)
})
