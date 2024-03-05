const loadAllProducts = async (query) => {
  document.getElementById("loading-cotnainer").style.display = "block";
  console.log(query);
  const response = await fetch(`https://fakestoreapi.com/products${query}`);
  const data = await response.json();

  console.log(data);

  if (!data.length) {
    document.getElementById("not-found").style.display = "block";
    document.getElementById("loading-cotnainer").style.display = "none";
  }

  if (data.length > 0) {
      document.getElementById("loading-cotnainer").style.display = "none";
      document.getElementById("not-found").style.display = "none";
  }

  const productContainer = document.getElementById("products-container");
  productContainer.innerHTML = "";
  data.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img
            class="product-img"
            src=${product.image}
            alt=""
          />
          <h3>${product.title}</h3>
          <div class="price-category">
            <h4>price: ${product.price} $</h4>
            <button class="category-btn" disabled>men's clothing</button>
          </div>
          <hr />
          <div class="price-container">
            <div class="icon-container">
              <img class="icon" src="./image/view.png" alt="" />
              <h4>450</h4>
            </div>
            <div class="icon-container">
              <img class="icon" src="./image/star.png" alt="" />
              <h4>4.5/5</h4>
            </div>
            <button onclick="addToCart('${product.title}','${product.price}')" class="add-btn">Add To Cart</button>
          </div>
      
      `;

    productContainer.append(div);
  });
};

const handleSearch = () => {
  const value = document.getElementById("search-box").value;

  loadAllProducts(`/category/${value}`);
};



const addToCart = (name,price) => {
    const cartContainer = document.getElementById("cart");
    const div = document.createElement("div")
        ;
    div.classList.add("cart-info");
    div.innerHTML = `
    <h4>${name}</h4>
          <h4>${price}</h4>
    `;
    cartContainer.appendChild(div)
        ;
}


loadAllProducts("");
