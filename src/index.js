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
    fetchApiCountries.query = e.target.value.trim(); //elements.query.value;
    if (fetchApiCountries.query === '') { 
        notification('erroe',"Введите название страны!");
        return;
    }
    fetchApiCountries.fetchCountries()
        .then(renderCoutryCard)
       // .then(clearCoutryCard)
        .catch(error => console.log(error));
}

function renderCoutryCard(country) { 
     const markupCard = countryCardTpl(country);
    refs.cardContainer.innerHTML = markupCard;
    /*if (country.lenght === 1) {
        const markupCard = countryCardTpl(country[0]);
        refs.cardContainer.innerHTML = markupCard;
    }
    if (country.lenght >= 2 && country.lenght <= 10) {
        const markupList = countryListTpl(country[0]);
        refs.cardContainer.innerHTML = markupList;
    }
    if (country.lenght > 10) { 
        console.log('необходимо сделать запрос более специфичным (плагин pnotify)');
    }*/
};
/*function renderCountriesList(country) { 
    const markupList = countryListTpl(country);
    refs.cardContainer.innerHTML = markupList;
}*/

function clearCoutryCard(country) { 
    refs.cardContainer.innerHTML = '';
}

function onFeatchError(){ 

}
