let darkmode = window.localStorage.getItem('darkmode') === "true"
const darkmodeButtons = document.getElementsByClassName('darkmode-toggle')
const workTypes = ['courses', 'freelance']

document.addEventListener('DOMContentLoaded', () => {
    if(darkmode) {
        document.getElementsByTagName('body')[0].classList.add('dark')
        for(const button of darkmodeButtons) {
            button.innerHTML = '<a href=""><i class="fa-solid fa-sun"></i></a>'
        }
    }
    initMenu()

    getData()
        .then(() => {
            insertAboutMe(aboutMe)
            generateSitesList(sites)
            generateTabs(categories)
        })
        .catch(error => console.log(error))

    initHeader()
    startAppeareance()

    window.onbeforeunload = () => window.sessionStorage.setItem('scrollpos', window.scrollY)
})
function insertAboutMe(page) {
    document.getElementById('about-me__title').innerText = page.title.rendered
    document.getElementById('about-me__content').innerHTML = page.content.rendered
}
function generateTabs(categories) {
    const container = document.querySelector('.folder__tab-list')
    let i = 0;
    for(const cat of categories) {
        const active = i === 0 ? "active" : '';
        const tabHtml = `<li class="folder__tab__container"><h3 class="folder__tab folder__tab--${cat.slug} ${active}" data-type=${cat.id} data-typeslug="${cat.slug}">${cat.name}</h3></li>`
        const placeholder = document.createElement('div')
        placeholder.innerHTML = tabHtml
        container.appendChild(placeholder.firstChild)
        i++;
    }

    handleTabs()
}

function handleTabs() {
    const tabs = document.querySelectorAll('.folder__tab')

    for(const tab of tabs) {
        tab.addEventListener('click', (e) => {
            const type = parseInt(e.currentTarget.dataset.type)
            for(const tab of tabs) {
                tab.classList.remove('active')
                tab.parentNode.classList.remove('active')
            }
            generateSitesList(filtrerSites(sites, type))
            e.currentTarget.classList.add('active')
            e.currentTarget.parentNode.classList.add('active')
            const container = document.getElementById('myWork-container')
            container.classList.remove(...categoriesSlug)
            container.classList.add(e.currentTarget.dataset.typeslug)

            handleSiteAppear()
        })
    }
}

function removeInitialClass(e) {
    e.currentTarget.classList.remove('initial')
    e.currentTarget.removeEventListener('mouseenter', removeInitialClass, true)
}

function handleSiteAppear() {
    const cards = document.getElementsByClassName('card__container')
    for(const card of cards) {
        card.addEventListener('mouseenter', removeInitialClass)
    }
}

const filtrerSites = (sites, type = null) => {
    return sites.filter(site => site.categories.includes(type))
}

function generateSitesList(sites) {
    const grid = document.getElementById('myWork-elements')
    grid.innerHTML = ""
    for(const site of sites) {
        let keywordsHTML = ""
        for(const keyword of site.tagList) {
            keywordsHTML += `<li><a href="#">${keyword}</a></li>`
        }
        const html = `<div class="card__container initial">
                    <div class="card">
                        <div class="card__front">
                            <img src="${site.imageUrl}" alt="${site.altText}">
                            <div class="front__title front__title--${categories.find(cat => site.categories.includes(cat.id) && cat.slug !== "all").slug}">
                                <div class="shape"></div>
                                <h4>${site.title.rendered}</h4>
                            </div>
                        </div>
                        <div class="card__back">
                            <h4>${site.title.rendered}</h4>
                            ${site.content.rendered}
                            <div class="card__back__icons">
                                <a href="${site.url}"><i class="fa-solid fa-link"></i></a>
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

        grid.appendChild(cardNode.cloneNode(true))
    }

    adjustSitesContainer()

    handleSiteAppear()
}

const adjustSitesContainer = () => {
    const grid = document.getElementById('myWork-elements')

    //Ajustement de la hauteur en fonction du contenu
    const gridHeight = grid.clientHeight
    const container = document.getElementById("myWork-container")
    const containerPaddingTop = grid.offsetTop
    container.style.height = gridHeight + (2*containerPaddingTop) + "px"
}

const toggleDarkMode = (e) => {
    e.preventDefault()
    let buttonIconHTML;
    if(darkmode) {
        document.getElementsByTagName('body')[0].classList.remove('dark')
        buttonIconHTML = '<a href="#"><i class="fa-solid fa-moon"></i></a>'
    }
    else {
        document.getElementsByTagName('body')[0].classList.add('dark')
        buttonIconHTML = '<a href="#"><i class="fa-solid fa-sun"></i></a>'
    }

    darkmode = !darkmode
    for(const button of darkmodeButtons) {
        button.innerHTML = buttonIconHTML
    }
    window.localStorage.setItem('darkmode', darkmode)
}

const toggleBurger = (e) => {
    e.preventDefault()
    document.querySelector('.burger__container').classList.toggle('active')
}
for(const button of darkmodeButtons) {
    button.addEventListener('click', toggleDarkMode)
}

document.getElementById('burger-button').addEventListener('click', toggleBurger)
const burgerMenuItems = document.querySelectorAll('.burger__container .header__menu__item:not(.darkmode-toggle)')
for(const burgerMenuItem of burgerMenuItems) {
    burgerMenuItem.addEventListener('click', (e) => {
        document.querySelector('.burger__container').classList.remove('active')
    })
}


