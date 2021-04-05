import {TYPES_OF_APARTMENT, MIN_PRICES, TOKYO_CENTER_COORDINATES,
  SELECT_OF_TWO_ROOMS_ON_PAGE, SELECT_OF_THREE_ROOMS_ON_PAGE, SELECT_OF_MAX_ROOMS_ON_PAGE,
  SERVER_URL_FOR_POST, DefaultParameters, ESCAPE_KEY, ESC_KEY, ALLOWED_FILE_TYPES} from './const.js';
import {sendData} from './api.js';
import {pin, extraMarker} from './create-map.js';
import {formFilter} from './filter.js';
import {uploadImage} from './util.js';

const copyOfApartmentTypes = TYPES_OF_APARTMENT.slice();
const reversedOfApartmentTypes= copyOfApartmentTypes.reverse();
const fieldSelectionOfHousing = document.querySelector('#type');
const fieldTimeIn = document.querySelector('#timein');
const fieldTimeOut = document.querySelector('#timeout');
const fieldPrice = document.querySelector('#price');
const fieldTitle = document.querySelector('#title');
const fieldRoomsNumber = document.querySelector('#room_number');
const fieldGuestsNumber = document.querySelector('#capacity');
const optionsOfRoomsNumber = fieldRoomsNumber.querySelectorAll('option');
const optionsOfGuestsNumber = fieldGuestsNumber.querySelectorAll('option');
const form = document.querySelector('.ad-form');
const successBlock = document.querySelector('#success').content.querySelector('.success');
const errorBlock = document.querySelector('#error').content.querySelector('.error');
const mainContent = document.querySelector('main');
const resetButton = document.querySelector('.ad-form__reset');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const userAvatarField = document.querySelector('#avatar');
const photoPreviewBlock = document.querySelector('.ad-form__photo');
const photoUploadField = document.querySelector('#images');

fieldTitle.addEventListener('input', function() {
  const message = (this.value.search(/\d/) !== -1) ? ('Поле заполнено некорректно, удалите цифры из поля ввода') : ('');
  this.setCustomValidity(message);
  this.reportValidity();
})

const defaultAddress = document.querySelector('#address');
defaultAddress.setAttribute('readonly', true);
defaultAddress.value = TOKYO_CENTER_COORDINATES.lat + ', ' + TOKYO_CENTER_COORDINATES.lng;

fieldSelectionOfHousing.addEventListener('change', function() {
  for (let i = 0; i < reversedOfApartmentTypes.length; i++) {
    if (this.value === reversedOfApartmentTypes[i]) {
      fieldPrice.setAttribute('min', MIN_PRICES[i]);
      fieldPrice.placeholder = MIN_PRICES[i];
    }
  }
})

fieldPrice.addEventListener('input', function() {
  for (let i = 0; i < reversedOfApartmentTypes.length; i++) {
    if (fieldSelectionOfHousing.value === reversedOfApartmentTypes[i] && fieldPrice < MIN_PRICES[i]) {
      this.setCustomValidity('Пожалуйста, введите цену не менее ' + MIN_PRICES[i]);
    }
  }
  this.reportValidity();
})

fieldTimeIn.addEventListener('change', function() {
  fieldTimeOut.value = this.value;
})

fieldTimeOut.addEventListener('change', function() {
  fieldTimeIn.value = this.value;
})

for (let i = 0; i < optionsOfRoomsNumber.length; i++) {
  const attribute = (fieldRoomsNumber.value === optionsOfGuestsNumber[i].value) ? ('selected') : ('disabled');
  optionsOfGuestsNumber[i].setAttribute(attribute, true);
}

fieldRoomsNumber.addEventListener('change', function() {
  fieldGuestsNumber.value = this.value;
  if (this.value === SELECT_OF_MAX_ROOMS_ON_PAGE) {
    fieldGuestsNumber.value = 0;
  }
  for (let i = optionsOfGuestsNumber.length - 1; i >= 0; i--) {
    if (fieldGuestsNumber[i].value === fieldGuestsNumber.value) {
      optionsOfGuestsNumber[i].removeAttribute('disabled');
      if (fieldGuestsNumber.value === SELECT_OF_TWO_ROOMS_ON_PAGE || fieldGuestsNumber.value === SELECT_OF_THREE_ROOMS_ON_PAGE) {
        for (let j = 0; j < optionsOfGuestsNumber.length - 2; j++) {
          optionsOfGuestsNumber[j + 1].removeAttribute('disabled');
        }
      }
    }
    else {
      optionsOfGuestsNumber[i].setAttribute('disabled', true);
    }
  }
})

userAvatarField.addEventListener('change', function() {
  uploadImage(userAvatarField, avatarPreview, ALLOWED_FILE_TYPES);
})

photoUploadField.addEventListener('change', function() {
  const photoPreviewTag = document.createElement('img');
  photoPreviewTag.setAttribute('width', '70');
  photoPreviewTag.setAttribute('width', '70');
  photoPreviewBlock.appendChild(photoPreviewTag);
  uploadImage(photoUploadField, photoPreviewTag, ALLOWED_FILE_TYPES);
})

const onEscPress = function(evt) {
  if(evt.key === (ESCAPE_KEY || ESC_KEY) && mainContent.contains(successBlock) || mainContent.contains(errorBlock)) {
    evt.preventDefault();
    successBlock.remove();
    errorBlock.remove();
    document.removeEventListener('click', onClick);
    document.removeEventListener('keydown', onEscPress);
  }
}

const onClick = function (evt) {
  if(mainContent.contains(successBlock) || mainContent.contains(errorBlock)) {
    evt.preventDefault();
    successBlock.remove();
    errorBlock.remove();
    document.removeEventListener('click', onClick);
    document.removeEventListener('keydown', onEscPress);
  }
}

const showSuccessMessage = function() {
  mainContent.append(successBlock);
  avatarPreview.src = DefaultParameters.DEFAULT_AVATAR_IMAGE;
  photoPreviewBlock.innerHTML = '';
  form.reset();
  pin.refreshMainPin();
  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onEscPress);
}

const error = function() {
  mainContent.append(errorBlock);
  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onEscPress);
}

const sendForm = function(array) {
  form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(SERVER_URL_FOR_POST, showSuccessMessage, error, formData);
    fieldPrice.setAttribute('min', DefaultParameters.DEFAULT_MIN_FLAT_PRICE);
    fieldPrice.placeholder = DefaultParameters.PLACEHOLDER_PRICE;
    formFilter.reset();
    extraMarker.deleteMarkers();
    extraMarker.createMarkers(array);
    extraMarker.paintMarkers()
  })
}

const resetForm = function(array) {
  resetButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    form.reset();
    fieldPrice.setAttribute('min', DefaultParameters.DEFAULT_MIN_FLAT_PRICE);
    fieldPrice.placeholder = DefaultParameters.PLACEHOLDER_PRICE;
    avatarPreview.src = DefaultParameters.DEFAULT_AVATAR_IMAGE;
    photoPreviewBlock.innerHTML = '';
    formFilter.reset();
    pin.refreshMainPin();
    extraMarker.deleteMarkers();
    extraMarker.createMarkers(array);
    extraMarker.paintMarkers()
  })
}

export {resetForm, sendForm}
