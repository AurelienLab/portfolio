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

window.history.scrollRestoration = 'manual'
window.onscroll = () => {
    animateHeader()
    startAppeareance()
}
window.onresize = initHeader

const mainNode = document.getElementsByTagName('main')[0]
const headerNode = document.querySelector('.header')
let initialHeaderHeight = -1;
let step = 0;
let headerContentHeight = [-1,-1,-1]
let previousScroll = 0;

function initHeader() {
    initialHeaderHeight = window.innerHeight
    mainNode.style.marginTop = (initialHeaderHeight + window.scrollY*0.7) + "px"

    let scrollPos = localStorage.getItem('scrollpos')
    if(scrollPos) {
        window.scrollTo(0, parseFloat(scrollPos))
    }
}

function animateHeader() {
    if(initialHeaderHeight === -1) {
        initHeader()
    }

    const direction = window.scrollY > previousScroll ? "down" : "up";
    previousScroll = window.scrollY

    //Calcul de la taille du header
    let calcul = (initialHeaderHeight - (window.scrollY * 0.7))
    headerNode.style.height = calcul +"px"
    if(calcul > 90) {
        mainNode.style.marginTop = (initialHeaderHeight + window.scrollY*0.3) + "px"
    }


    //Gestion des etapes
    let contentDistance = document.querySelector('.header__title').getBoundingClientRect().top
    let titleHeight = document.querySelector('.header__title').clientHeight
    let menuHeight = document.querySelector('.header__menu').clientHeight
    let headerHeight = headerNode.clientHeight

    let contentHeight = step < 2 ? titleHeight + menuHeight : menuHeight

    if(headerContentHeight[step] > contentHeight || headerContentHeight[step] === -1) {
        headerContentHeight[step] = contentHeight
    }


    if(direction === "down") {
        if(step === 1 && contentDistance<= 0) {
            layout2()
            step = 2
            return
        }
        if(step === 0 && contentDistance<= 15) {
            layout1()
            step = 1
            return
        }
    }
    else {
        if(step === 2 && ((headerHeight - headerContentHeight[step-1]) > 16)) {
            layout2()
            step = 1
        }
        if(step === 1 && ((headerHeight - headerContentHeight[step-1]) > 30)) {
            layout1()
            step = 0
        }
    }
}