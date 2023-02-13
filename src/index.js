import './css/styles.css';
import SearchCountry from './fetchCountries';

import debounce from 'lodash.debounce';

const inputQuery = document.querySelector('#search-box');
// console.log(inputQuery);
const countryList = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

const searchCountry = new SearchCountry();
console.log(searchCountry);
const DEBOUNCE_DELAY = 300;

inputQuery.addEventListener('input', debounce(onInputEnter, DEBOUNCE_DELAY));
function onInputEnter(e) {
  clearCountryList();
  searchCountry.country = e.target.value.trim();

  searchCountry.fetchCountries().then(data => createMarkup(data));
}
let markup;
function createMarkup(data) {
  if (data.length === 1) {
    markup = data
      .map(
        ({ name, capital, population, flags, languages }) =>
          `
      <h2><image src="${flags.svg}" alt="${name}" height="30" width="40"/>&nbsp
      <BIG>${name.official}</BIG></h2>
      <h3><span>Capital: </span> ${capital} </h3>
      <p><span><b>Population: </b></span> ${population}</p>
      
      <p><span><b>Languages: </b></span>${Object.values(languages).join(
        ', '
      )}</p>
    `
      )
      .join('');
    info.insertAdjacentHTML('beforeend', markup);
  }
  if (data.length >= 2 && data.length <= 10) {
    markup = data
      .map(
        ({ name, capital, population, flags, languages }) =>
          `<li>
      <p><image src="${flags.svg}" alt="${name}" height="20" width="30"/>&nbsp 
      <span><b>${name.official}</span>
      </p>
    </li>`
      )
      .join('');
    countryList.insertAdjacentHTML('beforeend', markup);
  }
}

function clearCountryList() {
  countryList.innerHTML = '';
  info.innerHTML = '';
}
