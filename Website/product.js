// import { singleProduct } from "./data";
import { productDetails } from "./data.js";
/*
!===================================================================================================================
!===================================================================================================================
*==========================================Single Product Page Below================================================
!===================================================================================================================
!===================================================================================================================
*/

const singleProductContainer = document.getElementById("pro-details");
const imageDiv = singleProductContainer.querySelector(".single-pro-image");
const detailsDiv = singleProductContainer.querySelector(".single-pro-details");
console.log(imageDiv);

const urlParms = new URLSearchParams(window.location.search);
const productId = urlParms.get("id");
console.log("Got : " + productId);

function productIdSearch(items, id) {
  const index = items.findIndex((item, index) => {
    return item.id === id;
  });
  return productDetails[index];
}

const product = productIdSearch(productDetails, productId);
// console.log(product);

imageDiv.innerHTML = `
<img src="${product.img}" width="100%" id="MainImg" alt="">
            <div class="small-img-group">
                <div class="small-img-col">
                    <img src="img/products/f1.jpg" width="100%" class="small-img" alt="">
                </div>
                <div class="small-img-col">
                    <img src="img/products/f2.jpg" width="100%" class="small-img" alt="">
                </div>
                <div class="small-img-col">
                    <img src="img/products/f3.jpg" width="100%" class="small-img" alt="">
                </div>
                <div class="small-img-col">
                    <img src="img/products/f4.jpg" width="100%" class="small-img" alt="">
                </div>
            </div>
`;

detailsDiv.innerHTML = `
<h6>Home / T-Shirt</h6>
<h4>${product.name}</h4>
<h2>$${product.price}</h2>
<select>
    <option>Select Size</option>
    <option>XL</option>
    <option>XXL</option>
    <option>Small</option>
    <option>Large</option>
</select>
<input type="number" value="1">
<button class="normal add-to-cart">Add To Cart</button>
<h4>Product Details : </h4>
<span>
<strong>Name :</strong> ${product.name}<br>
<strong>Brand :</strong>${product.brand}<br>
Net Quantity (N) : 1 <br>
<strong>Sizes :</strong><br>
<strong>S</strong> (Bust Size : 34 in, Length Size: 24 in)<br>
<strong>L</strong> (Bust Size : 38 in, Length Size: 25 in)<br>
<strong>XL</strong> (Bust Size : 40 in, Length Size: 25 in)<br>
Country of Origin : India</span>
`;
let cartItemsStorage;

if (localStorage.getItem("cartProducts") == null) {
  cartItemsStorage = [];
} else {
  cartItemsStorage = JSON.parse(localStorage.getItem("cartProducts"));
}

function addToCartFunction() {
  const addToCartBtn = document.querySelector(".add-to-cart");
  addToCartBtn.addEventListener("click", () => {
    cartItemsStorage.push(product);
    localStorage.setItem("cartProducts", JSON.stringify(cartItemsStorage));
    console.log(cartItemsStorage);
    window.location.href = "cart.html?id=" + productId;
  });
}

addToCartFunction();