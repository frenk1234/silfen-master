const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
url = "http://magmadesign.dk/wp21/wp-json/wp/v2/bag/" + id;
console.log(url);
// document.querySelector("#prod-list-title").textContent = id;

fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    showBag(data);
  });

function showBag(bag) {
  console.log(bag.material);
  document.title = `${bag.model} - Silfen Webshop`;
  document.querySelector("#product-name").textContent = bag.model;
  document.querySelector("#drop-info").textContent = bag.drop;
  document.querySelector("#prod-img1").src = bag.front_img.guid;
  document.querySelector("#prod-img1").src = bag.front_img.guid;
  document.querySelector("#prod-color").textContent = bag.color;
  document.querySelector("#prod-img1").classList.add("pos1");
  document.querySelector("#prod-img2").src = bag.side_img.guid;
  document.querySelector("#prod-img2").classList.add("pos2");
  document.querySelector("#prod-img3").src = bag.inside_img.guid;
  document.querySelector("#prod-img3").classList.add("pos3");
  document.querySelector("#prod-price").textContent = `${bag.price} kr.`;
  document.querySelector("#bag-material").textContent = bag.material;
  if (bag.material === "Recycled Nylon") {
    document.querySelector("#bag-material").classList.add("opt11");
  } else {
    document.querySelector("#bag-material").classList.add("opt22");
  }
  if (bag.sold_out >= 1) {
    console.log("sold out");
    document.querySelector("#bag-material").classList.add("hidden2");
    document.querySelector("#buy").classList.add("hidden2");
    document.querySelector("#drop-fav").classList.add("grey-txt");
    document.querySelector("#price-flex").classList.add("grey-txt");
    document.querySelector("#prod-color").classList.add("grey-txt");
    document.querySelector("#product-name").classList.add("grey-txt");
  } else {
    document.querySelector(".sold-out-txt").classList.add("hidden2");
  }
  if (bag.discount_price > 0) {
    console.log(bag.discount_price);
    document.querySelector(".new-price").classList.remove("hidden2");
    document.querySelector(
      ".new-price"
    ).textContent = `${bag.discount_price} kr.`;
    document.querySelector("#prod-price").classList.add("old-price");
  }
  document.querySelector("#description").innerHTML = bag.short_description;
  document.querySelector("#specs").innerHTML = bag.description;
  document.querySelector("#prod-img2").addEventListener("click", clickImg2);
  document.querySelector("#prod-img3").addEventListener("click", clickImg3);
  document
    .querySelector("#delivery-arrow")
    .addEventListener("click", showDelivery);
  document.querySelector("#specs-arrow").addEventListener("click", showSpecs);
}

function showDelivery() {
  document
    .querySelector("#delivery-arrow")
    .removeEventListener("click", showDelivery);
  document.querySelector("#delivery-txt").classList.remove("hidden2");
  document.querySelector(
    "#delivery-arrow"
  ).innerHTML = `<i class="fas fa-chevron-down"></i>`;
  document
    .querySelector("#delivery-arrow")
    .addEventListener("click", closeDelivery);
}

function closeDelivery() {
  document
    .querySelector("#delivery-arrow")
    .removeEventListener("click", closeDelivery);
  document.querySelector("#delivery-txt").classList.add("hidden2");
  document.querySelector(
    "#delivery-arrow"
  ).innerHTML = `<i class="fas fa-chevron-right"></i>`;
  document
    .querySelector("#delivery-arrow")
    .addEventListener("click", showDelivery);
}

function showSpecs() {
  document
    .querySelector("#delivery-arrow")
    .removeEventListener("click", showSpecs);
  document.querySelector("#specs").classList.remove("hidden2");
  document.querySelector(
    "#specs-arrow"
  ).innerHTML = `<i class="fas fa-chevron-down"></i>`;
  document.querySelector("#specs-arrow").addEventListener("click", closeSpecs);
}

function closeSpecs() {
  document
    .querySelector("#specs-arrow")
    .removeEventListener("click", closeSpecs);
  document.querySelector("#specs").classList.add("hidden2");
  document.querySelector(
    "#specs-arrow"
  ).innerHTML = `<i class="fas fa-chevron-right"></i>`;
  document.querySelector("#specs-arrow").addEventListener("click", showSpecs);
}

function clickImg2() {
  document.querySelector("#prod-img2").removeEventListener("click", clickImg2);
  document.querySelector("#prod-img1").classList.remove("pos1");
  document.querySelector("#prod-img2").classList.remove("pos2");
  document.querySelector("#prod-img2").classList.add("pos1");
  document.querySelector("#prod-img1").classList.add("pos2");
  document.querySelector("#prod-img1").addEventListener("click", reClickImg2);
}

function reClickImg2() {
  document
    .querySelector("#prod-img2")
    .removeEventListener("click", reClickImg2);
  document.querySelector("#prod-img1").classList.remove("pos2");
  document.querySelector("#prod-img2").classList.remove("pos1");
  document.querySelector("#prod-img2").classList.add("pos2");
  document.querySelector("#prod-img1").classList.add("pos1");
  document.querySelector("#prod-img2").addEventListener("click", clickImg2);
}

function clickImg3() {
  document.querySelector("#prod-img3").removeEventListener("click", clickImg3);
  document.querySelector("#prod-img1").classList.remove("pos1");
  document.querySelector("#prod-img3").classList.remove("pos3");
  document.querySelector("#prod-img3").classList.add("pos1");
  document.querySelector("#prod-img1").classList.add("pos3");
  document.querySelector("#prod-img1").addEventListener("click", reClickImg3);
}

function reClickImg3() {
  document
    .querySelector("#prod-img3")
    .removeEventListener("click", reClickImg2);
  document.querySelector("#prod-img1").classList.remove("pos3");
  document.querySelector("#prod-img3").classList.remove("pos1");
  document.querySelector("#prod-img3").classList.add("pos3");
  document.querySelector("#prod-img1").classList.add("pos1");
  document.querySelector("#prod-img3").addEventListener("click", clickImg3);
}

{
  /* <section id="prod">
<div id="img-grid">
    <img id="prod-img1" alt="">
    <img id="prod-img2" alt="">
    <img id="prod-img3" alt="">
</div>
<div id="prod-info">
    <div id="drop-fav">
        <p id="drop-info"></p>
        <i class="far fa-heart"></i>
        <!-- <i class="fas fa-heart"></i> -->
    </div>
    <h1 id="product-name"></h1>
    <div id="price-flex">
        <p id="prod-price"></p>
        <p class="new-price"></p>
    </div>
    <p>Colors</p>
    <div id="color-opt">
        <template id="color-opt-template">
            <a href="bag.html"></a>
        </template>
    </div>
    <p id="prod-color"></p>
    <p class="sold-out-txt">Sorry, this product is sold out. We can let you know when is back though!</p>
    <button class="buy">ADD TO BASKET</button>
    <p id="description"></p>
    <div id="specs">
        <h3>DESCRIPTION <i class="fas fa-chevron-right"></i></h3>
    </div> */
}
