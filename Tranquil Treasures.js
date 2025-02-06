let cart = [];
const cartButton = document.getElementById('cartButton');
const cartModal = document.getElementById('cartModal');
const closeCartButton = document.getElementById('closeCart');
const cartItemsList = document.getElementById('cartItems');
const totalPriceElement = document.getElementById('totalPrice');
const addToCartBtns = document.querySelectorAll('.addToCartBtn');
const removeFromCartBtns = document.querySelectorAll('.removeFromCartBtn');
const bottomCartToggle = document.getElementById('bottomCartToggle');
const cartPreview = document.getElementById('cartPreview');
const toggleCartBtn = document.getElementById('toggleCartBtn');
const cartItemsPreview = document.getElementById('cartItemsPreview');

// Handle "Add to Cart" button click
addToCartBtns.forEach(button => {
    button.addEventListener('click', (event) => {
        const product = event.target.closest('.product');
        const productId = product.getAttribute('data-id');
        const productName = product.querySelector('h3').textContent;
        const productPrice = parseFloat(product.querySelector('p').textContent.replace('$', ''));

        const cartItem = cart.find(item => item.id === productId);
        
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        updateCartDisplay();
        updateProductQuantity(productId);
    });
});

// Handle "Remove from Cart" button click
removeFromCartBtns.forEach(button => {
    button.addEventListener('click', (event) => {
        const product = event.target.closest('.product');
        const productId = product.getAttribute('data-id');
        
        const cartItem = cart.find(item => item.id === productId);
        
        if (cartItem) {
            if (cartItem.quantity > 1) {
                cartItem.quantity -= 1;
            } else {
                cart = cart.filter(item => item.id !== productId);
            }
        }

        updateCartDisplay();
        updateProductQuantity(productId);
    });
});

// Update the cart display
function updateCartDisplay() {
    cartButton.textContent = `Cart (${cart.reduce((total, item) => total + item.quantity, 0)})`;
    renderCartItems();
    updateCartPreview();
}

// Render the cart items in the modal
function renderCartItems() {
    cartItemsList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        cartItemsList.appendChild(listItem);
        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = total.toFixed(2);
}

// Update the quantity of items shown at each product
function updateProductQuantity(productId) {
    const product = document.querySelector(`.product[data-id="${productId}"]`);
    const quantity = cart.find(item => item.id === productId)?.quantity || 0;
    product.querySelector('.product-quantity').textContent = quantity;
}

// Open the cart modal
cartButton.addEventListener('click', () => {
    cartModal.style.display = 'flex';
});

// Close the cart modal
closeCartButton.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Handle the "Proceed to Payment" button
const paymentButton = document.getElementById('paymentButton');
paymentButton.addEventListener('click', () => {
    alert('Proceeding to payment... Redirecting to your Payment app');
    cart = [];
    updateCartDisplay();
    cartModal.style.display = 'none';
});

// Toggle Cart Preview on bottom toggle
toggleCartBtn.addEventListener('click', () => {
    cartPreview.style.display = cartPreview.style.display === 'block' ? 'none' : 'block';
});

// Close the cart preview
const toggleCloseBtn = document.getElementById('toggleCloseBtn');
toggleCloseBtn.addEventListener('click', () => {
    cartPreview.style.display = 'none';
});

// Update the cart preview at the bottom
function updateCartPreview() {
    cartItemsPreview.innerHTML = '';
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        cartItemsPreview.appendChild(listItem);
    });
}
