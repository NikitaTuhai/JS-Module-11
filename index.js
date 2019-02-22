"use strict";

const laptops = [
  {
    size: 13,
    color: "white",
    price: 28000,
    release_date: 2015,
    name: 'Macbook Air White 13"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 13,
    color: "gray",
    price: 32000,
    release_date: 2016,
    name: 'Macbook Air Gray 13"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 13,
    color: "black",
    price: 35000,
    release_date: 2017,
    name: 'Macbook Air Black 13"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 15,
    color: "white",
    price: 45000,
    release_date: 2015,
    name: 'Macbook Air White 15"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 15,
    color: "gray",
    price: 55000,
    release_date: 2016,
    name: 'Macbook Pro Gray 15"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 15,
    color: "black",
    price: 45000,
    release_date: 2017,
    name: 'Macbook Pro Black 15"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 17,
    color: "white",
    price: 65000,
    release_date: 2015,
    name: 'Macbook Air White 17"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 17,
    color: "gray",
    price: 75000,
    release_date: 2016,
    name: 'Macbook Pro Gray 17"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 17,
    color: "black",
    price: 80000,
    release_date: 2017,
    name: 'Macbook Pro Black 17"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  }
];

const container = document.querySelector(".container");

const source = document.querySelector("#laptopsCard").innerHTML.trim();
const template = Handlebars.compile(source);

const murkup = laptops.reduce((acc, item) => acc + template(item), "");

container.insertAdjacentHTML("afterbegin", murkup);
//=======================================================
const filterForm = document.querySelector(".js-form");
const checkBoxes = Array.from(filterForm.querySelectorAll("input"));
const UNDEFINED_QUERY = `<p >Sorry, no matches were found for your query.</p>`

const filter = { size: [], color: [], release_date: [] };


filterForm.addEventListener("submit", filterClick);
filterForm.addEventListener("reset", filterClick);


function filterClick(e) {
  e.preventDefault();
  filter.size = [];
  filter.color = [];
  filter.release_date = [];
  if (e.type === "submit") {
    pushCheckboxes();
    filterProducts();
    showProducts();
  }
  if (e.type === "reset") return clearCheckboxes();
}

function pushCheckboxes() {
  return checkBoxes.filter(item => {
    if (item.checked) {
      filter[item.name].push(item.value);
    }
  });
}
function applyCheckedFields(laptopParam, filterParam) {
    return filterParam.length === 0 ? true : filterParam.includes(String(laptopParam));
  }

function filterProducts() {
  return laptops
    .filter(item => applyCheckedFields(item.size, filter.size))
    .filter(item => applyCheckedFields(item.color, filter.color))
    .filter(item => applyCheckedFields(item.release_date, filter.release_date));
}

function showProducts() {
    const arrayProducts = filterProducts();
    const filteredMarkup = arrayProducts.reduce((acc, item) => acc + template(item), "");

  console.log(filteredMarkup);
  if (filteredMarkup === '') {
    container.innerHTML = UNDEFINED_QUERY
  } else {
    container.innerHTML = filteredMarkup;
  }
}

function clearCheckboxes(){
    filter.size = [];
  filter.color = [];
  filter.release_date = [];
  checkBoxes.forEach(box => (box.checked ? (box.checked = false) : null));
  container.innerHTML = murkup;
}