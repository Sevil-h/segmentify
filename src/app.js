// variables
const containerDOM = document.querySelector(".container");
const container = document.querySelector(".products-container");
const nav = document.querySelector(".nav");
const productsCont = document.querySelector(".products");
const popup = document.querySelector(".pop-up");

let userCategories = [];
let recommendedProducts = [];
let seconds = 0;

// getting the products
class Products {
  async getProducts() {
    let result = await fetch("product-list.json");
    let data = await result.json();
    let products = data.responses[0];

    products = products.map((response) => {
      recommendedProducts = response.params.recommendedProducts;
      userCategories = response.params.userCategories;
    });
    try {
    } catch (error) {
      console.log(error);
    }
  }
}

// display products
class UI {
  // display categories
  displayCategories(categories) {
    let result = [];
    categories.forEach((category) => {
      const title = category;
      result += `<li class="nav-item">
        <span></span>
        <a href="#" class="nav-item-link">${title}</a>
      </li>`;
    });
    const ul = document.createElement("ul");
    ul.classList.add("nav-items");
    ul.innerHTML = result;
    nav.appendChild(ul);
    const links = [...document.querySelectorAll(".nav-item-link")];
    const linkLength = links.length;
    links.map((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const categ = e.target.innerText;
        // display products from choosen ctegory
        this.displayProducts(categ);
        // trigger category link
        const currentElement = e.target;
        console.log(e.target.previousElementSibling);
        for (let i = 0; i < linkLength; i++) {
          if (links[i] === currentElement) {
            links[i].classList.add("nav-item-active");
            links[i].previousElementSibling.classList.add("active");
          } else {
            links[i].classList.remove("nav-item-active");
            links[i].previousElementSibling.classList.remove("active");
          }
        }
      });
    });
  }
  // display products from choosen category
  displayProducts(products) {
    let productCart = [];
    let categories = recommendedProducts[products];
    categories.map((product) => {
      const title = product.name;
      const imgUrl = product.image;
      const price = product.priceText;
      const shippingFee = product.params.shippingFee;
      productCart += `<div class="product">
      <div class="product-top">
        <img
          loading="lazy"
          src=${imgUrl}
          alt="product img"
          class="product-img"
        />
      </div>
      <div class="product-bottom">
        <p class="product-name">
          ${title}
        </p>
        <div class="product-price">${price}</div>
        <div class="product-delivery">
          <i class="fas fa-truck del-icon"></i>
          <span class="delivery-text">${
            shippingFee === "FREE" ? "Ucretsiz Kargo" : ""
          }</span>
        </div>
        <button class="product-button">Sepete Ekle</button>
      </div>
    </div>`;
    });
    productsCont.innerHTML = productCart;

    // show popup
    const btns = [...document.querySelectorAll(".product-button")];
    btns.map((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(e.target);
        popup.style.display = "flex";
      });

      // close popup
      const close = document.querySelector(".close");
      close.addEventListener("click", (e) => {
        e.preventDefault();
        popup.style.display = "none";
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  const ui = new UI();
  products.getProducts().then((products) => {
    ui.displayCategories(userCategories);
    ui.displayProducts((products = "Size Özel"));
  });
});
