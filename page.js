document.addEventListener("DOMContentLoaded", () => {
  // Hàm chuyển đổi chữ cái đầu tiên của mỗi từ thành chữ hoa
  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Hàm định dạng giá tiền
  const formatPrice = (price) => {
    return parseFloat(price).toLocaleString("vi-VN", { style: "currency", currency: "VND" }).replace("₫", "");
  };

  // Lấy dữ liệu sản phẩm từ localStorage
  let productName = localStorage.getItem("productName");
  let productSale = localStorage.getItem("productSale");
  let imagesAll = JSON.parse(localStorage.getItem("imagesAll"));
  let colorSrc = JSON.parse(localStorage.getItem("colorSrc"));
  let productId = localStorage.getItem('productId');
  let productPrice = localStorage.getItem('productPrice');
  let productDell = localStorage.getItem('productDell');

  // Cập nhật tiêu đề trang
  if (productName) {
    const name = document.querySelector('.name');
    const formattedProductName = toTitleCase(productName);
    document.title = `${formattedProductName} - ${productName}`;
    if (name) {
      name.innerHTML = `<p class="name">${formattedProductName}</p>`;
    }
  } else {
    document.title = "Trang Giỏ Hàng";
  }

  // Cập nhật sale
  if (productSale) {
    const sale = document.querySelector('.sale');
    if (sale) {
      sale.innerHTML = `<span>${productSale}</span>`;
    }
  }

  // Cập nhật id sản phẩm
  if (productId) {
    const msp = document.querySelector('.msp');
    if (msp) {
      msp.innerHTML = `<p>${productId}</p>`;
    }
  }

  // Cập nhật giá tiền
  if (productPrice) {
    const price_flex = document.querySelector('.price_flex');
    if (price_flex) {
      let formattedPrice = formatPrice(productPrice);
      let formattedDell = productDell ? formatPrice(productDell) : '';
      price_flex.innerHTML = `
        <strong class="price">${formattedPrice}<u>đ</u></strong>
        ${formattedDell ? `<del class="dell">${productDell}</del>` : ''}
      `;
    }
  }
  // Cập nhật màu sắc
  // Cập nhật màu sắc
  if (colorSrc && Array.isArray(colorSrc)) {
    let color_product = document.querySelector('.color_product');
    if (color_product) {
      color_product.innerHTML = '';
      colorSrc.forEach(({ src, alt }, index) => {
        const span = document.createElement('span');
        span.innerHTML = `<img src="${src}" alt="${alt}"/>`;
        color_product.appendChild(span);

        // Nếu đây là màu đầu tiên, thiết lập nó làm màu mặc định
        if (index === 0) {
          // Lưu màu sắc đầu tiên vào localStorage
          localStorage.setItem('colorPage', alt);

          // Cập nhật phần tử hiển thị màu sắc được chọn
          const colorActive = document.querySelector('.color_active');
          if (colorActive) {
            colorActive.textContent = alt;
          } else {
            console.error('Element with class "color_active" not found.');
          }

          // Thêm lớp "active" vào phần tử span chứa img đầu tiên
          span.classList.add('active');
        }
      });

      // Thêm sự kiện click vào các phần tử màu sắc
      color_product.addEventListener('click', (e) => {
        const img = e.target.closest('img');
        if (img) {
          const color = img.getAttribute('alt');
          if (color) {
            // Loại bỏ lớp "active" khỏi tất cả các phần tử span
            const allSpans = color_product.querySelectorAll('span');
            allSpans.forEach(span => span.classList.remove('active'));

            // Thêm lớp "active" vào phần tử span chứa img đã chọn
            const selectedSpan = img.closest('span');
            if (selectedSpan) {
              selectedSpan.classList.add('active');
            }

            // Lưu màu sắc được chọn vào localStorage
            localStorage.setItem('colorPage', color);

            // Cập nhật phần tử hiển thị màu sắc được chọn
            const colorActive = document.querySelector('.color_active');
            if (colorActive) {
              colorActive.textContent = color;
            } else {
              console.error('Element with class "color_active" not found.');
            }
          }
        }
      });

      // Cập nhật hình ảnh sản phẩm mặc định từ localStorage nếu không có màu nào được chọn
      const productImage = document.querySelector('.images_item_cart');
      if (productImage) {
        const imgSrc = localStorage.getItem('productImage');
        if (imgSrc) {
          productImage.src = imgSrc;
        }
      }
    }
  } else {
    console.error('No colors found in localStorage.');
  }





  // Hiển thị hình ảnh trong carousel


  const carouselContent = document.getElementById("carousel-content");

  if (carouselContent) {
    if (imagesAll && Array.isArray(imagesAll)) {
      // Xóa tất cả nội dung hiện có
      carouselContent.innerHTML = "";

      // Thêm hình ảnh từ localStorage
      imagesAll.forEach((src) => {
        let slideDiv = document.createElement("div");
        slideDiv.className = "slider-slide";

        let imgDiv = document.createElement("div");
        imgDiv.className = "img";

        let imgElement = document.createElement("img");
        imgElement.src = src;
        imgElement.alt = "";

        imgDiv.appendChild(imgElement);
        slideDiv.appendChild(imgDiv);
        carouselContent.appendChild(slideDiv);
      });

      // Lắng nghe sự kiện touchstart
      carouselContent.addEventListener("touchstart", function (e) {
        startY = e.touches[0].clientY;
      });

      // Lắng nghe sự kiện touchmove
      carouselContent.addEventListener("touchmove", function (e) {
        currentY = e.touches[0].clientY;
        let diffY = currentY - startY;

        // Tính toán và áp dụng giá trị translateY mới
        let newTranslateY = translateY + diffY;

        // Giới hạn khoảng vuốt để không vuốt quá mức
        const maxTranslateY = 0;
        const minTranslateY = -(carouselContent.scrollHeight - carouselContent.clientHeight);
        if (newTranslateY > maxTranslateY) newTranslateY = maxTranslateY;
        if (newTranslateY < minTranslateY) newTranslateY = minTranslateY;

        carouselContent.style.transform = `translateY(${newTranslateY}px)`;
      });

      // Lắng nghe sự kiện touchend
      carouselContent.addEventListener("touchend", function () {
        translateY += currentY - startY;
        const maxTranslateY = 0;
        const minTranslateY = -(carouselContent.scrollHeight - carouselContent.clientHeight);
        translateY = Math.max(Math.min(translateY, maxTranslateY), minTranslateY);

        carouselContent.style.transform = `translateY(${translateY}px)`;
      });
    } else {
      console.error("No images found in localStorage.");
    }
  } else {
    console.error('Element with id "carousel-content" not found.');
  }


  // Zoom hình
  const showImageSlide = document.querySelector(".show_img img");
  if (showImageSlide) {
    showImageSlide.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;

      this.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    });
  } else {
    console.error('Element with class "show_img img" not found.');
  }

  // Cập nhật đường dẫn trên trang
  const pathElement = document.querySelector('.path');
  if (pathElement) {
    pathElement.innerHTML = `
      <a class="trang_chu" href="index.html">Trang Chủ</a> - <span class="path_product">${productName ? toTitleCase(productName) : 'Tên sản phẩm không xác định'}</span>
    `;
  } else {
    console.error('Element with class "path" not found.');
  }
});



// slide images
document.addEventListener('DOMContentLoaded', () => {
  const sliderWrapper = document.querySelector('.slider-wrapper');
  const slides = document.querySelectorAll('.slider-slide');
  const showImg = document.querySelector('.show_img img');
  let currentIndex = 0;

  function updateSlide() {
    slides.forEach((slide, index) => {
      const img = slide.querySelector('img');
      img.classList.remove('active');
      if (index === currentIndex) {
        img.classList.add('active');
        showImg.src = img.src;
      }
    });
    sliderWrapper.style.transform = `translateY(-${currentIndex * 6}%)`;
  }

  document.querySelector('.prev-button').addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = slides.length - 1;
    }
    updateSlide();
  });

  document.querySelector('.next-button').addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateSlide();
  });

  slides.forEach((slide, index) => {
    const img = slide.querySelector('img');
    img.addEventListener('click', () => {
      currentIndex = index;
      updateSlide();
    });
  });

  updateSlide();
});


// Hàm cập nhật UI giỏ hàng
function updateCartUI() {
  const ContainerCart = JSON.parse(localStorage.getItem('ContainerCart')) || [];
  const cartList = document.querySelector('.cart_list');
  if (cartList) {
    cartList.innerHTML = '';
    ContainerCart.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'cart_item';
      itemElement.innerHTML = `
        <img src="${item.productImage}" alt="${item.productName}">
        <div class="item_details">
          <p>${item.productName}</p>
          <p>Mã SP: ${item.productId}</p>
          <p>Giá: ${item.productPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
          <p>Màu: ${item.acTiveColor}</p>
          <p>Số lượng: ${item.quantity}</p>
        </div>
      `;
      cartList.appendChild(itemElement);
    });
  }
}

// Sử dụng hàm `updateCartUI` sau khi thêm sản phẩm vào giỏ hàng
document.addEventListener('DOMContentLoaded', () => {
  const addToCartButton = document.querySelector('.add_to_cart');
  const productId = document.querySelector('.msp').innerText.trim();
  const productName = document.querySelector('.name').innerText;
  const productPrice = parseFloat(document.querySelector('.price').innerText.replace(/\D/g, ""));
  const productDell = parseFloat(document.querySelector('.dell')?.innerText.replace(/\D/g, ""));

  addToCartButton.addEventListener('click', () => {
    // Lấy màu sắc và src của hình ảnh từ localStorage
    let activeColor = localStorage.getItem('colorPage') || "không có màu";
    let productImage = localStorage.getItem('imgSrcPage') || document.querySelector('.show_img img').src;

    const ContainerCart = JSON.parse(localStorage.getItem('ContainerCart')) || [];
    let existingProduct = ContainerCart.find(item => item.productId === productId && item.acTiveColor === activeColor);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      let productSp = {
        productName,
        productId,
        productPrice,
        productDell,
        productImage,
        acTiveColor: activeColor,
        quantity: 1,
      };
      ContainerCart.push(productSp);
    }

    localStorage.setItem('ContainerCart', JSON.stringify(ContainerCart));
    updateCartCount();
  });
});




