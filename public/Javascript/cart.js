// Initialize cart from local storage or set to empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display the cart items
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    // Loop through the cart and create each item's HTML
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 100px; height: 100px;">
            <h3>${item.name}</h3>
            <p>₹ ${item.price} </p>
            <div class="quantity-controls">
                <button onclick="updateQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${index}, 1)">+</button>
            </div>
            <p>Rs: <span id="item-total-${index}">${calculateItemTotal(item.price, item.quantity)}</span></p>
            <button onclick="removeItem(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    // Update the total price for the cart
    updateTotalPrice();
}

// Function to calculate total price for a specific item
function calculateItemTotal(price, quantity) {
    return (parseFloat(price) * parseInt(quantity)).toFixed(2);
}

// Function to update quantity of an item in the cart
function updateQuantity(index, change) {
    // Ensure quantity doesn't go below 1
    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
}

// Function to remove an item from the cart
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Function to update the total price for the entire cart
function updateTotalPrice() {
    const subtotal = cart.reduce((total, item) => {
        const price = parseFloat(item.price);
        const quantity = parseInt(item.quantity, 10);
        return total + (price * quantity);
    }, 0);

    const tax = subtotal * 0.05; // 5% tax
    const shippingCharge = 50; // Fixed shipping charge
    const grandTotal = subtotal + tax + shippingCharge;

    // Display the updated totals
    displayTotals(subtotal, tax, shippingCharge, grandTotal);
}

// Function to display totals
function displayTotals(subtotal, tax, shippingCharge, grandTotal) {
    // Create a container for totals if it doesn't exist
    let totalsElement = document.getElementById('cart-totals');
    if (!totalsElement) {
        totalsElement = document.createElement('div');
        totalsElement.className = 'cart-totals';
        totalsElement.id = 'cart-totals';
        document.getElementById('cart-items').appendChild(totalsElement);
    }

    // Only display totals if there are items in the cart
    if (cart.length > 0) {
        totalsElement.innerHTML = `
            <h2>Subtotal: <span>₹ ${subtotal.toFixed(2)}</span></h2>
            <h2>Tax (5%): <span>₹ ${tax.toFixed(2)}</span></h2>
            <h2>Shipping Charge: <span>₹ ${shippingCharge}</span></h2>
            <h2>Grand Total: <span>₹ ${grandTotal.toFixed(2)}</span></h2>
            <button id="checkout-button">Checkout</button>
        `;
    } else {
        // Clear the totals display completely if the cart is empty
        totalsElement.innerHTML = '';
    }

    // Add event listener for checkout button
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            // Redirect to checkout page, passing the grand total in the URL
            window.location.href = `checkout.html?total=${grandTotal.toFixed(2)}`;
        });
    }
}

// Clear cart functionality
document.getElementById('clear-cart').addEventListener('click', function() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    // Reset totals display
    displayTotals(0, 0, 0, 0); // Resets the total display
});



function saveCartToDatabase() {
    const cartData = {
        items: cart.map(item => ({ name: item.name, quantity: item.quantity })),
        grandTotal: parseFloat(document.querySelector('#cart-totals span:last-child').innerText.replace('₹', ''))
    };

    fetch('http://localhost:3000/saveCart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        alert('Cart data saved successfully!');
    })
    .catch(error => console.error('Error:', error));
}





// Initial display of cart items
displayCart();
