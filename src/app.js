// variables
const nav = document.querySelector(".nav");
const productsCont = document.querySelector(".products");

// getting the products
class Products {
  async getProducts() {
    try {
      let result = await fetch("product-list.json");
      let data = await result.json();
      let products = data.responses[0];
      let userCategories = [];
      let recommendedProducts = [];
      products = products.map((response) => {
        recommendedProducts = response.params.recommendedProducts;
        userCategories = response.params.userCategories;

        // console.log(userCategories);
        // console.log(userCategories.map((item) => recommendedProducts[item]));
        const items = userCategories.map((item) => recommendedProducts[item]);
        // console.log(items);
        items.forEach((item) => {
          item.map((item) => {
            const price = item.priceText;
            const imgUrl = item.image;
            const title = item.name;
            const shippingFee = item.params.shippingFee;
            // console.log(item);
            // console.log(price);
            let productCart = [];
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

            productsCont.innerHTML = productCart;
            // console.log(productCart);
          });
        });
        // const filter = userCategories.find((item) => recommendedProducts[item]);
        // console.log(filter);
      });
      this.displayCategories(userCategories);
      return products;
    } catch (error) {
      console.log(error);
    }
  }
  displayCategories(categories) {
    let result = [];
    categories.forEach((category) => {
      const title = category.split(">")[0];
      result += `<li class="nav-item">
      <span></span>
      <a href="#" class="nav-item-link">${title}</a>
    </li>`;
    });
    const ul = document.createElement("ul");
    ul.classList.add("nav-items");
    ul.innerHTML = result;
    nav.appendChild(ul);
  }

  displayProducts(category) {
    let result = `<div class="product">
    <div class="product-top">
      <img
        src="https://i.pinimg.com/564x/96/75/c2/9675c233354617bc3d956030acc18be6.jpg"
        alt="product img"
        class="product-img"
      />
    </div>
    <div class="product-bottom">
      <p class="product-name">
        Pro Cat Plus x ST32445 Li Metal Sanzimanli Cift Akulu
      </p>
      <div class="product-price">123,32 TL</div>
      <div class="product-delivery">
        <i class="fas fa-truck del-icon"></i>
        <span class="delivery-text">Ucretsiz Kargo</span>
      </div>
      <button class="product-button">Sepete Ekle</button>
    </div>
  </div>`;
    return result;
  }
}

//
document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  products.getProducts();
});
