import './styles.css';
import FetchApiCountries from './js/fetchCountries.js'
import countryCardTpl from './templates/coutnry-card.hbs';
import countryListTpl from './templates/countries-list.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';
const debounce = require('lodash.debounce'); 
const fetchApiCountries = new FetchApiCountries();

const refs = {
    cardContainer: document.querySelector('.js-card-container'),
    searchInput: document.querySelector('.search-input')
}

refs.searchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) { 
    e.preventDefault();
    clearCoutryCard();
    fetchApiCountries.query = e.target.value.trim(); 
   
    fetchApiCountries.fetchCountries()
        .then(appendCountriesMarkup)
        .catch(error => console.log(error));
}

function appendCountriesMarkup(country) {
    if (country.length === 1) {
        renderCoutryCard(country);
    } else if (country.length >= 2 && country.length <= 10) {
        renderCountriesList(country);
    } else if (country.length > 10) {
        inputError();
    }
}
    
function renderCoutryCard(country) {
    const markupCard = countryCardTpl(country);
    refs.cardContainer.innerHTML = markupCard;
}

function renderCountriesList(country) { 
    const markupList = countryListTpl(country);
    refs.cardContainer.innerHTML = markupList;
}

function clearCoutryCard(country) { 
    refs.cardContainer.innerHTML = '';
}
function inputError() { 
     error({
            title: 'Оу, как много стран!',
            text: 'Сделайте ваш запрос более точным'
        })
}