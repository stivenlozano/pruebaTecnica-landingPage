class Gallery {
  constructor(){
    this.typeView = 'dashboard';
    this.page = 1;
    this.query = 'All';
    this.data = [];
  }

  getData = async (category) => {
    if(category){
      this.query = category;
      this.page = 1;

      const list = document.querySelector('.container-images__dashboard');
      while(list.firstChild){
        list.removeChild(list.firstChild);
      }
    }

    const URL = `https://api.unsplash.com/search/photos/?query=${this.query}&client_id=5S4HUC0I-AjDWOOmJwKXFjmxGRmGsh_SLSqTwTpts6A&page=${this.page}`;
    let data = [];

    try {
      let response = await fetch(URL);
      data = await response.json();
    } catch (error) {
      console.log(`Error en la solicitud!!, ${error}`);
    }
    
    this.page = this.page+1

    return data;
  }

  loadData = (e, data) => {
    const tabs = ['All', 'Branding', 'Web', 'Photography', 'App'];

    if(tabs.includes(e.target.textContent))
      this.data = [];

    const dashboardContainer = document.querySelector('.container-images__dashboard');
    
    if(e.target.className != 'more-images'){
      const loading = '<div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'
      dashboardContainer.innerHTML = loading;
    }
    
    let classView = this.typeView == 'dashboard' ? 'cell' : 'row'
    let rowCell = this.typeView == 'dashboard' ? 'row-cell' : 'span'
    let rowImg = this.typeView == 'dashboard' ? 'cell' : 'row-img'
    let images = '';
    
    data.map((item, index) => {
      images+= `
        <div class="${rowImg} ${classView}--${index+1}">  
          <img src="${item.urls.regular}" alt="${item.alt_description}">
          <div class="panel">
            <h4>CREATIVE LOGO</h4>
            <div class="divider"></div>
            <span>Branding</span>
          </div>
        </div>
      `
    });
    
    const row = document.createElement('div');
    row.classList.add('row');
    row.classList.add(rowCell);
    row.innerHTML = images;
    this.data.push(row)

    if(e.target.className == 'more-images'){
      dashboardContainer.parentElement.querySelector('.more-images').style.display = 'block';
      this.data.forEach(element => dashboardContainer.appendChild(element));
    }else{
      setTimeout(() => {
        dashboardContainer.querySelector('.lds-grid').remove();  
        dashboardContainer.parentElement.querySelector('.more-images').style.display = 'block';
        this.data.forEach(element => dashboardContainer.appendChild(element));
      }, 1000);
    }
  }

  showData = (e, data) => {
    e.preventDefault();

    if(e.target.className != 'more-images'){
      const dashboardContainer = document.querySelector('.container-images__dashboard');
      dashboardContainer.parentElement.querySelector('.more-images').style.display = 'none';
    }
  
    data.then(response => {
      this.loadData(e, response.results);
    })
    .catch(error => console.log(`Error en la solicitud!!, ${error}`))
  }

  changeTab = (e, tab) => {
    e.preventDefault();
      
    const list = document.querySelector('.container-images__dashboard');    
    while(list.firstChild){
      list.removeChild(list.firstChild);
    }
    const data = this.data;
    const dashboardContainer = document.querySelector('.container-images__dashboard');
    
    let classView = '';
    data.forEach(element => {  
      if(tab == 'dashboard'){
        element.classList.add('row-cell');
        classView = '.row-img';
      }else{
        element.classList.remove('row-cell');
        classView = '.cell';
      }
  
      element.querySelectorAll(classView).forEach(( item, index )=> {
        if(tab == 'dashboard'){
          item.classList.remove('row-img')
          item.classList.remove(`row--${index+1}`)
          item.classList.add('cell')
          item.classList.add(`cell--${index+1}`)
        }else{
          item.classList.remove('cell')
          item.classList.remove(`cell--${index+1}`)
          item.classList.add('row-img')
          item.classList.add(`row--${index+1}`)
        }
      });
      dashboardContainer.appendChild(element)
    })  
    this.typeView = tab;
  }
}