import {DefaultParameters} from './const.js';

const pageCondition = {
  mainForm: document.querySelector('.ad-form'),
  formElements: document.querySelectorAll('.ad-form__element'),
  filterField: document.querySelector('.map__filters'),
  filterElements: document.querySelector('.map__filters').querySelectorAll('select'),
  pricePlaceholder: document.querySelector('#price'),
  setPageNonActive: function() {
    this.filterField.classList.add('map__filters--disabled');
    this.filterField.querySelector('#housing-features').setAttribute('disabled', true);
    this.filterElements.forEach(function(element) {
      element.setAttribute('disabled', true);
    })
    this.mainForm.classList.add('ad-form--disabled');
    document.querySelector('#avatar').setAttribute('disabled', true);
    this.formElements.forEach(function(element) {
      element.setAttribute('disabled', true);
    })
  },
  setPageActive: function() {
    this.filterField.classList.remove('map__filters--disabled');
    this.filterField.querySelector('#housing-features').removeAttribute('disabled');
    this.filterElements.forEach(function(element) {
      element.removeAttribute('disabled');
    })
    this.mainForm.classList.remove('ad-form--disabled');
    document.querySelector('#avatar').removeAttribute('disabled');
    this.formElements.forEach(function(element) {
      element.removeAttribute('disabled');
    })
    this.pricePlaceholder.placeholder = DefaultParameters.PLACEHOLDER_PRICE;
  },
}

export {pageCondition};
