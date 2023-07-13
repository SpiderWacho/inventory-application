const menu = document.querySelector('.navigation-mobile')
const bg = document.querySelector('.menu-cover');

menu.addEventListener('click', (e) => {
    console.log(document.querySelector('.submenu'))
    if (!document.querySelector('.submenu').classList.contains('visible')) {
        showMenu(); 
    }
    else {
        hideMenu();
    }
})


bg.addEventListener('click', (e) => {
    hideMenu();
})

const showMenu = () => {
    const allSubMenu = document.querySelectorAll('.submenu')
    allSubMenu.forEach(element => {
        element.classList.toggle('visible')        
    });
    bg.style.display = 'block';
}

const hideMenu = () => {
    const allSubMenu = document.querySelectorAll('.submenu')
    allSubMenu.forEach(element => {
        element.classList.remove('visible')        
    });
    bg.style.display = 'none';
}

