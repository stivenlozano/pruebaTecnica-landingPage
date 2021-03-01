const gallery = new Gallery()

const changeNavbar = (e) => {
  e.preventDefault();

  const tag = e.target.parentElement.parentElement.parentElement.className;
  const classQuery = tag == 'menu' ? 'header nav ul li' : '.submenu ul li';
  
  if(tag == 'menu' | tag == 'submenu'){
    const navbar = document.querySelectorAll(classQuery);
    navbar.forEach(element => element.querySelector('a').classList.remove('active'));

    const tagSelected = e.target;

    if(e.target.firstChild.className == undefined)
      tagSelected.classList.add('active');

    if(tag == 'submenu'){
      gallery.showData(e, gallery.getData(e.target.textContent));
    }else{
      let position = 0;

      const scroll = setInterval(() => {
        position = position + 10;
        window.scroll(0, position);
        
        if(position > 700){
          clearInterval(scroll)
        }
      }, 5);
    }
  }
} 

const showMenuMobile = (e) => {
  e.preventDefault();
  console.log(e.target)

  if(e.target.className.replace('icon ', '') == 'icon-menu'){
    document.querySelector('.menu').style.display = 'flex';
    document.querySelector('.menu-mobile span').classList.remove('icon-menu');
    document.querySelector('.menu-mobile span').classList.add('icon-close');
  }else if(e.target.className.replace('icon ', '') == 'icon-close'){
    document.querySelector('.menu').style.display = 'none';
    document.querySelector('.menu-mobile span').classList.remove('icon-close');
    document.querySelector('.menu-mobile span').classList.add('icon-menu');
  }
}

const events = () => {
  document.addEventListener('DOMContentLoaded', (e) => gallery.showData(e, gallery.getData()));
  
  // Menu and submenu
  document.querySelector('body').addEventListener('click', changeNavbar);

  // Tab dashboard and list
  document.querySelector('.tab__dashboard').addEventListener('click', (e) => gallery.changeTab(e, 'dashboard'));
  document.querySelector('.tab__list').addEventListener('click', (e) => gallery.changeTab(e, 'list'));

  // Button show more
  document.querySelector('.more-images').addEventListener('click', (e) => gallery.showData(e, gallery.getData()));

  // menu mobile
  document.querySelector('header .menu-mobile a').addEventListener('click', showMenuMobile);
}

events();