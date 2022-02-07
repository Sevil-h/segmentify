const containerDOM = document.querySelector(".container");
const container = document.querySelector(".products-container");
const nav = document.querySelector(".nav");
const productsCont = document.querySelector(".products");
const popup = document.querySelector(".pop-up");

let userCategories = [];
let recommendedProducts = [];
class Products {
  async getProducts() {
    let result = await fetch("product-list.json");
    let data = await result.json();
    let products = data.responses[0];

    products = products.map((response) => {
      recommendedProducts = response.params.recommendedProducts;
      userCategories = response.params.userCategories;
    });
    this.displayCategories(userCategories);

    try {
    } catch (error) {
      console.log(error);
    }
  }

  displayCategories(categories) {
    let result = [];
    categories.forEach((category) => {
      const title = category;
      // const title = category.split(">")[0];
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
    const choosenCateg = links.map((link) => {
      link.addEventListener("click", (e) => {
        const categ = e.target.innerText;
        this.displayProducts(categ);
      });
    });
  }

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

    const btns = [...document.querySelectorAll(".product-button")];
    btns.map((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(e.target);
        popup.style.display = "flex";
      });

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
  products.getProducts();
});
