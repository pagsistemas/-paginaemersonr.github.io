let cart = [];

const products = [
  {
    name: "cafetera",
    image: "https://facihogar.com.co/wp-content/uploads/2020/05/Cafetera-Electrica-12-Tazas-H.E-Montaje-fotos-page.jpg",
    desc: "Unica y exclusiva cafetera importada de china.",
    features: ["ahorra energia", "rapida", "garantia de 1 año"],
    price: 50000
  },
  {
    name: "licuadora",
    image: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/sodimacCO/554888/w=1036,h=832,f=webp,fit=contain,q=85",
    desc: "Nueva licuadora economica.",
    features: ["rapida", "fuerte", "ahorra luz"],
    price: 75000
  },

  
];

// Render dinámico
window.onload = () => {
  const productList = document.getElementById('product-list');
  products.forEach((product, index) => {
    const section = document.createElement('section');
    section.className = 'product';
    section.setAttribute('data-name', product.name.toLowerCase());
    section.onclick = () => openModal(index);
    section.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h2>${product.name}</h2>
    `;
    productList.appendChild(section);
  });
};

function addToCart(product) {
  cart.push(product);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((item) => {
    total += item.price;
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price.toLocaleString()} COP`;
    cartItems.appendChild(li);
  });
  cartTotal.textContent = total.toLocaleString();
}

function checkout() {
  if (cart.length === 0) {
    alert('El carrito está vacío.');
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const phoneNumber = '3161508624';
  const paymentInfo = `nequi:${phoneNumber}?amount=${total}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(paymentInfo)}&size=200x200`;

  const qrWindow = window.open('', 'Pago Nequi', 'width=300,height=350');
  qrWindow.document.write(`
    <html>
      <head><title>Pagar con Nequi</title></head>
      <body style="text-align:center; font-family: Arial, sans-serif;">
        <h2>Escanea para pagar</h2>
        <p>Monto: $${total.toLocaleString()} COP</p>
        <img src="${qrUrl}" alt="QR de pago Nequi" />
        <p>Número Nequi: ${phoneNumber}</p>
      </body>
    </html>
  `);
}

// Modal logic
function openModal(index) {
  const product = products[index];
  document.getElementById('modal-img').src = product.image;
  document.getElementById('modal-title').textContent = product.name;
  document.getElementById('modal-desc').textContent = product.desc;
  document.getElementById('modal-price').textContent = `$${product.price.toLocaleString()} COP`;

  const featureList = document.getElementById('modal-features');
  featureList.innerHTML = '';
  product.features.forEach(feat => {
    const li = document.createElement('li');
    li.textContent = feat;
    featureList.appendChild(li);
  });

  document.getElementById('modal-add-btn').onclick = () => {
    addToCart(product);
    closeModal();
  };

  document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

// Buscador
function filterProducts() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const productSections = document.querySelectorAll('#product-list .product');

  productSections.forEach((product) => {
    const name = product.getAttribute('data-name');
    if (name.includes(query)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}
