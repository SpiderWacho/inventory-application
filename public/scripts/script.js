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

//Scroll animation
const scrollElements = document.querySelectorAll(".js-scroll");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop > (window.innerHeight || document.documentElement.clientHeight)
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el)
    }
  })
}

window.addEventListener("scroll", () => { 
  handleScrollAnimation();
});

//Give the elements the scroll attribute to display without scrolling
//On scroll it will actualize and remove the class from the other elements
for (let i = 0; i < scrollElements.length; i++) {
    scrollElements[i].classList.add("scrolled");
}