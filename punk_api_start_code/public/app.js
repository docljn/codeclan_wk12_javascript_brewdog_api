const app = function () {

  const url = "https://api.punkapi.com/v2/beers";
  makeRequest(url, carryOutAPIRequest);


};

// get data from api (call in app, after DOMContentLoaded event)
const makeRequest = function (url, callback) {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
};

const carryOutAPIRequest = function () {
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const beers = JSON.parse(jsonString);
  console.log("API Request retrieved beers");
  console.log(beers);

  displayBeers(beers);
};

const makeBeerListing = function (beer) {
  const ulOuter = document.getElementById("beers-ul");
  const liOuter = document.createElement("li");
  liOuter.innerText = beer.name;
  liOuter.className += " beer_details";

  const ulInner = document.createElement("ul");
  const liInner = document.createElement("li");

  const beerImage = document.createElement("img");
  beerImage.src = beer.image_url;
  beerImage.setAttribute("width", 60);
  beerImage.setAttribute("alt", "A picture of " + beer.name);

  const liInnerSecond = document.createElement("li");
  liInnerSecond.className += " ingredients";
  liInnerSecond.innerText = "Malts";
  beer.ingredients.malt[0].name;

  const liInnerThird = document.createElement("li");
  liInnerThird.className += " malts";

  const maltsListArray = beer.ingredients.malt;

  const maltsNamesList = maltsListArray.reduce ( function (list, malt ) {
    list += (malt.name + "\n");
    return list;
  },"");

  liInnerThird.innerText = maltsNamesList;



  liInner.appendChild(beerImage);
  ulInner.appendChild(liInner);
  ulInner.appendChild(liInnerSecond);
  ulInner.appendChild(liInnerThird);

  liOuter.appendChild(ulInner);
  ulOuter.appendChild(liOuter);
};

const displayBeers = function (beers) {
  beers.forEach(function (beer) {
    makeBeerListing(beer);
  });
};




document.addEventListener("DOMContentLoaded", app);
