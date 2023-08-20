// -------------------- Get Element -------------------- //
var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var inputs = document.getElementsByClassName("form-control");
// --------------- btn --------------- //
// ----- btn add ----- //
var btnProduct = document.getElementById("addProduct");
// ----- btn search ----- //
var searchInput = document.getElementById("btnSearch");
// ----- btn delete ----- //
var contDeleteData = document.getElementById("contDelete");
var btnDeleteAll = document.getElementById("btnDeleteData");
var deleteSureYes = document.getElementById("deleteSureYes");
// ----- btn restForm ----- //
var deletDataForm = document.getElementById("restForm");
// -------------------- alert -------------------- //
var alertSucces = document.getElementById("alertSucces");
var alertDelete = document.getElementById("alertDelete");
// --------------- //
var totalProudcts = document.getElementById("totalProudcts");
var tableBody = document.getElementById("tableBody");
// Variable To Save Data (Cartona)
var products = [];
// Display Local Storage
if (JSON.parse(localStorage.getItem("productList") != null)) {
   products = getLocalStroage();
   displayData();
   totalProd();
}
// --------------------  Events -------------------- //
// --------------- add btn
btnProduct.onclick = function () {
   if (btnProduct.innerHTML == "Add Product") {
      getData(); // for get data if click to add product
   } else {
      updateProducts(); // for get data if click to update
      btnProduct.innerHTML = "Add Product";
      btnProduct.classList.replace("btn-warning", "btn-primary");
   }
   displayData();
   resetForm();
   totalProd();
};
// --------------- delete btn //
btnDeleteAll.onclick = function () {
   contDeleteData.classList.toggle("d-none");
};
deleteSureYes.onclick = function () {
   deleteFullData();
   setLocalStroage();
   btnProduct.innerHTML = "Add Product";
   btnProduct.classList.replace("btn-warning", "btn-primary");
   contDeleteData.classList.add("d-none");
};
// --------------- search onKeyUP //
btnSearch.onkeyup = function () {
   searchData();
};
// --------------- delet Data Form Reset //
deletDataForm.onclick = function () {
   if (btnProduct.innerHTML != "Update") {
      resetForm();
   }
};
// --------------------  Functions -------------------- //
// --------------- To Get Data
function getData() {
   var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      description: productDescriptionInput.value,
   };
   products.push(product);
   setLocalStroage();
}
// --------------- To Display Data
function displayData() {
   var cartona = "";
   for (var i = 0; i < products.length; i++) {
      cartona += `
      <tr>
      <th>${i + 1}</th>
      <td>${products[i].name}</td>
      <td>${products[i].price}</td>
      <td>${products[i].category}</td>
      <td>${products[i].description}</td>
      <td >
      <button onclick="getUpdateInfo(${i})" class="btn btn-sm btn-warning" type="button">Update</button>
      <button onclick="deleteRow(${i})" class="btn btn-sm btn-danger" type="button">Delete</button>
      </td>
   </tr>
      `;
   }
   tableBody.innerHTML = cartona;
}
// --------------- To Reset Form
function resetForm() {
   for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
   }
}
// --------------- To Search Data
function searchData() {
   var cartona = "";
   for (var i = 0; i < products.length; i++) {
      if (
         products[i].name
            .toLowerCase()
            .includes(searchInput.value.toLowerCase())
      ) {
         cartona += `
         <tr>
         <th>${i + 1}</th>
         <td>${products[i].name}</td>
         <td>${products[i].price}</td>
         <td>${products[i].category}</td>
         <td>${products[i].description}</td>
         <td >
         <button onclick="getUpdateInfo(${i})" class="btn btn-sm btn-warning" type="button">Update</button>
         <button onclick="deleteRow(${i})" class="btn btn-sm btn-danger" type="button">Delete</button>
         </td>
      </tr>
         `;
      }
   }
   tableBody.innerHTML = cartona;
}
// --------------- To Delete Row
function deleteRow(index) {
   products.splice(index, 1);
   displayData();
   totalProd();
   setLocalStroage();
}
// --------------- To get Update Info
var curentIndexUpdate = 0; // to use in update data by index
function getUpdateInfo(index) {
   curentIndexUpdate = index;
   for (var i = 0; i < Object.keys(products[index]).length; i++) {
      inputs[i].value = Object.values(products[index])[i];
   }
   btnProduct.classList.replace("btn-primary", "btn-warning");
   btnProduct.innerHTML = "Update";
}
// --------------- To  Update Products
function updateProducts() {
   var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      description: productDescriptionInput.value,
   };
   products[curentIndexUpdate] = product;
   setLocalStroage();
}
// --------------- To Total Products
function totalProd() {
   totalProudcts.innerHTML = `${products.length}`;
}
// --------------- To delete Full Data
function deleteFullData() {
   products.splice(0, products.length);
   displayData();
   totalProd();
}
// --------------- To Set Data To Local Storage
function setLocalStroage() {
   localStorage.setItem("productList", JSON.stringify(products));
}
// --------------- To get Data To Local Storage
function getLocalStroage() {
   return JSON.parse(localStorage.getItem("productList"));
}
