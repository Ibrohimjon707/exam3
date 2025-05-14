// let container = document.getElementById("div1");
// const searchInput = document.getElementById("searchInput");
// const sortSelect = document.getElementById("sortSelect");

// async function getName() {
//   try {
//     let response = await fetch(`https://fakestoreapi.com/products`);
//     let data = await response.json();

//     data.map((fetch4) => {
//       let card = document.createElement("div");
//       card.className = "card";
//       card.innerHTML = `
 
//         <img src="${fetch4.image}" alt="${fetch4.title}" width="100">
//         <h2>${fetch4.title.slice(0, 50)}</h2>
//         <h4 class="p2">category:${fetch4.category}</h4>
//          <p class="pe">price: ${fetch4.price}$</p>
       
//       `;
//       container.appendChild(card);
//     });

//     console.log(data);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//   }
// }


let container = document.getElementById("div1");
let  searchInput = document.getElementById("searchInput");
let sortSelect = document.getElementById("sortSelect");

let allProducts = [];

async function fetchProducts() {
  try {
    let res = await fetch("https://fakestoreapi.com/products");
    allProducts = await res.json();
    renderProducts(allProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function renderProducts(products) {
  container.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h2>${product.title.slice(0, 50)}</h2>
      <h4 class="p2">Category: ${product.category}</h4>
      <p class="pe">Price: $${product.price}</p>
    `;
    container.appendChild(card);
  });
}

function applyFilters() {
  const query = searchInput.value.toLowerCase();
  const sortValue = sortSelect.value;

  let filtered = allProducts.filter(product =>
    product.title.toLowerCase().includes(query)
  );

  if (sortValue === "title-asc") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortValue === "title-desc") {
    filtered.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortValue === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortValue === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  }  else if (sortValue === "category-men") {
    filtered = filtered.filter(product => product.category === "men's clothing");
  } else if (sortValue === "category-women") {
    filtered = filtered.filter(product => product.category === "women's clothing");
  } else if (sortValue === "category-jewelery") {
    filtered = filtered.filter(product => product.category === "jewelery");
  } else if (sortValue === "category-electronics") {
    filtered = filtered.filter(product => product.category === "electronics");
  }
  

  renderProducts(filtered);
}

searchInput.addEventListener("input", applyFilters);
sortSelect.addEventListener("change", applyFilters);

fetchProducts();


 
  
