var content = document.querySelector("#content"),
    hero = document.querySelectorAll('.personage'),
    info = document.querySelector('#info'),
    close = document.querySelector('.close'),
    url = 'https://swapi.dev/api/people/',
    nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    tableContent = document.querySelector(".table-container"),
    dataArr = [],
    dataTable = [

      {label: 'name', value: 'name'}, 
      {label: 'gender', value: 'gender'}, 
      {label: 'birthYear', value: 'birth_year'}, 
      {label: 'homeWorld', value: 'homeworld'}, 
      {label: 'films', value: 'films'}, 
      {label: 'species', value: 'species'}
    ],
    img = document.querySelector('.img-container'),
    imgPeople = document.querySelector('img'),
    nextUrl,
    prevUrl,
    table;   

document.addEventListener("DOMContentLoaded", getDate(url), false);

nextBtn.addEventListener('click', nextPage);
prevBtn.addEventListener('click', prevPage);

function nextPage() {
  if(nextUrl) {
    getDate(nextUrl);
  }
};
  
function prevPage() {
  if(prevUrl) {
    getDate(prevUrl);
  } 
};

function selectItem() {
  var item = dataArr.find(el => el.name === this.textContent);
  createTable(item);
  setHomeWorld(item);
  setFilms(item);
  setSpesies(item);
  setName(item);
  setGender(item);
  setBirthYear(item);
  container.style.display = 'none';
  info.style.display = 'block';
  img.style.display = 'block';
  close.style.display = 'block';
  imgPeople.setAttribute('src', `img/${item.name.toLowerCase()}.png`);
}

function createTable() {
  table = document.createElement('table');
  table.className = 'table';
  tBody = document.createElement('tbody');

  for (let i = 0; i < 6; i++) {
    var row = document.createElement('tr');
    row.className = 'row' + [i+1];
    for (let j = 0; j < 2; j++) {
      var cell = document.createElement('td');
      row.appendChild(cell);
    }
    tBody.appendChild(row);
  }
  table.appendChild(tBody);
  tableContent.appendChild(table);
}

function setName(dataTable) {
  var row_1 = document.querySelector('.row1');
  row_1.firstElementChild.innerHTML = 'Name';
  row_1.lastElementChild.innerHTML = dataTable.name;
  row_1.lastElementChild.style.cssText = `color:rgb(146, 146, 255);
                                         font-size: 20px;
                                         font-style: italic;
                                         font-family: 'Rye';`;
}

function setGender(dataTable) {
  var row_2 = document.querySelector('.row2');
  row_2.firstElementChild.innerHTML = 'Gender';
  row_2.lastElementChild.innerHTML = dataTable.gender;
}

function setBirthYear(dataTable) {
  var row_3 = document.querySelector('.row3');
  row_3.firstElementChild.innerHTML = 'Birth Year';
  row_3.lastElementChild.innerHTML = dataTable.birth_year;
}

function setHomeWorld(dataTable) {
  var row_4 = document.querySelector('.row4');
  row_4.firstElementChild.innerHTML = 'Home World';
  var planet = dataTable.homeworld;
  fetch(planet, {method: 'GET'}).then(function(resp) {return resp.json();}).then(function (data) {row_4.lastElementChild.innerHTML = data.name;}).catch(function (err) {console.error(err)});
}

function setFilms(dataTable) {
  var row_5 = document.querySelector('.row5');
  row_5.firstElementChild.innerHTML = 'Films';
  
  if (dataTable.films.length > 0) {
    let ul = document.createElement('ul');
    row_5.lastElementChild.insertAdjacentElement('afterbegin', ul);
    dataTable.films.forEach(el => {
      fetch(el, {method: 'GET'}).then(function(resp) {return resp.json();}).then(function (data) {
        var li = document.createElement('li');
        li.innerHTML = data.title;
        ul.insertAdjacentElement('beforeend', li);
      }).catch(function (err) {console.error(err)});});
  } else {
    row_5.lastElementChild.innerHTML = 'No films';
  }
}

function setSpesies(dataTable) {
  var row_6 = document.querySelector('.row6');
  row_6.firstElementChild.innerHTML = 'Species';
  var race = dataTable.species;
  if (race.length > 0) {
    fetch(race, {method: 'GET'}).then(function(resp) {return resp.json();}).then(function (data) {
      row_6.lastElementChild.innerHTML = data.name;
    }).catch(function (err) {console.error(err)});
  } else {
    row_6.lastElementChild.innerHTML = 'No species';
  }
}

close.addEventListener('click', function() {
  table.remove();
  info.style.display = 'none';
  img.style.display = 'none';
  close.style.display = 'none';
  container.style.display = 'block';
});

function getDate(url) {
  fetch(url, { method: 'GET' })
    .then(function (resp) {
      return resp.json();
    }).then(function (data) {
      dataArr = data.results;
      nextUrl = data.next;
      prevUrl = data.previous;      
      content.replaceChildren();
      for (var i = 0; i < data.results.length; i++) {
        var divItem = document.createElement('div');
        divItem.addEventListener('click', selectItem);
        divItem.className = 'personage';
        divItem.innerHTML = data.results[i].name;
        content.appendChild(divItem);
        window.localStorage.setItem('person' + [i], data.results[i].name);
      }
    }).catch(function (err) {
      console.error(err)
    });
}