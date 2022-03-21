const headers = document.getElementById("headers");
const headline = document.getElementById("headline");
const products = document.getElementById("products");

const popupBg = document.querySelector(".popup-bg");
const popupPanel = document.querySelector(".popup-panel");

const popupCloseButton = document.querySelector(".popup-close-button");
const popupProductName = document.querySelector(".popup-product-name");
const popupProductPrice = document.querySelector(".popup-product-price");
const popupAddButton = document.querySelector(".popup-product-add-button");

let productLocal = [];

panel();

//панель логина

function panel() {
  const panel = document.createElement("div");
  panel.id = "panel";
  headers.appendChild(panel);

  const panelHeader = document.createElement("div");
  panelHeader.classList.add("panel-header");
  panelHeader.textContent = "Products"
  panel.appendChild(panelHeader);

  const panelLoginInput = document.createElement("input");
  panelLoginInput.type = "text";
  panelLoginInput.id = "panel-login-input";
  panelLoginInput.classList.add("panel-login-input");
  panelLoginInput.placeholder = "Логин";
  panel.appendChild(panelLoginInput);

  const panelPasswordInput = document.createElement("input");
  panelPasswordInput.type = "password";
  panelPasswordInput.id = "panel-password-input";
  panelPasswordInput.classList.add("panel-password-input");
  panelPasswordInput.placeholder = "Пароль";
  panel.appendChild(panelPasswordInput);

  const panelLoginButton = document.createElement("button");
  panelLoginButton.type = "button";
  panelLoginButton.id = "panel-login-btn";
  panelLoginButton.classList.add("panel-login-btn");
  panelLoginButton.textContent = "Войти";
  panel.appendChild(panelLoginButton);

  //авторизация

  panelLoginButton.addEventListener("click", function () {
    if (panelLoginInput.value == '1' && panelPasswordInput.value == '1') {
      panel.remove();
      header();
      contentHeader();
      contentProducts();
      console.log('Успех');
    } else {
      panelLoginInput.value = "";
      panelPasswordInput.value = "";
      alert('Ошибка входа');
    }
  })
}

//хеадер

function header() {
  const header = document.createElement('header');
  header.classList.add("header");
  header.id = "header";
  headers.appendChild(header);

  const navMenu = document.createElement('div');
  navMenu.classList.add("header-menu");
  header.appendChild(navMenu);

  const menuProducts = document.createElement('button');
  menuProducts.classList.add("header-menu-item");
  menuProducts.textContent = "Каталог";
  navMenu.appendChild(menuProducts);

  const menuClients = document.createElement('button');
  menuClients.classList.add("header-menu-item");
  menuClients.textContent = "Клиенты";
  navMenu.appendChild(menuClients);

  const menuOrders = document.createElement('button');
  menuOrders.classList.add("header-menu-item");
  menuOrders.textContent = "Заказы";
  navMenu.appendChild(menuOrders);

  const exitButton = document.createElement("button");
  exitButton.type = "button";
  exitButton.classList.add("exit");
  exitButton.textContent = "Выход";
  exitButton.addEventListener('click', () => {
    location.reload()
  })
  header.appendChild(exitButton);
}

//заголовок продуктов и кнопка добавить

function contentHeader() {
  const contentHeader = document.createElement("div");
  contentHeader.classList.add("content-header");
  headline.appendChild(contentHeader);

  const productsTitle = document.createElement("h1");
  productsTitle.classList.add("products-title");
  productsTitle.type = "text";
  productsTitle.textContent = 'Список товаров';
  contentHeader.appendChild(productsTitle);

  const addProductButton = document.createElement("button");
  addProductButton.type = "button";
  addProductButton.classList.add("add-product-button");
  addProductButton.textContent = "Добавить товар";
  addProductButton.addEventListener('click', () => {
    openPopup();
  })
  contentHeader.appendChild(addProductButton);
}

function contentProducts() {
  let localProducts = JSON.parse(localStorage.getItem("localProduct"));
  if (localProducts === null) {
    productLocal = [];
  } else {
    productLocal = localProducts;
  }

  products.replaceChildren();

  productLocal.forEach((item, index) => {
    const productId = document.createElement("div");
    productId.classList.add("product-item");
    products.appendChild(productId);

    const productInfo = document.createElement("div");
    productInfo.classList.add("product-info");
    productId.appendChild(productInfo);

    const productItem = document.createElement("div");
    productItem.classList.add("product-name");
    productItem.type = "text";
    productItem.value = item;
    productItem.innerHTML = item[0];
    productInfo.appendChild(productItem);

    const productPrice = document.createElement("div");
    productPrice.classList.add("product-price");
    productPrice.type = "number";
    productPrice.value = item;
    productPrice.innerHTML = item[1] + " ₽";
    productInfo.appendChild(productPrice);

    const productDeleteButton = document.createElement("button");
    productDeleteButton.type = "button";
    productDeleteButton.classList.add("product-delete-button");
    productDeleteButton.textContent = "Удалить";
    productDeleteButton.addEventListener("click", () => {
      deleteProduct(index);
    });
    productId.appendChild(productDeleteButton);
  });
}

//активация попапа

function openPopup() {
  popupBg.classList.add("active");
  popupPanel.classList.add("active");
}

//деактивация попапа

popupCloseButton.addEventListener("click", () => {
  popupBg.classList.remove("active");
  popupPanel.classList.remove("active");
});

//добавление товара

popupAddButton.addEventListener("click", () => {
  if (popupProductName.value && popupProductPrice.value != 0) {
    let localProducts = JSON.parse(localStorage.getItem("localProduct"));
    if (localProducts === null) {
      productLocal = [];
    } else {
      productLocal = localProducts;
    }
    productLocal.push([popupProductName.value, popupProductPrice.value]);
    localStorage.setItem("localProduct", JSON.stringify(productLocal));
    popupProductName.value = "";
    popupProductPrice.value = "";
  }
  contentProducts();
});

//удаление товара

function deleteProduct(index) {
  let localProducts = JSON.parse(localStorage.getItem("localProduct"));
  productLocal.splice(index, 1);
  localStorage.setItem("localProduct", JSON.stringify(productLocal));
  contentProducts();
}