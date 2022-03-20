const login = document.getElementById("login-input");
const password = document.getElementById("password-input");
const button = document.getElementById("login-btn");
const product = document.getElementById("product");
const popupBg = document.querySelector(".popup-bg");
const popup = document.querySelector(".popup");
const popupClose = document.querySelector(".close-popup");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productAdd = document.getElementById("product-add");
const panelLogin = document.querySelector(".panel-login");

let productLocal = [];

//авторизация

button.addEventListener("click", function () {
  if (login.value == '1' && password.value == '1') {
    panelLogin.remove();
    showItem();
    products();
    exit()
  } else {
    login.value = "";
    password.value = "";
    alert('Ошибка входа')
  }
})

//после авторизации выводит кнопку добавить товар

function exit() {
  const exitBtn = document.createElement("button");
  exitBtn.type = "button";
  exitBtn.classList.add("exit");
  exitBtn.textContent = "Выход";
  exitBtn.addEventListener('click', () => {
    location.reload()
  })
  product.before(exitBtn);
}

function products() {
  const productBtn = document.createElement("button");
  productBtn.type = "button";
  productBtn.classList.add("add-product-button");
  productBtn.textContent = "Добавить товар";
  productBtn.addEventListener('click', () => {
    openPopup();
  })
  product.before(productBtn);
}

//активация попапа

function openPopup() {
  popupBg.classList.add('active');
  popup.classList.add('active');
}

//деактивация попапа

popupClose.addEventListener('click', () => {
  popupBg.classList.remove('active');
  popup.classList.remove('active');
})

//добавление товара

productAdd.addEventListener('click', () => {
  if (productName.value && productPrice.value != 0) {
    let localItems = JSON.parse(localStorage.getItem("localItem"));
    if (localItems === null) {
      productLocal = [];
    } else {
      productLocal = localItems;
    }
    productLocal.push([productName.value, productPrice.value]);
    localStorage.setItem("localItem", JSON.stringify(productLocal));
    productName.value = "";
    productPrice.value = "";
  }
  showItem();
})

//вывод товаров

function showItem() {
  let localItems = JSON.parse(localStorage.getItem("localItem"));
  if (localItems === null) {
    productLocal = [];
  } else {
    productLocal = localItems;
  }

  product.replaceChildren();

  const productTitle = document.createElement("h1");
  productTitle.classList.add("product-title");
  productTitle.type = "text";
  productTitle.textContent = 'Список товаров';
  product.appendChild(productTitle);
  
  productLocal.forEach((item, index) => {
    const productId = document.createElement("div");
    productId.classList.add("product-item");
    product.appendChild(productId);

    const productInfo = document.createElement("div");
    productInfo.classList.add("product-info");
    productId.appendChild(productInfo);

    const productItems = document.createElement("div");
    productItems.classList.add("product-name");
    productItems.type = "text";
    productItems.value = item;
    productItems.innerHTML = item[0];
    productInfo.appendChild(productItems);
    
    const productPrice = document.createElement("div");
    productPrice.classList.add("product-price");
    productPrice.type = "number";
    productPrice.value = item;
    productPrice.innerHTML = item[1] + ' ₽';
    productInfo.appendChild(productPrice);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.classList.add("product-delete-btn");
    deleteBtn.textContent = "Удалить";
    deleteBtn.addEventListener("click", () => {
      deleteItem(index);
    });
    productId.appendChild(deleteBtn);
  });
}

//удаление товара

function deleteItem(index) {
  let localItems = JSON.parse(localStorage.getItem("localItem"));
  productLocal.splice(index, 1);
  localStorage.setItem("localItem", JSON.stringify(productLocal));
  showItem();
}