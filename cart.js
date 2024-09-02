const showCart = () => {
  const cartNav = document.querySelector(".cart_nav");
  const showCart = document.querySelector(".show_cart");
  const offCart = document.querySelector(".off_cart");
  // const body = document.body;
  const html = document.documentElement;

  if (cartNav && showCart && offCart) {
    cartNav.addEventListener("click", () => {
      showCart.classList.add("active");
      showCart.classList.remove("off_opacity");
      // body.classList.add("no-scroll");
      html.classList.add("no-scroll");
    });

    offCart.addEventListener("click", () => {
      showCart.classList.add("off_opacity");
      setTimeout(() => {
        showCart.classList.remove("active");
        // body.classList.remove("no-scroll");
        html.classList.remove("no-scroll");
      }, 450);
    });
  } else {
    console.error("Một hoặc nhiều phần tử không tồn tại trong DOM.");
  }
};

showCart();


// Hàm cập nhật sản phẩm ở local
const updateCartCount = () => {
  const ContainerCart = JSON.parse(localStorage.getItem('ContainerCart')) || [];
  const cout_cart = document.querySelector('.cout_cart');
  if (cout_cart) {
    cout_cart.innerHTML = ContainerCart.length;
  }
  goToCart();
};

document.addEventListener('DOMContentLoaded', updateCartCount);
// End Hàm cập nhật sản phẩm ở local

// hàm cập nhật tiền tệ
const formatPrice = (price) => {
  return price
    .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
    .replace("₫", "");
};
// End hàm cập nhật tiền tệ

// Hàm lưu số lượng sản phẩm trong giỏ hàng vào local storage
const saveProductQuantity = (productId, quantity) => {
  const productQuantities = JSON.parse(localStorage.getItem('productQuantities')) || {};
  productQuantities[productId] = quantity;
  localStorage.setItem('productQuantities', JSON.stringify(productQuantities));
};

// Hàm lấy số lượng sản phẩm từ local storage
const getProductQuantity = (productId) => {
  const productQuantities = JSON.parse(localStorage.getItem('productQuantities')) || {};
  return productQuantities[productId] || 0;
};

// hàm bắt sự kiện khi nhấn add_to_cart
const addToCart = () => {
  const buttonAdd = document.querySelectorAll('.add_to_cart');
  buttonAdd.forEach((item) => {
    item.addEventListener('click', (e) => {
      let product = e.target.closest('.background_product');
      if (product) {
        // Lấy thông tin sản phẩm
        let productName = product.querySelector('.name').innerText;
        let productId = product.querySelector('.id').innerText.trim();
        let productPrice = parseFloat(product.querySelector('.price').innerText.replace(/\D/g, ""));
        let productDell = product.querySelector('.dell').innerText;
        let productImage = product.querySelector('img').src;

        // Lấy màu sản phẩm được chọn
        const colorProductSpans = product.querySelectorAll('.color_product > span');
        let activeColor = "không có màu";
        colorProductSpans.forEach(span => {
          if (span.classList.contains('active')) {
            activeColor = span.querySelector('img').getAttribute('data-color');
          }
        });
        if (activeColor === "không có màu" && colorProductSpans.length > 0) {
          activeColor = colorProductSpans[0].querySelector('img').getAttribute('data-color');
        }

        // Lấy số lượng hiện tại của sản phẩm từ local storage
        let currentQuantity = getProductQuantity(productId);

        // Kiểm tra số lượng sản phẩm
        if (currentQuantity >= 5) {
          showNotification('error', 'Bạn chỉ có thể thêm tối đa 5 sản phẩm cùng loại vào giỏ hàng!');
          return;
        }

        // Tăng số lượng và cập nhật local storage
        currentQuantity++;
        saveProductQuantity(productId, currentQuantity);

        // Cập nhật giỏ hàng
        const ContainerCart = JSON.parse(localStorage.getItem('ContainerCart')) || [];
        let existingProduct = ContainerCart.find(item => item.productId === productId && item.acTiveColor === activeColor);

        if (existingProduct) {
          existingProduct.quantity = currentQuantity;
          existingProduct.productPriceTotal = existingProduct.productPrice * currentQuantity;
        } else {
          let productSp = {
            productName,
            productId,
            productPrice,
            productDell,
            productImage,
            acTiveColor: activeColor,
            quantity: currentQuantity,
            productPriceTotal: productPrice * currentQuantity,
          };
          ContainerCart.push(productSp);
        }
        localStorage.setItem('ContainerCart', JSON.stringify(ContainerCart));

        // Hiển thị thông báo thành công và sau đó thực hiện animation và cập nhật số lượng
        showNotification('success', 'Sản phẩm đã được thêm vào giỏ hàng!', productImage, () => {
          animateProductToCart(product);
          updateCartCount();
          goToCart();
        });
      }
    });
  });

  document.addEventListener('DOMContentLoaded', updateCartCount);
};

// Hàm hiển thị thông báo
const showNotification = (type, message, image = '', callback) => {
  const overlay = document.querySelector('.overlay_success');
  const overlay_error = document.querySelector('.overlay_error');
  const textSuccess = overlay.querySelector('.text_sucess');
  const imgSuccess = overlay.querySelector('.img_success');
  const successRing = overlay.querySelector('#js-success-ring');
  const successTick = overlay.querySelector('#js-success-tick');

  textSuccess.textContent = message;
  imgSuccess.src = image;

  if (type === 'success') {
    successRing.classList.add('--ring-complete');
    successTick.classList.add('--tick-complete');
  } else {
    successRing.classList.add('--ring-error');
    successTick.style.display = 'none';
  }

  overlay.style.display = 'block';
  overlay.style.opacity = '1';

  setTimeout(() => {
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
      successRing.classList.remove('--ring-complete', '--ring-error');
      successTick.classList.remove('--tick-complete');
      successTick.style.display = '';

      // Chỉ thực hiện callback nếu là thông báo thành công
      if (type === 'success' && typeof callback === 'function') {
        callback();
      }
    }, 300);
  }, 2000);
};

// Hàm animation sản phẩm vào giỏ hàng
const animateProductToCart = (product) => {
  const imgToFly = product.querySelector('.images_product img');
  if (imgToFly) {
    const flyImage = imgToFly.cloneNode(true);
    const rect = imgToFly.getBoundingClientRect();
    const cartRect = document.querySelector('.cart_nav').getBoundingClientRect();

    flyImage.style.position = 'fixed';
    flyImage.style.left = `${rect.left}px`;
    flyImage.style.top = `${rect.top}px`;
    flyImage.style.width = `${rect.width}px`;
    flyImage.style.height = `${rect.height}px`;
    flyImage.style.zIndex = '9999';
    flyImage.style.transition = 'all 0.8s ease-in-out';

    document.body.appendChild(flyImage);

    const x = cartRect.left + (cartRect.width / 2) - (rect.left + rect.width / 2);
    const y = cartRect.top + (cartRect.height / 2) - (rect.top + rect.height / 2);

    requestAnimationFrame(() => {
      flyImage.style.transform = `translate(${x}px, ${y}px) scale(0.1)`;
      flyImage.style.opacity = '0';
    });

    flyImage.addEventListener('transitionend', () => {
      flyImage.remove();
    });
  }
};

addToCart();
// End hàm bắt sự kiện khi nhấn add_to_cart

// hàm đưa vào giỏ hàng
const goToCart = () => {
  let cart_container = document.querySelector('.cart_container');
  cart_container.innerHTML = "";

  let totalPrice = 0;
  const ContainerCart = JSON.parse(localStorage.getItem('ContainerCart')) || [];

  ContainerCart.forEach((product, index) => {
    let background_item = document.createElement('div');
    background_item.classList.add('background_item_cart');

    background_item.innerHTML = `
      <div class="images_item_cart">
        <img src="${product.productImage}" alt="">
      </div>
      <div class="form_item">
        <div class="name_id">
          <span class="name_cart">${product.productName}</span>
        </div>
        <div class="type_color_size">
          <span class="type"><strong>Loại: </strong>thun</span> <span>-</span>
          <span class="color"><strong>Màu:</strong> ${product.acTiveColor}</span> <span>-</span>
          <span class="size"><strong>Size:</strong> ${product.productSize || 'S'}</span>
        </div>
        <div class="volum_price">
          <div class="volum">
            <span class="dowm"><ion-icon name="remove-outline"></ion-icon></span>
            <input class="number" type="number" maxlength="10" value="${product.quantity}">
            <span class="up"><ion-icon name="add-outline"></ion-icon></span>
          </div>
          <div class="price_dell">
            <span class="price">${formatPrice(product.productPrice)}đ</span>
            <del class="dell">${product.productDell || ''}đ</del>
          </div>
        </div>
        <div class="size-options">
          <span class="size-option" data-index="${index}" value="S">S</span>
          <span class="size-option" data-index="${index}" value="M">M</span>
          <span class="size-option" data-index="${index}" value="L">L</span>
          <span class="size-option" data-index="${index}" value="XL">XL</span>
        </div>
        <div class="color-options">

        </div>
      </div>
      <div class="delete_cart">
        <ion-icon name="close-outline"></ion-icon>
      </div>
    `;

    cart_container.appendChild(background_item);

    // Cập nhật tổng tiền
    totalPrice += product.productPrice * product.quantity;
  });

  // Cập nhật giao diện với tổng tiền
  const totalElement = document.querySelector('.total .price');
  if (totalElement) {
    totalElement.innerHTML = `${formatPrice(totalPrice)}<u>đ</u>`;
  }

  // tùy chọn kích thước
  document.querySelectorAll('.size-option').forEach((option) => {
    option.addEventListener('click', (e) => {
      let selectedSize = e.target.getAttribute('value');
      let index = e.target.getAttribute('data-index');
      // Cập nhật kích thước
      ContainerCart[index].productSize = selectedSize;
      // Lưu cập nhật vào localStorage
      localStorage.setItem('ContainerCart', JSON.stringify(ContainerCart));
      // Cập nhật kích thước hiển thị trên giao diện
      e.target.closest('.form_item').querySelector('.size').innerHTML = `<strong>Size: </strong>${selectedSize}`;
    });
  });

  // Thêm sự kiện xóa sản phẩm khỏi giỏ hàng
  document.querySelectorAll('.delete_cart').forEach((button, index) => {
    button.addEventListener('click', () => {
      // Xóa sản phẩm khỏi ContainerCart
      ContainerCart.splice(index, 1);

      // Lưu cập nhật vào localStorage
      localStorage.setItem('ContainerCart', JSON.stringify(ContainerCart));

      // Cập nhật lại giao diện và số lượng sản phẩm
      goToCart();
      updateCartCount();  // Gọi hàm cập nhật số lượng sản phẩm sau khi xóa
    });
  });

  // Thêm sự kiện cho các nút tăng/giảm số lượng
  document.querySelectorAll('.up').forEach((button, index) => {
    button.addEventListener('click', () => {
      let numberInput = button.closest('.volum').querySelector('.number');
      let newValue = parseInt(numberInput.value) + 1;

      // Cập nhật số lượng trong ContainerCart
      ContainerCart[index].quantity = newValue;
      ContainerCart[index].productPriceTotal = ContainerCart[index].productPrice * newValue;

      // Lưu cập nhật vào localStorage
      localStorage.setItem('ContainerCart', JSON.stringify(ContainerCart));

      // Cập nhật giá trị ô input và tổng tiền
      numberInput.value = newValue;
      totalPrice = ContainerCart.reduce((total, product) => total + (product.productPrice * product.quantity), 0);
      totalElement.innerHTML = `${formatPrice(totalPrice)}<u>đ</u>`;
    });
  });

  document.querySelectorAll('.dowm').forEach((button, index) => {
    button.addEventListener('click', () => {
      let numberInput = button.closest('.volum').querySelector('.number');
      let newValue = parseInt(numberInput.value) - 1;

      if (newValue < 1) newValue = 1;

      // Cập nhật số lượng trong ContainerCart
      ContainerCart[index].quantity = newValue;
      ContainerCart[index].productPriceTotal = ContainerCart[index].productPrice * newValue;

      // Lưu cập nhật vào localStorage
      localStorage.setItem('ContainerCart', JSON.stringify(ContainerCart));

      // Cập nhật giá trị ô input và tổng tiền
      numberInput.value = newValue;
      totalPrice = ContainerCart.reduce((total, product) => total + (product.productPrice * product.quantity), 0);
      totalElement.innerHTML = `${formatPrice(totalPrice)}<u>đ</u>`;

    });
  });

  // check ConcainerCart
  if (ContainerCart.length === 0) {
    cart_container.innerHTML = `
      <div class="cart_notification">
        <ion-icon class="icon" name="cart-outline"></ion-icon>
        <p class="notification_p">Hiện chưa có sản phẩm nào</p>
      </div>
    `;
    // Cập nhật số lượng sản phẩm trong giỏ hàng
    const cout_cart = document.querySelector('.cout_cart');
    if (cout_cart) {
      cout_cart.innerHTML = 0;
    }
  }
};
// End hàm đưa vào giỏ hàng

