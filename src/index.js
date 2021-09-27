import './css/styles.css';
import fetchCountries from './fetchCountries.js';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener(
  'input',
  debounce(
    () => fetchCountries(searchBox.value.trim()).then(countries => checkLength(countries)),
    DEBOUNCE_DELAY,
  ),
);
function checkLength(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countries.length >= 2 && countries.length <= 10) {
    const markup = countries
      .map(country => {
        return `<li><img class="flag__img" src="${country.flags[0]}" alt="Flag of ${country.name}" width="50" height="30"></img><span> ${country.name}</span>
            </li>`;
      })
      .join('');
    countryList.innerHTML = markup;
  } else if (countries.length === 1) {
    const markup = countries
      .map(country => {
        return `<li>
          <img class="flag__img" src="${country.flags[0]}" alt="Flag of ${
          country.name
        }" width="50" height="30"></img><span class="country__name"> <b>${country.name}</b></span>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Population</b>: ${country.population}</p>
          <p><b>Languages</b>: ${country.languages.map(language => ' ' + language.name)}</p>
        </li>`;
      })
      .join('');
    countryInfo.innerHTML = markup;
    countryList.style.display = 'none';
  } else {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  }
}
countryList.style.listStyle = 'none';
countryInfo.style.listStyle = 'none';
countryList.style.marginLeft = '20px';
countryList.style.fontSize = '20px';
countryList.style.padding = '0';
countryInfo.style.fontSize = '30px';
countryInfo.style.marginTop = '30px';
countryInfo.style.marginLeft = '20px';
