/* eslint-disable no-undef */

const maps = {
  mapStore: document.getElementById('mapStore'),
  mapShowroom: document.getElementById('mapShowroom'),
  settings(map) {
    map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил
  },
};

maps.mapStore && ymaps.ready(initStore);
maps.mapShowroom && ymaps.ready(initShowroom);

function initStore() {
  const map = new ymaps.Map('mapStore', {
    center: [56.050639, 92.903701],
    zoom: 11
  });
  maps.settings(map);
}

function initShowroom() {
  const map = new ymaps.Map('mapShowroom', {
    center: [56.050739, 92.903701],
    zoom: 12
  });
  maps.settings(map);
}
