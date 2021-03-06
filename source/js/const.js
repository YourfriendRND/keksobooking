const TYPES_OF_APARTMENT = ['palace', 'house', 'flat', 'bungalow'];
const USED_ON_PAGE_TYPES_OF_APARTMENT = ['Дворец', 'Дом', 'Квартира', 'Бунгало'];
const ESCAPE_KEY = 'Escape';
const ESC_KEY = 'Esc';
const QUANTITY_OF_RANDOM_ANNOUNCEMENT = 10;
const NUMBER_OF_COORDINATE_POINTS = 5;
const MIN_NUMBER_ROOMS = 1;
const MIDDLE_NUMBER_ROOMS = 5;
const MAP_SCALE = 10;
const ERROR_MESSAGE_TIME = 5000;
const DefaultParameters = {
  DEFAULT_MIN_FLAT_PRICE: 1000,
  PLACEHOLDER_PRICE: 1000,
  FILTER_SELECT: 'any',
  DEFAULT_AVATAR_IMAGE: 'img/muffin-grey.svg',
}
const DefaultPriceForHousing = {
  LOW: 10000,
  HIGH: 50000,
}
const MIN_PRICES = [0, 1000, 5000, 10000];
const TOKYO_CENTER_COORDINATES = {
  lat: 35.68230,
  lng: 139.75319,
}
const PICTURE_OF_MAIN_PIN = 'img/main-pin.svg';
const PICTURE_OF_EXTRA_PINS = 'img/pin.svg';
const SIZES_OF_PIN = [40, 40];
const SIZES_OF_PIN_CENTER = [20, 40];
const SELECT_OF_TWO_ROOMS_ON_PAGE = '2';
const SELECT_OF_THREE_ROOMS_ON_PAGE = '3';
const SELECT_OF_MAX_ROOMS_ON_PAGE = '100';
const SERVER_URL_FOR_GET = 'https://22.javascript.pages.academy/keksobooking/data';
const SERVER_URL_FOR_POST ='https://22.javascript.pages.academy/keksobooking';
const RENDERING_DELAY = 500;
const ALLOWED_FILE_TYPES = ['jpg', 'jpeg', 'png'];

export {TYPES_OF_APARTMENT, QUANTITY_OF_RANDOM_ANNOUNCEMENT, NUMBER_OF_COORDINATE_POINTS, MIN_NUMBER_ROOMS,
  MIDDLE_NUMBER_ROOMS, USED_ON_PAGE_TYPES_OF_APARTMENT, MIN_PRICES, TOKYO_CENTER_COORDINATES,
  PICTURE_OF_MAIN_PIN, PICTURE_OF_EXTRA_PINS, SIZES_OF_PIN, SIZES_OF_PIN_CENTER, SELECT_OF_TWO_ROOMS_ON_PAGE,
  SELECT_OF_THREE_ROOMS_ON_PAGE, SELECT_OF_MAX_ROOMS_ON_PAGE, SERVER_URL_FOR_GET, SERVER_URL_FOR_POST,
  DefaultPriceForHousing, RENDERING_DELAY, ESCAPE_KEY, ESC_KEY, MAP_SCALE, DefaultParameters, ERROR_MESSAGE_TIME,
  ALLOWED_FILE_TYPES};
