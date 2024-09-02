const navbar = () => {
  const navAll = document.querySelectorAll('.navbar_list_item, .navbar_list');
  const menu = document.querySelector('.menu');
  const nav_responsive = document.querySelector('.nav_responsive');
  const close_nav = document.querySelector('.close_nav');
  const search_nav = document.querySelector('.search_nav');
  const overlay_search = document.querySelector('.overlay_search');

  navAll.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();

      if (item.classList.contains('navbar_list') && item === document.querySelector('.navbar_list:first-of-type')) {
        window.location.href = 'index.html';
        return;
      }
      if (item.classList.contains('home')) {
        window.location.href = 'index.html';
        return;
      }
      navAll.forEach(i => {
        i.classList.remove('active');
        if (i.closest('.navbar_list')) {
          i.closest('.navbar_list').classList.remove('active');
        }
      });
      item.classList.add('active');
      if (item.classList.contains('navbar_list_item')) {
        item.closest('.navbar_list').classList.add('active');
      }
      if (item.classList.contains('navbar_list')) {
        item.querySelector('.navbar_list_item').classList.add('active');
      }
    });
  });

  menu.addEventListener('click', () => {
    nav_responsive.classList.add('active');
  });

  close_nav.addEventListener('click', () => {
    nav_responsive.classList.remove('active');
  });
  search_nav.addEventListener('click', () => {
    overlay_search.classList.toggle('active')
  })
};

navbar();

// End navbar

// Phần carsouel lớn
const CarouselBig = () => {
  const slides_big = document.querySelectorAll(".slide_big");
  const prevBtn_big = document.querySelector(".prev_big");
  const nextBtn_big = document.querySelector(".next_big");
  const carouselContainer = document.querySelector(".carousel-slides_big");

  let currentIndex = 0;
  let isAnimating = false;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  const showSlide = (index) => {
    if (isAnimating) return;

    isAnimating = true;

    if (index >= slides_big.length) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = slides_big.length - 1;
    } else {
      currentIndex = index;
    }

    const offset = -currentIndex * 100;
    carouselContainer.style.transform = `translateX(${offset}%)`;

    setTimeout(() => {
      isAnimating = false;
    }, 500);
  };

  const nextSlide = () => showSlide(currentIndex + 1);
  const prevSlide = () => showSlide(currentIndex - 1);

  nextBtn_big.addEventListener("click", nextSlide);
  prevBtn_big.addEventListener("click", prevSlide);
  setInterval(nextSlide, 4500);

  const onTouchStart = (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  };

  const onTouchMove = (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      isDragging = false;
    }
  };

  const onTouchEnd = () => {
    isDragging = false;
  };

  carouselContainer.addEventListener("touchstart", onTouchStart);
  carouselContainer.addEventListener("touchmove", onTouchMove);
  carouselContainer.addEventListener("touchend", onTouchEnd);
};

CarouselBig();


// End carsouel lớn

// Phần slide product1
document.addEventListener('DOMContentLoaded', () => {
  var swiper1 = new Swiper('.slider1', {
    slidesPerView: 5,
    spaceBetween: 10,
    slidesPerGroup: 5,
    loop: true,
    pagination: {
      el: '.slider1-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.slider1-next',
      prevEl: '.slider1-prev',
    },
    breakpoints: {
      1256: {
        slidesPerView: 5,
        slidesPerGroup: 5,
      },
      1250: {
        slidesPerView: 5,
        slidesPerGroup: 5,
      },
      1200: {
        slidesPerView: 5,
        slidesPerGroup: 5,
      },
      1101: {
        slidesPerView: 5,
        slidesPerGroup: 5,
      },
      1100: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      993: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      835: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      767: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      700: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      576: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      475: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      450: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      321: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
    }
  });

  var swiper2 = new Swiper('.slider2', {
    slidesPerView: 5,
    spaceBetween: 10,
    slidesPerGroup: 5,
    loop: true,
    pagination: {
      el: '.slider2-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.slider2-next',
      prevEl: '.slider2-prev',
    },
    breakpoints: {
      1256: {
        slidesPerView: 5,
        slidesPerGroup: 5,
      },
      1250: {
        slidesPerView: 5,
        slidesPerGroup: 5,
      },
      1200: {
        slidesPerView: 5,
        slidesPerGroup: 5,
      },
      1101: {
        slidesPerView: 5,
        slidesPerGroup: 5,
      },
      1100: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      993: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      835: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      767: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      700: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      576: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      475: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      450: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      321: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
    }
  });
});



// Phần active color_product
const updateImageOnColorClick = () => {
  document.querySelectorAll(".background_product").forEach(backgroundProduct => {
    backgroundProduct.querySelectorAll(".color_product > span").forEach(colorProduct => {
      colorProduct.addEventListener("click", () => {
        // Xóa class 'active' từ tất cả các span khác
        backgroundProduct.querySelectorAll(".color_product > span").forEach(span => span.classList.remove("active"));

        // Thêm class 'active' vào span hiện tại
        colorProduct.classList.add("active");

        // Lấy giá trị data-color từ img bên trong span hiện tại
        const img = colorProduct.querySelector("img");
        const colorName = img?.getAttribute('data-color') || "Không có màu";
        const imgSrc = img?.getAttribute('data-src') || "//hstatic.net/0/0/global/noDefaultImage6_large.gif";
        const imgAlt = img?.getAttribute('alt') || "Không có hình ảnh";

        // Lưu giá trị data-color vào localStorage
        localStorage.setItem('activeColor', colorName);

        // Cập nhật ảnh trong phần tử .images_product
        const imagesProduct = backgroundProduct.querySelector(".images_product img");
        if (imagesProduct) {
          imagesProduct.src = imgSrc;
          imagesProduct.alt = imgAlt;
        }

        console.log('Giá trị data-color:', colorName); // Kiểm tra giá trị được lấy
      });
    });
  });
};

updateImageOnColorClick();

//End phần active color_product

// Hàm tạo ID
const generateRandomId = (length = 10) => {
  const numbers = '0123456789';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';

  for (let i = 0; i < 3; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  for (let i = 0; i < length - 3; i++) {
    result += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  result = result.split('').sort(() => 0.5 - Math.random()).join('');

  return result;
}

const generateUniqueId = (existingIds, length = 10) => {
  let newId;
  do {
    newId = generateRandomId(length);
  } while (existingIds.has(newId));
  existingIds.add(newId);
  return newId;
}

const assignUniqueIds = () => {
  const idElements = document.querySelectorAll('.id');
  const existingIds = new Set();
  const ids = [];

  idElements.forEach((item) => {
    if (item) {
      const uniqueId = generateUniqueId(existingIds);
      item.textContent = uniqueId;
      ids.push(uniqueId);
    }
  });

  return ids;
}
const ids = assignUniqueIds();


// End id ngẫu nhiên

// kích vào lấy tất cả của background_product
const backgroundProduct = () => {
  const background = document.querySelectorAll('.background_product');

  // Kiểm tra nếu không có phần tử nào được tìm thấy
  if (background.length === 0) {
    console.error('No elements found with class "background_product".');
    return;
  }
  background.forEach((item) => {
    if (item) {
      item.addEventListener('click', (e) => {
        // Kiểm tra nếu click vào các phần tử không muốn chuyển trang
        if (e.target.closest('.sale') || e.target.closest('.heart_sale') || e.target.closest('.btn_product') || e.target.closest('.color_product') || e.target.closest('.add')) {
          return;
        }

        let backgroundA = e.target.closest('.background_product');
        if (backgroundA) {
          // Lấy thông tin sản phẩm từ phần tử
          let productName = backgroundA.querySelector('.name') ? backgroundA.querySelector('.name').innerText : 'Unknown';
          let productId = backgroundA.querySelector('.id') ? backgroundA.querySelector('.id').innerText.trim() : 'Unknown';
          let productSale = backgroundA.querySelector('.sale') ? backgroundA.querySelector('.sale').innerText.trim() : 'Unknown';
          let productPrice = backgroundA.querySelector('.price') ? parseFloat(backgroundA.querySelector('.price').innerText.replace(/\D/g, "")) : 0;
          let productDell = backgroundA.querySelector('.dell') ? backgroundA.querySelector('.dell').innerText : 'Unknown';
          let productImageDefault = backgroundA.querySelector('img') ? backgroundA.querySelector('img').getAttribute('data-src') : '';

          // Lưu dữ liệu sản phẩm vào localStorage
          localStorage.setItem('productName', productName);
          localStorage.setItem('productId', productId);
          localStorage.setItem('productPrice', productPrice);
          localStorage.setItem('productDell', productDell);
          localStorage.setItem('productImage', productImageDefault);
          localStorage.setItem('productSale', productSale);

          // Lọc và lưu ảnh cũng như màu sắc vào localStorage
          let imageSources = new Set();
          let colorSources = new Set();
          let colorSrcSources = new Set();

          // Lọc và lưu các ảnh
          let imagesProduct = backgroundA.querySelectorAll('.images_product img');
          imagesProduct.forEach(img => {
            let src = img.getAttribute('data-src');
            if (src) {
              imageSources.add(src);
            }
          });

          // Lọc và lưu các màu
          let colorProduct = backgroundA.querySelectorAll('.color_product img');
          colorProduct.forEach(img => {
            let dataSrc = img.getAttribute('data-src');
            let dataAz = img.getAttribute('data-az'); // Lấy giá trị data-az
            let dataAx = img.getAttribute('data-ax'); // Lấy giá trị data-ax
            let color = img.getAttribute('data-color');
            let colorSrc = img.src;
            let altText = img.getAttribute('alt');

            if (dataSrc) {
              imageSources.add(dataSrc);
            }
            if (dataAz) {
              imageSources.add(dataAz);
            }
            if (dataAx) {
              imageSources.add(dataAx);
            }
            if (color) {
              colorSources.add(color);
            }
            if (colorSrc && altText) {
              colorSrcSources.add(JSON.stringify({ src: colorSrc, alt: altText }));
            }
          });

          // Lưu ảnh và màu sắc vào localStorage
          localStorage.setItem('imagesAll', JSON.stringify(Array.from(imageSources)));
          localStorage.setItem('colorAll', JSON.stringify(Array.from(colorSources)));
          localStorage.setItem('colorSrc', JSON.stringify(Array.from(colorSrcSources).map(item => JSON.parse(item))));

          // console.log('Unique images:', Array.from(imageSources));
          // console.log('Unique colors:', Array.from(colorSources));
          // console.log('Color sources:', Array.from(colorSrcSources).map(item => JSON.parse(item)));

          // Chuyển hướng đến trang mới (đã được chú thích để không thực thi)
          window.location.href = 'page.html';
        } else {
          console.error('Element not found.');
        }
      });
    }
  });
};

backgroundProduct();


// End kích vào lấy tất cả của background_product
document.addEventListener('DOMContentLoaded', () => {
  const inputSearch = document.querySelector('.input_search');
  const resultSearch = document.querySelector('.result_search');
  const iconSearchA = document.querySelector('.search_icon_a');
  const iconX = document.querySelector('.iconz');

  // Hàm lấy danh sách sản phẩm từ các section
  function getProducts() {
    const products = [];
    const seasonSaleProducts = document.querySelectorAll('#season_sale .background_product');
    seasonSaleProducts.forEach(product => {
      const name = product.querySelector('.name_product .name').textContent.trim();
      const image = product.querySelector('.images_product img').src;
      const price = product.querySelector('.price') ? product.querySelector('.price').innerText.trim() : 'Giá không có';
      const dell = product.querySelector('.dell') ? product.querySelector('.dell').innerText.trim() : 'Giảm giá không có';
      products.push({ name, image, price, dell, element: product });
    });

    const topTrendingProducts = document.querySelectorAll('.top-trending .background_product');
    topTrendingProducts.forEach(product => {
      const name = product.querySelector('.name_product .name').textContent.trim();
      const image = product.querySelector('.images_product img').src;
      const price = product.querySelector('.price') ? product.querySelector('.price').innerText.trim() : 'Giá không có';
      const dell = product.querySelector('.dell') ? product.querySelector('.dell').innerText.trim() : 'Giảm giá không có';
      products.push({ name, image, price, dell, element: product });
    });

    return products;
  }

  // Hàm cập nhật kết quả tìm kiếm
  function updateSearchResults(query) {
    resultSearch.innerHTML = '';

    if (query.trim() === '') {
      resultSearch.style.display = 'none';
      iconSearchA.style.display = 'block';
      iconX.style.display = 'none';
      return;
    }

    const filteredProducts = getProducts().filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    localStorage.setItem('searchResults', JSON.stringify(filteredProducts));

    filteredProducts.forEach(product => {
      const resultItem = document.createElement('div');
      resultItem.classList.add('result_item');
      resultItem.innerHTML = `
                <img class="img_search" src="${product.image}" alt="${product.name}" />
                <div class="form_search">
                    <span class="name_search">${product.name}</span>
                    <div class="price_search">
                        <span class="price">${product.price}</span>
                        ${product.dell ? `<span class="dell"><del>${product.dell}</del></span>` : ''}
                    </div>
                </div>
            `;

      resultItem.addEventListener('click', () => {
        localStorage.setItem('productName', product.name);
        localStorage.setItem('productImage', product.image);

        const backgroundA = product.element;
        const productId = backgroundA.querySelector('.id') ? backgroundA.querySelector('.id').innerText.trim() : 'Unknown';
        const productSale = backgroundA.querySelector('.sale') ? backgroundA.querySelector('.sale').innerText.trim() : 'Unknown';
        const productPrice = backgroundA.querySelector('.price') ? parseFloat(backgroundA.querySelector('.price').innerText.replace(/\D/g, "")) : 0;
        const productDell = backgroundA.querySelector('.dell') ? backgroundA.querySelector('.dell').innerText : 'Unknown';

        localStorage.setItem('productId', productId);
        localStorage.setItem('productPrice', productPrice);
        localStorage.setItem('productDell', productDell);
        localStorage.setItem('productSale', productSale);

        const imageSources = new Set();
        const colorSources = new Set();
        const colorSrcSources = new Set();

        const imagesProduct = backgroundA.querySelectorAll('.images_product img');
        imagesProduct.forEach(img => {
          const src = img.getAttribute('data-src');
          if (src) {
            imageSources.add(src);
          }
        });

        const colorProduct = backgroundA.querySelectorAll('.color_product img');
        colorProduct.forEach(img => {
          const dataSrc = img.getAttribute('data-src');
          const dataAz = img.getAttribute('data-az');
          const dataAx = img.getAttribute('data-ax');
          const color = img.getAttribute('data-color');
          const colorSrc = img.src;
          const altText = img.getAttribute('alt');

          if (dataSrc) {
            imageSources.add(dataSrc);
          }
          if (dataAz) {
            imageSources.add(dataAz);
          }
          if (dataAx) {
            imageSources.add(dataAx);
          }
          if (color) {
            colorSources.add(color);
          }
          if (colorSrc && altText) {
            colorSrcSources.add(JSON.stringify({ src: colorSrc, alt: altText }));
          }
        });

        localStorage.setItem('imagesAll', JSON.stringify(Array.from(imageSources)));
        localStorage.setItem('colorAll', JSON.stringify(Array.from(colorSources)));
        localStorage.setItem('colorSrc', JSON.stringify(Array.from(colorSrcSources).map(item => JSON.parse(item))));

        window.location.href = 'page.html';
      });

      resultSearch.appendChild(resultItem);
    });

    if (filteredProducts.length === 0) {
      resultSearch.innerHTML = '<div class="no_results">Không tìm thấy sản phẩm nào.</div>';
    }

    resultSearch.style.display = 'block';
    iconSearchA.style.display = 'none';
    iconX.style.display = 'block';
  }

  inputSearch.addEventListener('input', (event) => {
    const query = event.target.value;
    updateSearchResults(query);
  });

  iconX.addEventListener('click', () => {
    inputSearch.value = '';
    updateSearchResults('');
    iconSearchA.style.display = 'block';
    iconX.style.display = 'none';
  });
});




// Phần success
var animPhaseOne = 2000;
var animPhaseTwo = animPhaseOne + 750;

setTimeout(function () {
  document.getElementById('js-spinner').classList.add('--spinner-complete');
}, animPhaseOne);

setTimeout(function () {
  document.getElementById('js-success-tick').classList.add('--tick-complete');
}, animPhaseOne);

setTimeout(function () {
  document.getElementById('js-success-ring').classList.add('--ring-complete');
}, animPhaseOne);