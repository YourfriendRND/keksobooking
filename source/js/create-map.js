import {TOKYO_CENTER_COORDINATES, PICTURE_OF_MAIN_PIN, PICTURE_OF_EXTRA_PINS, SIZES_OF_PIN,
  SIZES_OF_PIN_CENTER, SERVER_URL_FOR_GET, QUANTITY_OF_RANDOM_ANNOUNCEMENT, MAP_SCALE, NUMBER_OF_COORDINATE_POINTS} from './const.js';
import {pageCondition} from './page-condition.js';
import {addAnnouncementOnPage} from './create-ad.js';
import {getData} from './api.js';
import {showDownloadError} from './util.js';
import {resetForm, sendForm} from './form.js';
import {changeFilter} from './filter.js';
/* global L:readonly */

pageCondition.setPageNonActive();

const leafletMap = L.map('map-canvas');

const iconOfOtherPins = L.icon({
  iconUrl: PICTURE_OF_EXTRA_PINS,
  iconSize: SIZES_OF_PIN,
  iconAnchor: SIZES_OF_PIN_CENTER,
})

const extraMarker = {
  allMarkers: [],
  createMarkers: function(array) {
    array.forEach(function({location}, index) {
      const coordinates = {
        lat: location.lat,
        lng: location.lng,
      }
      const otherPins = L.marker(
        coordinates,
        {
          icon: iconOfOtherPins,
        },
      )
      const popupContent = addAnnouncementOnPage(array[index])
      otherPins.bindPopup(
        popupContent,
      )
      extraMarker.allMarkers.push(otherPins)
    })
    return extraMarker.allMarkers;
  },
  paintMarkers: function() {
    extraMarker.allMarkers.forEach(function(element) {
      element.addTo(leafletMap)
    })
  },
  deleteMarkers: function() {
    extraMarker.allMarkers.forEach(function(element) {
      element.remove()
    })
    extraMarker.allMarkers = [];
  },
}

const createAdOnMap = function(array) {
  const slicedArray = array.slice(0, QUANTITY_OF_RANDOM_ANNOUNCEMENT);
  extraMarker.createMarkers(slicedArray)
  extraMarker.paintMarkers();
  changeFilter(array);
  sendForm(slicedArray);
  resetForm(slicedArray);
}


leafletMap.on('load', function() {
  getData(SERVER_URL_FOR_GET, createAdOnMap, showDownloadError)
  pageCondition.setPageActive();
})

leafletMap.setView(TOKYO_CENTER_COORDINATES, MAP_SCALE);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(leafletMap);

const mainPinIcon =  L.icon({
  iconUrl: PICTURE_OF_MAIN_PIN,
  iconSize: SIZES_OF_PIN,
  iconAnchor: SIZES_OF_PIN_CENTER,
})

const pin = {
  mainPin: L.marker(
    TOKYO_CENTER_COORDINATES,
    {
      draggable: true,
      icon: mainPinIcon,
    }),
  createMainPin: function() {
    this.mainPin.addTo(leafletMap);
    this.mainPin.on('move', function(evt) {
      const coordinateOfMovement = evt.target.getLatLng();
      const newLatitude = coordinateOfMovement.lat.toFixed(NUMBER_OF_COORDINATE_POINTS);
      const newLongitude = coordinateOfMovement.lng.toFixed(NUMBER_OF_COORDINATE_POINTS);
      const addressOfNewAnnouncement = document.querySelector('#address');
      addressOfNewAnnouncement.value = newLatitude + ', ' + newLongitude;
    })
  },
  refreshMainPin: function() {
    this.mainPin.setLatLng(TOKYO_CENTER_COORDINATES);
  },
}

pin.createMainPin();

export {pin, extraMarker}
