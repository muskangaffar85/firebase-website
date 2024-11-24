// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCNfe6t6KpR1DdZc-dLObuhE2BG0q3n2M",
  authDomain: "web-app-project-bb6e8.firebaseapp.com",
  projectId: "web-app-project-bb6e8",
  storageBucket: "web-app-project-bb6e8.firebasestorage.app",
  messagingSenderId: "995424022140",
  appId: "1:995424022140:web:06e32105de5453973223f9",
  measurementId: "G-J6KGXDDV6Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };







import { productDetails } from "./data.js";
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const navClose = document.getElementById("close");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

const productContainer = document.getElementById("pro-container");
const addProductButton = document.getElementById("add-product-button");
const addModal = document.getElementById("add-modal");
const modalContent = document.getElementsByClassName("modal__content");
const backdrop = document.getElementById("backdrop");
const renderProductButton = document.getElementById("modal-add-btn");
const cancelButton = document.getElementById("modal-cancel-btn");
/*
!===================================================================================================================
*====================================================Shop Page Below================================================
!===================================================================================================================
*/

function addProductToPage() {
  const title = document.getElementById("title").value;
  const brand = document.getElementById("brand").value;
  const imageSrc = document.getElementById("image-url").value;
  const price = document.getElementById("price").value;

  const product = {
    id: Math.random(),
    name: title,
    brand: brand,
    price: price,
    img: "img/products/" + imageSrc + ".jpg",
  };

  productDetails.push(product);
  removeAddMovieBanner();
  renderProduct();
  clearInputs();
}

const renderProduct = () => {
  return (productContainer.innerHTML = productDetails
    .map((x) => {
      let { id, name, brand, price, img } = x;
      return ` <div class="pro" id="${id}" data-product-id>
      <img src="${img}" class="pro-img" alt="">
      <div class="description">
      <span class="pro-brand">${brand}</span>
      <h5 class="pro-title">${name}</h5>
                <div class="star">
                <i class="fas fa-star"></i> 
                <i class="fas fa-star"></i> 
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                </div>
                <h4 class="pro-price">$ ${price}</h4>
                </div>
                <div id="${id}" onclick="addToCart(${id})">
                <a href="#">
                <i class="fal fa-shopping-cart cart" ></i>
                </a>
                </div>
                </div>`;
    })
    .join(""));
};

renderProduct();

// ===============================================================
function showAddMovieBanner() {
  addModal.classList.add("visible");
  backdrop.classList.add("visible");
}

function removeAddMovieBanner() {
  addModal.classList.remove("visible");
  backdrop.classList.remove("visible");
  clearInputs();
}
addProductButton.addEventListener("click", showAddMovieBanner);
renderProductButton.addEventListener("click", addProductToPage);
cancelButton.addEventListener("click", removeAddMovieBanner);

function clearInputs() {
  const inputs = document.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[0].value = "";
  }
}

const product = productContainer.querySelectorAll(".pro");
for (let i = 0; i < product.length; i++) {
  product[i].addEventListener("click", (event) => {
    const selectedItem = event.currentTarget.getAttribute("id");
    window.location.href = "sproduct.html?id=" + selectedItem;
  });
  
}



import { auth } from './firebaseConfig.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const signup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            console.log("User signed up:", userCredential.user);
        })
        .catch(error => {
            console.error("Error signing up:", error.message);
        });
};

const signin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            console.log("User signed in:", userCredential.user);
        })
        .catch(error => {
            console.error("Error signing in:", error.message);
        });
};
