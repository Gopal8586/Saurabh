// Mixitup connects with menu
var products = document.querySelector(".products");
var mixer = mixitup(products);
// End Mixitup connects with menu

// Cursor
document.addEventListener("mousemove", (e) => {
    const cursor = document.querySelector(".cursor");
    cursor.style.left = e.pageX + "px";
    cursor.style.top = e.pageY + "px";
});
// Cursor Ends

// Search bar for menu
const search = () => {
    const searchbox = document.getElementById("search-item").value.toUpperCase();
    const storeitems = document.getElementById("products");
    const products = document.getElementsByClassName("mix");
    const pname = document.getElementsByTagName("h3");

    for (var i = 0; i < pname.length; i++) {
        let firstMatch = products[i].getElementsByTagName("h3")[0];
        let secondMatch = products[i].getElementsByTagName("h3")[1];
    
        let shouldDisplay = false;
    
        if (firstMatch) {
            let firstValue = firstMatch.textContent || firstMatch.innerHTML;
            if (firstValue.toUpperCase().indexOf(searchbox) > -1) {
                shouldDisplay = true; // Set flag to true if a match is found
            }
        }
    
        if (secondMatch) {
            let secondValue = secondMatch.textContent || secondMatch.innerHTML;
            if (secondValue.toUpperCase().indexOf(searchbox) > -1) {
                shouldDisplay = true;
            }
        }   
        products[i].style.display = shouldDisplay ? "" : "none";
    }
    


};
// End Search bar

// Cart page Connect js with menu
const cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartIcon() {
    const uniqueItemCount = cart.length;
    document.getElementById('cart-count').textContent = uniqueItemCount;
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const item = {
            name: this.parentElement.querySelector('h3').textContent,
            price: parseFloat(this.parentElement.querySelector('.price').textContent.replace(/[^0-9.-]+/g, "")),
            image: this.parentElement.parentElement.querySelector('img').src,
            quantity: 1
        };

        const itemIndex = cart.findIndex(cartItem => cartItem.name === item.name);
        if (itemIndex === -1) {
            cart.push(item);
        } else {
            cart[itemIndex].quantity += 1;
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartIcon();
    });
});

updateCartIcon();
// End Cart page Connect js with menu

// This is cart count icon
let cartCount = 0;

function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    cartCountElement.textContent = cartCount;
}

function addToCart(item) {
    cartCount++;
    updateCartCount();
}

document.querySelectorAll('.add-to-cart-button').forEach(button => {
    button.addEventListener('click', () => {
        const item = {};
        addToCart(item);
    });
});
// Cart end

// Send details to cart page
document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll("button");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const item = button.closest(".mix");
            const image = item.querySelector("img").src;
            const name = item.querySelector(".detail h3").textContent;
            const price = item.querySelector(".price").textContent;

            const cart = JSON.parse(localStorage.getItem("cart")) || [];

            const existingItem = cart.find(cartItem => cartItem.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    image: image,
                    name: name,
                    price: price,
                    quantity: 1
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
        });
    });
});
// End...................................................