let cartCount = 0;
let totalPrice = 0;

const loadAllProducts = () => {
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => displayProducts(data))
    .catch(error => console.error("Error loading products:", error));
};

const displayProducts = (products) => {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";

  products.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("single-product");

    div.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h6 class="mt-2">${product.title.slice(0, 20)}...</h6>
      <p class="text-success fw-bold">$${product.price}</p>
      <div class="d-flex justify-content-center gap-2">
        <button class="btn btn-outline-primary btn-sm" onclick="showProductDetails(${product.id})">Details</button>
        <button class="btn btn-success btn-sm" onclick="handleAddToCart('${product.title}', ${product.price})">Add to Cart</button>
      </div>
    `;
    productContainer.appendChild(div);
  });
};

const handleAddToCart = (name, price) => {
  cartCount++;
  totalPrice += price;

  document.getElementById("count").innerText = cartCount;
  document.getElementById("total").innerText = totalPrice.toFixed(2);

  const container = document.getElementById("cart-main-container");
  const div = document.createElement("div");
  div.classList.add("card-info");

  div.innerHTML = `
    <p>${name.slice(0, 12)}...</p>
    <h6>$${price.toFixed(2)}</h6>
  `;

  container.appendChild(div);
};

const showProductDetails = (id) => {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then(response => response.json())
    .then(product => {
      document.getElementById("modalTitle").innerText = product.title;
      document.getElementById("modalImage").src = product.image;
      document.getElementById("modalPrice").innerText = `Price: $${product.price}`;
      document.getElementById("modalDescription").innerText = product.description;

      const modal = new bootstrap.Modal(document.getElementById("productModal"));
      modal.show();
    })
    .catch(error => console.error("Error loading product details:", error));
};

loadAllProducts();
