const api = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = getplaces();
var inputSearchBox = document.querySelector(".place-input");
var listOfCities = document.querySelector(".place-list");

function getplaces() {
  let citiesArr = [];
  fetch(api)
    .then(res => res.json())
    .then(data => data.forEach(city => citiesArr.push(city)));
  console.log(citiesArr);
  return citiesArr;
}


inputSearchBox.addEventListener('input', () => {
  let conentOfSearchBox = inputSearchBox.value;
  //Got Value
  if (conentOfSearchBox) {
    listOfCities.innerHTML = '';
    let filteredCities = updateListOfCities(getMatchingCitiesArr(conentOfSearchBox));
    console.log(filteredCities);
  }
  else
    listOfCities.innerHTML = "<li>Filter for A city</li><li>or a state</li>";

})

function updateListOfCities(citiesArr){
  citiesArr.map(city =>{
    listOfCities.insertAdjacentHTML('beforeend', `<li>${city}</li>`); 
  })
  return;
}

function getMatchingCitiesArr(text) {
  let mathingCities = [];
  var regex = new RegExp(text, 'g');
  cities.map(item => {
    if (item.city.match(regex) || item.state.match(regex)) {
      console.log(`${item.city}, ${item.state}`);
      mathingCities.push(`${item.city}, ${item.state}`);
    }
  })
  return mathingCities;
}
