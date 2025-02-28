// Get the grand total from the URL
function getGrandTotal() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseFloat(urlParams.get('total')) || 0;
}

// Display the cart totals
function displayCartTotals() {
    const total = getGrandTotal();
    const totalsElement = document.getElementById('cart-totals');
    totalsElement.innerHTML = `
        <h2>Grand Total: <span>₹ ${total.toFixed(2)}</span></h2>
    `;
}

// Mock payment API for testing
function mockPaymentAPI(paymentDetails) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (paymentDetails) {
                resolve("Payment Successful!");
            } else {
                reject("Payment Failed!");
            }
        }, 2000); 
    });
}

// Handle card payment
document.getElementById('pay-with-card').addEventListener('click', function () {
    const paymentDetails = {
        type: "Card",
        number: document.getElementById('card-number').value,
        name: document.getElementById('card-name').value,
        expiry: document.getElementById('expiry-date').value,
        cvv: document.getElementById('cvv').value,
        total: getGrandTotal()
    };

    mockPaymentAPI(paymentDetails)
        .then(response => {
            alert(response);
            // Redirect or perform any action after successful payment
            clearCartAndRedirect();
        })
        .catch(error => {
            alert(error);
        });
});

// Handle UPI payment
document.getElementById('pay-with-upi').addEventListener('click', function () {
    const upiId = document.getElementById('upi-id').value.trim();
    const total = getGrandTotal();

    if (upiId) {
        const paymentDetails = {
            type: "UPI",
            upiId: upiId,
            total: total
        };

        mockPaymentAPI(paymentDetails)
            .then(response => {
                alert(response);
                // Redirect or perform any action after successful payment
                clearCartAndRedirect();
            })
            .catch(error => {
                alert(error);
            });
    } else {
        alert('Please enter a valid UPI ID.');
    }
});

// Generate QR Code for payment
document.getElementById('generate-qr').addEventListener('click', function () {
    const total = getGrandTotal();
    const qrCodeContainer = $('#qr-code');
    qrCodeContainer.empty(); // Clear previous QR code

    // Generate QR code with the payment URL or text
    qrCodeContainer.qrcode({
        text: `upi://pay?pa=example@upi&pn=Your%20Name&mc=1234&tid=000123&tn=Payment%20for%20Order&am=${total.toFixed(2)}&cu=INR&url=https://yourwebsite.com`,
        width: 150,
        height: 150,
        correctLevel: QRCode.CorrectLevel.H
    });
});

// Cancel button functionality
document.getElementById('cancel-button').addEventListener('click', function () {
    window.location.href = 'menu.html'; // Redirect to menu page
});


function clearCartAndRedirect() {
    localStorage.removeItem('cart');
    window.location.href = 'menu.html'; 
}


// Initial display of totals
displayCartTotals();
