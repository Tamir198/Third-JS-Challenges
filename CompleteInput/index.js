const api = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const places = getplaces();
let SearchBox = document.querySelector(".place-input");
let listOfPlaces = document.querySelector(".place-list");

function getplaces() {
  let placesArr = [];
  fetch(api)
    .then(res => res.json())
    .then(jsonData => jsonData.forEach(place => placesArr.push(place)));
  return placesArr;
}

SearchBox.addEventListener('input', () => {
  let SearchBoxText = SearchBox.value;
  if (SearchBoxText) {
    listOfPlaces.innerHTML = "";
    let mathingArr = getMatchingPlaces(SearchBoxText);
    updateListOfCities(mathingArr, SearchBoxText);
  }
  else {
    listOfPlaces.innerHTML = "<li>Filter for A city</li><li>or a state</li>";
  }
})

function getMatchingPlaces(SearchBoxText) {
  let mathingCities = [];
  var regex = new RegExp(SearchBoxText.toUpperCase(), 'g');
  places.map(place => {
    if (place.city.toUpperCase().match(regex) || place.state.toUpperCase().match(regex)) {
      mathingCities.push(`${place.city}, ${place.state}`);
    }
  });
  return mathingCities;
}

function updateListOfCities(citiesArr, SearchBoxText) {
  const newPlaceListHtml = citiesArr.map(place => {
    const regex = new RegExp(SearchBoxText, 'gi');
    const coloredPlace = place.replace(regex, `<span class="highlight">${SearchBoxText}</span>`);
    return `<li><span>${coloredPlace}</span></li>`;
  }).join('');
  listOfPlaces.innerHTML = newPlaceListHtml;
}



