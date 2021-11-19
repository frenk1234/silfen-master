const urlParams = new URLSearchParams(window.location.search);
const cat = urlParams.get("category");
url =
  "http://magmadesign.dk/wp21/wp-json/wp/v2/bag?_embed&per_page=100&categories=" +
  cat;

fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    handleProductList(data);
  });

function handleProductList(data) {
  console.log(data);
  data.forEach(showBag);
}

function showBag(bag) {
  console.log(bag);
  const shCard = document.querySelector("#bag-template").content;
  const clone = shCard.cloneNode(true);
  clone.querySelector(".material").textContent = bag.material;
  if (bag.material === "Recycled Nylon") {
    clone.querySelector(".material").classList.add("opt1");
  } else {
    clone.querySelector(".material").classList.add("opt2");
  }

  if (bag.sold_out >= 1) {
    clone.querySelector(".sold-out-tag").classList.remove("hidden");
    clone.querySelector(".bag-pic").classList.add("opacity");
    clone.querySelector(".quickview").classList.add("hidden2");
    clone.querySelector(".card-info").classList.add("grey-txt");
    clone.querySelector(".card-title").classList.add("grey-txt");
  }

  if (bag.discount_price > 0) {
    clone.querySelector(".off").classList.remove("hidden");
    clone.querySelector(".off").textContent = `${bag.discount_price} kr.`;
    clone.querySelector(".price").classList.add("old-price");
  }
  clone.querySelector(".bag-pic").src = bag.front_img.guid;
  //   clone.querySelector(".bag-pic2").src = bag.model_img.guid;
  clone.querySelector(".card-title").textContent = bag.model;
  clone.querySelector(".color-name").textContent = bag.color;
  clone.querySelector(".price").textContent = `${bag.price} kr.`;
  clone
    .querySelector(".bag-link")
    .setAttribute("href", "bag.html?id=" + bag.id);
  clone
    .querySelector(".card-title")
    .setAttribute("href", "bag.html?id=" + bag.id);
  const aEl = clone.querySelector(".quickview");
  aEl.addEventListener("click", showPopUp);

  function showPopUp(e) {
    e.preventDefault();
    document.querySelector("#pop-up").classList.remove("hidden2");
    document.querySelector("#qv-img1").src = bag.front_img.guid;
    document
      .querySelector("#close-pop-up")
      .addEventListener("click", closePopUp);
  }

  const parent = document.querySelector(".bag-grid");
  parent.appendChild(clone);
  document.querySelector(".drop-arrow").addEventListener("click", showDrop);
  document.querySelector(".mat-arrow").addEventListener("click", showMat);
  document.querySelector(".type-arrow").addEventListener("click", showType);
  document.querySelector(".color-arrow").addEventListener("click", showColor);
}

function showDrop() {
  document.querySelector(".drop-arrow").removeEventListener("click", showDrop);
  document.querySelector(".drop-list").classList.remove("hidden2");
  document.querySelector(
    ".drop-arrow"
  ).innerHTML = `<i class="fas fa-chevron-down"></i>`;
  document.querySelector(".drop-arrow").addEventListener("click", closeDrop);
}

function showMat() {
  document.querySelector(".mat-arrow").removeEventListener("click", showMat);
  document.querySelector(".mat-list").classList.remove("hidden2");
  document.querySelector(
    ".mat-arrow"
  ).innerHTML = `<i class="fas fa-chevron-down"></i>`;
  document.querySelector(".mat-arrow").addEventListener("click", closeMat);
}

function showType() {
  document.querySelector(".type-arrow").removeEventListener("click", showType);
  document.querySelector(".type-list").classList.remove("hidden2");
  document.querySelector(
    ".type-arrow"
  ).innerHTML = `<i class="fas fa-chevron-down"></i>`;
  document.querySelector(".type-arrow").addEventListener("click", closeType);
}

function showColor() {
  document
    .querySelector(".color-arrow")
    .removeEventListener("click", showColor);
  document.querySelector(".color-list").classList.remove("hidden2");
  document.querySelector(
    ".color-arrow"
  ).innerHTML = `<i class="fas fa-chevron-down"></i>`;
  document.querySelector(".color-arrow").addEventListener("click", closeColor);
}

function closeDrop() {
  document.querySelector(".drop-arrow").removeEventListener("click", closeDrop);
  document.querySelector(".drop-list").classList.add("hidden2");
  document.querySelector(
    ".drop-arrow"
  ).innerHTML = `<i class="fas fa-chevron-right"></i>`;
  document.querySelector(".drop-arrow").addEventListener("click", showDrop);
}

function closeMat() {
  document.querySelector(".mat-arrow").removeEventListener("click", closeMat);
  document.querySelector(".mat-list").classList.add("hidden2");
  document.querySelector(
    ".mat-arrow"
  ).innerHTML = `<i class="fas fa-chevron-right"></i>`;
  document.querySelector(".mat-arrow").addEventListener("click", showMat);
}

function closeType() {
  document.querySelector(".type-arrow").removeEventListener("click", closeType);
  document.querySelector(".type-list").classList.add("hidden2");
  document.querySelector(
    ".type-arrow"
  ).innerHTML = `<i class="fas fa-chevron-right"></i>`;
  document.querySelector(".type-arrow").addEventListener("click", showType);
}

function closeColor() {
  document
    .querySelector(".color-arrow")
    .removeEventListener("click", closeColor);
  document.querySelector(".color-list").classList.add("hidden2");
  document.querySelector(
    ".color-arrow"
  ).innerHTML = `<i class="fas fa-chevron-right"></i>`;
  document.querySelector(".color-arrow").addEventListener("click", showColor);
}

function closePopUp() {
  document.querySelector("#pop-up").classList.add("hidden2");
}
