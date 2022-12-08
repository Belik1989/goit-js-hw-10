import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector("#search-box");
const list = document.querySelector(".country-list");
const div = document.querySelector(".country-info");

let searchCountryName = '';

input.addEventListener("input", debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange() {
    searchCountryName = input.value.trim();
    if (searchCountryName === '') {
        cleaner();
        return;
    } else fetchCountries(searchCountryName).then(countryName => {
        if (countryName.length < 2) {
            createCountryCard(countryName);
            Notiflix.Notify.success('Here your result');
        } else if (countryName.length < 10 && countryName.length > 1) {
            createCountryList(countryName);
            Notiflix.Notify.success('Here your results');
        } else {
            cleaner();
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        };
    })
        .catch(() => {
            cleaner();
        Notiflix.Notify.failure('Oops, there is no country with that name.');
    });
};

function createCountryCard(country) {
    cleaner();
    const c = country[0];
    const readyCard = `<div class="country-card">
        <div class="country-card--header">
            <img src="${c.flags.svg}" alt="Country flag" >
            <h2 class="country-card--name"> ${c.name.official}</h2>
        </div>
            <p class="country-card--field">Capital: <span class="country-value">${c.capital}</span></p>
            <p class="country-card--field">Population: <span class="country-value">${c.population}</span></p>
            <p class="country-card--field">Languages: <span class="country-value">${Object.values(c.languages).join(',')}</span></p>
    </div>`
    div.innerHTML = readyCard;
};

function createCountryList(country) {
    cleaner();
    const readyList = country.map((c) => 
        `<li class="country-list--item">
            <img src="${c.flags.svg}" alt="Country flag" width="40", height="30">
            <span class="country-list--name">${c.name.official}</span>
        </li>`)
        .join("");
    list.insertAdjacentHTML('beforeend', readyList);
};

function cleaner() {
list.innerHTML = '';
div.innerHTML = '';
};