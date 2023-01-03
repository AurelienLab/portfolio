window.history.scrollRestoration = 'manual'
document.addEventListener('DOMContentLoaded', () => {
    handleTabs()
    initMenu()

    fetch('./js/works.json')
        .then(response => {
            if(response.ok) return response.json()
        })
        .then(sites => {
            generateSitesList(sites)
            setScroll()
        })
        .catch(error => console.log({error}))

    window.onbeforeunload = function(e) {
        localStorage.setItem('scrollpos', controller.scrollPos());
    };
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

            e.currentTarget.classList.add('active')
            e.currentTarget.parentNode.classList.add('active')
            folderContent.classList.add('active')
        })
    }
}

function generateSitesList(sites) {
    for(const site of sites) {
        let keywordsHTML = ""
        for(const keyword of site.keywords) {
            keywordsHTML += `<li><a href="#">${keyword}</a></li>`
        }
        const html = `<div class="card__container">
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
}
const menuList = document.querySelectorAll('.header__menu__item')
const boxes = []
const mainTitle = document.querySelector('.header__title');
const menu = document.querySelector('.header__menu')
let mainTitleNode, menuNode;

function initMenu() {

    TweenLite.set(mainTitle, { x: 0 })
    mainTitleNode = {
        transform: mainTitle._gsTransform,
        x: mainTitle.offsetLeft,
        y: mainTitle.offsetTop,
        node: mainTitle
    }

    TweenLite.set(menu, { x: 0 })
    menuNode = {
        transform: menu._gsTransform,
        x: menu.offsetLeft,
        y: menu.offsetTop,
        node: menu
    }

    for (const menuItem of menuList) {

        // Initialize transforms on node
        TweenLite.set(menuItem, { x: 0 });

        boxes.push({
            transform: menuItem._gsTransform,
            x: menuItem.offsetLeft,
            y: menuItem.offsetTop,
            node: menuItem
        });
    }
}

function layout1() {

    document.querySelector('.header').classList.toggle("step1");

    let lastX = menuNode.x;
    let lastY = menuNode.y;

    menuNode.x = menuNode.node.offsetLeft;
    menuNode.y = menuNode.node.offsetTop;

    // Continue if box hasn't moved
    if (!(lastX === menuNode.x && lastY === menuNode.y)) {
        // Reversed delta values taking into account current transforms
        let x = menuNode.transform.x + lastX - menuNode.x;
        let y = menuNode.transform.y + lastY - menuNode.y;

        // Tween to 0 to remove the transforms
        TweenLite.fromTo(menuNode.node, 0.5, { x, y }, { x: 0, y: 0, ease:Power1.easeOut });
    }

    lastX = mainTitleNode.x;
    lastY = mainTitleNode.y;

    mainTitleNode.x = mainTitleNode.node.offsetLeft;
    mainTitleNode.y = mainTitleNode.node.offsetTop;

    // Continue if box hasn't moved
    if (!(lastX === mainTitleNode.x && lastY === mainTitleNode.y)) {
        // Reversed delta values taking into account current transforms
        let x = mainTitleNode.transform.x + lastX - mainTitleNode.x;
        let y = mainTitleNode.transform.y + lastY - mainTitleNode.y;

        // Tween to 0 to remove the transforms
        TweenLite.fromTo(mainTitleNode.node, 0.5, { x, y }, { x: 0, y: 0, ease:Power1.easeOut });
    }

    for (const box of boxes) {

        let lastX = box.x;
        let lastY = box.y;

        box.x = box.node.offsetLeft;
        box.y = box.node.offsetTop;

        // Continue if box hasn't moved
        if (lastX === box.x && lastY === box.y) continue;

        // Reversed delta values taking into account current transforms
        let x = box.transform.x + lastX - box.x;
        let y = box.transform.y + lastY - box.y;

        // Tween to 0 to remove the transforms
        TweenLite.fromTo(box.node, 0.5, { x, y }, { x: 0, y: 0, ease:Power1.easeOut });
    }
}

function layout2() {
    document.querySelector('.header').classList.toggle("step2");

    let lastX = menuNode.x;
    let lastY = menuNode.y;

    menuNode.x = menuNode.node.offsetLeft;
    menuNode.y = menuNode.node.offsetTop;

    // Continue if box hasn't moved
    if (!(lastX === menuNode.x && lastY === menuNode.y)) {
        // Reversed delta values taking into account current transforms
        let x = menuNode.transform.x + lastX - menuNode.x;
        let y = menuNode.transform.y + lastY - menuNode.y;

        // Tween to 0 to remove the transforms
        TweenLite.fromTo(menuNode.node, 0.5, { x, y }, { x: 0, y: 0, ease:Power1.easeOut });
    }

    lastX = mainTitleNode.x;
    lastY = mainTitleNode.y;

    mainTitleNode.x = mainTitleNode.node.offsetLeft;
    mainTitleNode.y = mainTitleNode.node.offsetTop;

    // Continue if box hasn't moved
    if (!(lastX === mainTitleNode.x && lastY === mainTitleNode.y)) {
        // Reversed delta values taking into account current transforms
        let x = mainTitleNode.transform.x + lastX - mainTitleNode.x;
        let y = mainTitleNode.transform.y + lastY - mainTitleNode.y;

        // Tween to 0 to remove the transforms
        TweenLite.fromTo(mainTitleNode.node, 0.5, { x, y }, { x: 0, y: 0, ease:Power1.easeOut });
    }
}

let scenes = []
// init controller
let controller = new ScrollMagic.Controller();
function setScroll(refresh) {
    if(refresh) {
        controller = new ScrollMagic.Controller();
    }

    let stick = new ScrollMagic.Scene({triggerElement: "#trigger", duration: "0"})
        .setPin(".header")
        .addIndicators()
        .addTo(controller);

    scenes.push(stick)

    let scene = new ScrollMagic.Scene({triggerElement: "#trigger", duration: "100%"})
        .triggerHook(0)
        .addIndicators()
        .addTo(controller);

    scenes.push(scene)

    let scene2 = new ScrollMagic.Scene({triggerElement: "#trigger", duration: "0", offset: "200%"})
        .addIndicators()
        .addTo(controller);

    scenes.push(scene2)

    let scene3 = new ScrollMagic.Scene({triggerElement: "#trigger", duration: "0", offset: "600%"})
        .addIndicators()
        .addTo(controller);

    scenes.push(scene3)

    scene.on('progress', function(e) {
        document.querySelector('.header').style.height = (1-e.progress) * 100 + "vh"
    })

    scene.on('enter', function(e) {
        document.querySelector('.header').style.transition = "";
    })

    scene.on('leave', function(e) {
        document.querySelector('.header').style.transition = "height 800ms ease-in-out";
        document.querySelector('.header').style.height = (1-e.progress) * 100 + "vh"
    })

    scene2.on('enter', function(e) {
        if(e.scrollDirection === "FORWARD") {
            layout1()
        }

    })
    scene2.on('leave', function(e) {
        if(e.scrollDirection === "REVERSE") {
            layout1()
        }
    })

    scene3.on('enter', function(e) {
        if(e.scrollDirection === "FORWARD") {
            layout2()
        }

    })
    scene3.on('leave', function(e) {
        if(e.scrollDirection === "REVERSE") {
            layout2()
        }
    })


    if(!refresh) {
        const sceneEnd = scene.offset() + scene.duration()
        const scrollPos = window.localStorage.getItem('scrollpos')
        if(scrollPos && (scrollPos > sceneEnd)) {
            document.querySelector('.header').style.transition = "height 800ms ease-in-out";
            document.querySelector('.header').style.height = "0";
        }
        controller.scrollTo(scrollPos)
    }
}


