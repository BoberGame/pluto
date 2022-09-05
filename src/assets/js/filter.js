import { ACTIVE_CLASS, addClass, HIDDEN_CLASS,
  removeClass } from './components';

const CATALOG = document.getElementById('catalog');
const CATALOG_ITEMS = document.querySelectorAll('[data-item]');

const filterElems = {
  filterBtn: document.getElementById('filterBtn'),
  applyBtn: document.getElementById('filterApplyBtn'),
  filter: document.querySelector('.filter'),
};

const filterShow = () => filterElems.filter.classList.toggle(ACTIVE_CLASS);

/*
1. Function takes filterClass, which equals data-atr filterBtn
and takes catalog element.
2. Function compare value data attribute catalogElement with filterClass and
if they unequal, add hidden class catalogElement.
*/
const filterCompare = (catalogElement, filterClass = '') => {
  const filterValue = catalogElement.dataset.item;
  if (filterValue === filterClass) removeClass(HIDDEN_CLASS, catalogElement);
  else addClass(HIDDEN_CLASS, catalogElement);
};

const filterCatalog = (event) => {
  const filterClass = event.target.dataset.filter;
  for (const item of CATALOG_ITEMS) filterCompare(item, filterClass);
};

if (CATALOG) {
  const filters = CATALOG.querySelectorAll('[data-filter]');

  filterElems.filterBtn.addEventListener('click', filterShow);
  filters.forEach((btn) => {
    btn.addEventListener('change', (event) => {
      filterElems.applyBtn.addEventListener('click', () => {
        if (btn.checked) filterCatalog(event);
        else removeClass(HIDDEN_CLASS, ...CATALOG_ITEMS);
      });
    });
  });
}
