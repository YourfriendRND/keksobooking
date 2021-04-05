import {TYPES_OF_APARTMENT, USED_ON_PAGE_TYPES_OF_APARTMENT, MIN_NUMBER_ROOMS, MIDDLE_NUMBER_ROOMS} from './const.js';

const similarAnnouncementTemplate = document.querySelector('#card').content.querySelector('.popup');

const addAvatarOnPage = function (selector, avatar) {
  if (!avatar) {
    selector.classList.add('hidden');
  }
  selector.src = avatar;
}

const addTextContentOnPage = function (selector, content) {
  if (!content) {
    selector.classList.add('hidden');
  }
  selector.textContent = content;
}

const addPriceOnPage = function(selector, price) {
  if (!price) {
    selector.classList.add('hidden');
  }
  selector.textContent = price + ' ₽/ночь';
}

const addTypeOfHousingOnPage = function(selector, arrayOfTypes) {
  if (!arrayOfTypes.length) {
    selector.classList.add('hidden');
  }
  for (let i = 0; i < TYPES_OF_APARTMENT.length; i++) {
    if (arrayOfTypes === TYPES_OF_APARTMENT[i]) {
      arrayOfTypes = USED_ON_PAGE_TYPES_OF_APARTMENT[i];
    }
  }
  selector.textContent = arrayOfTypes;
}

const getCorrectRoomWord = function (quantityOfRooms) {
  if (quantityOfRooms === MIN_NUMBER_ROOMS) {
    return ' комната для ';
  }
  if (quantityOfRooms >= MIDDLE_NUMBER_ROOMS) {
    return ' комнат для ';
  }
  return ' комнаты для ';
}

const addQuantityOfGuests = function (selector, quantityOfRooms, quantittyOfGuests) {
  if (!quantittyOfGuests || !quantityOfRooms) {
    selector.classList.add('hidden');
  }
  selector.textContent = quantityOfRooms + getCorrectRoomWord(quantityOfRooms) + quantittyOfGuests + ' гостей';
}

const addTimeOnPage = function (selector, checkinTime, checkoutTime) {
  if (!checkinTime || !checkoutTime) {
    selector.classList.add('hidden');
  }
  selector.textContent = 'Заезд после ' + checkinTime + ', выезд до ' + checkoutTime;
}

const addFeaturesInAnnouncement = function (parentSelector, arrayOfFeatures) {
  if (!arrayOfFeatures.length) {
    parentSelector.classList.add('hidden');
  }
  parentSelector.innerHTML = '';
  const fragmentOfList = document.createDocumentFragment()
  for (let j = 0; j < arrayOfFeatures.length; j++) {
    let newListElement = document.createElement('li');
    newListElement.className = 'popup__feature popup__feature--' + arrayOfFeatures[j];
    fragmentOfList.appendChild(newListElement);
  }
  parentSelector.appendChild(fragmentOfList);
}

const addPhotosOfHousing = function(selector, arrayOfPhotos) {
  if (!arrayOfPhotos.length) {
    selector.classList.add('hidden');
  }
  const fragmentForPhotos = document.createDocumentFragment(); 
  const copySelector = selector.cloneNode(true);
  selector.src = arrayOfPhotos[0];
  if (arrayOfPhotos.length > 1) {
    for (let i = 1; i < arrayOfPhotos.length; i++) {
      copySelector.src = arrayOfPhotos[i];
      fragmentForPhotos.appendChild(copySelector)
    }
    selector.parentElement.appendChild(fragmentForPhotos);
  }
}

const addAnnouncementOnPage = function (announcement) {
  const similarAnnouncement = similarAnnouncementTemplate.cloneNode(true);
  const avatarOfUser = similarAnnouncement.querySelector('.popup__avatar');
  const titleOfAnnouncement = similarAnnouncement.querySelector('.popup__title');
  const addressOfHousing = similarAnnouncement.querySelector('.popup__text--address');
  const priceOfHousing = similarAnnouncement.querySelector('.popup__text--price');
  const typeOfHousing = similarAnnouncement.querySelector('.popup__type');
  const capacityOfHousing = similarAnnouncement.querySelector('.popup__text--capacity');
  const time = similarAnnouncement.querySelector('.popup__text--time');
  const featureList = similarAnnouncement.querySelector('.popup__features')
  const descriptionText = similarAnnouncement.querySelector('.popup__description')
  const photoOfHousing = similarAnnouncement.querySelector('.popup__photo');
  addAvatarOnPage(avatarOfUser, announcement.author.avatar);
  addTextContentOnPage(titleOfAnnouncement, announcement.offer.title);
  addTextContentOnPage(addressOfHousing, announcement.offer.address);
  addPriceOnPage(priceOfHousing, announcement.offer.price);
  addTypeOfHousingOnPage(typeOfHousing, announcement.offer.type);
  addQuantityOfGuests(capacityOfHousing, announcement.offer.rooms, announcement.offer.guests);
  addTimeOnPage(time, announcement.offer.checkin, announcement.offer.checkout);
  addFeaturesInAnnouncement(featureList, announcement.offer.features);
  addTextContentOnPage(descriptionText, announcement.offer.description);
  addPhotosOfHousing(photoOfHousing, announcement.offer.photos);
  return similarAnnouncement;
}

export {addAnnouncementOnPage};
