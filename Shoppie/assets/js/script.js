"use strict";
const header = document.querySelector(".header");
const menuItems = document.querySelector(".header ul");
const showMenu = document.querySelector(".header .menu");
const contactBtn = document.querySelector(".btn.contact");
const contactForm = document.querySelector(".contact-us");
const closeContactForm = document.querySelector(".close-contact");
const closeRead = document.querySelector(".close-read");
const readMoreBtn = document.querySelector(".read-more-btn");
const readMoreTxt = document.querySelector(".read-more");
const cartBag = document.querySelector(".cart-div");
const bagCapacitiy = cartBag.querySelector(".cart-num");
const bagDiv = document.querySelector(".bag");
const bagContent = bagDiv.querySelector(".bag-content");
const bagTotalPrice = bagDiv.querySelector(".subtotal");
const closeBag = bagDiv.querySelector(".closeBag");
let cartNum = 0;
let totalPrice = 0;
bagCapacitiy.textContent = cartNum;
bagTotalPrice.textContent = `$${totalPrice}.00`;

const arrivals = document.querySelectorAll(
  ".arrivals .container .arrival-content .arrival-grid .arrival"
);
window.onscroll = () => {
  if (window.scrollY > 0) {
    header.style.cssText = "background-color:white;position:fixed;";
  } else {
    header.style.cssText = "background-color:transparent;";
  }
};
if (window.innerWidth <= 900) {
  menuItems.classList.add("hide");
}
showMenu.addEventListener("click", () => {
  menuItems.classList.toggle("hide");
});
contactBtn.addEventListener("click", () => {
  contactForm.classList.remove("hide");
});
closeContactForm.addEventListener("click", (e) => {
  contactForm.classList.add("hide");
});
closeRead.addEventListener("click", (e) => {
  readMoreTxt.classList.add("hide");
});
readMoreBtn.addEventListener("click", () => {
  readMoreTxt.classList.remove("hide");
});

arrivals.forEach((ele) => {
  const rateStars = ele.querySelectorAll(
    ".container .arrival-content .arrival-grid .arrival .arrival-rate i"
  );
  const addToCart = ele.querySelector(".fa-shopping-cart");
  rateStars.forEach((ele, indx) => {
    ele.addEventListener("click", () => {
      rateStars.forEach((element) => {
        element.classList.add("fa-star-o");
        element.classList.remove("fa-star");
      });
      for (let i = 0; i <= indx; i++) {
        rateStars[i].classList.remove("fa-star-o");
        rateStars[i].classList.add("fa-star");
      }
    });
  });
  const arrivalImgSrc = ele.querySelector("img").src;
  const arrivalName = ele.querySelector(".arrival-name").textContent;
  const arrivalPrice = ele.querySelector(".with-sale").textContent;
  const product = document.createElement("div");
  const productImgDiv = document.createElement("div");
  const productImg = document.createElement("img");
  const productDetails = document.createElement("div");
  const ProductName = document.createElement("div");
  const productQuantitiy = document.createElement("input");
  const spanPrice = document.createElement("span");
  const removeProd = document.createElement("span");
  removeProd.textContent = "X";
  removeProd.classList.add("remove-prod");
  product.classList.add("product");
  ProductName.classList.add("product-name");
  productImgDiv.classList.add("product-img");
  productImg.src = arrivalImgSrc;
  productDetails.classList.add("product-details");
  productQuantitiy.classList.add("number-quantity");
  productQuantitiy.type = "number";
  spanPrice.classList.add("price");
  productQuantitiy.min = 0;
  productQuantitiy.value = 0;
  ProductName.textContent = arrivalName;
  spanPrice.textContent = arrivalPrice;

  addToCart.addEventListener("click", () => {
    bagCapacitiy.textContent = Number(bagCapacitiy.textContent) + 1;
    bagContent.appendChild(product);
    product.appendChild(productImgDiv);
    product.appendChild(spanPrice);
    product.appendChild(removeProd);
    productImgDiv.appendChild(productImg);
    productImgDiv.appendChild(productDetails);
    productDetails.appendChild(ProductName);
    productDetails.appendChild(productQuantitiy);

    // التأكد من عدم تكرار زيادة الكمية
    if (Number(productQuantitiy.value) === 0) {
      productQuantitiy.value = 1;
    } else {
      productQuantitiy.value = Number(productQuantitiy.value) + 1;
    }

    spanPrice.textContent = `$${
      Number(arrivalPrice.slice(1)) * productQuantitiy.value
    }.00`;

    // حساب السعر الكلي بإضافة سعر المنتج فقط عند الإضافة إلى السلة
    totalPrice += Number(arrivalPrice.slice(1));
    bagTotalPrice.textContent = `$${totalPrice}.00`;
  });

  productQuantitiy.addEventListener("change", () => {
    const previousQuantity = Number(productQuantitiy.defaultValue) || 1;
    const newQuantity = Number(productQuantitiy.value);

    const pricePerUnit = Number(arrivalPrice.slice(1));
    const difference = (newQuantity - previousQuantity) * pricePerUnit;

    bagCapacitiy.textContent =
      Number(bagCapacitiy.textContent) + (newQuantity - previousQuantity);

    totalPrice += difference;
    bagTotalPrice.textContent = `$${totalPrice}.00`;

    spanPrice.textContent = `$${pricePerUnit * newQuantity}.00`;

    productQuantitiy.defaultValue = newQuantity;
  });

  removeProd.addEventListener("click", () => {
    totalPrice -= Number(spanPrice.textContent.slice(1));
    bagTotalPrice.textContent = `$${totalPrice}.00`;
    bagCapacitiy.textContent =
      Number(bagCapacitiy.textContent) - productQuantitiy.value;
    productQuantitiy.value = 0;
    product.remove();
  });
});

cartBag.addEventListener("click", () => {
  bagDiv.classList.toggle("hide");
});

closeBag.addEventListener("click", () => {
  bagDiv.classList.add("hide");
});
