function addToCart(button, productName) {
    // Disable the button to prevent multiple clicks
    button.disabled = true;

    // Get the product details
    const productContainer = button.closest('.product-one, .product-two');
    const price = productContainer.querySelector('.product-Price h2').textContent;
    const imageUrl = productContainer.querySelector('img').src;

    // Create a product object
    const product = {
        name: productName,
        price: price,
        imageUrl: imageUrl,
        quantity: 1
    };

    // Get the current cart from local storage or initialize it
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex !== -1) {
        // If the product exists, increment the quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // If the product does not exist, add it to the cart
        cart.push(product);
    }

    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Show a success message or notification
    showNotification(`${productName} has been added to your cart!`);

    // Re-enable the button after a short delay
    setTimeout(() => {
        button.disabled = false;
    }, 2000);
}

// Function to show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Show the notification
    notification.style.display = 'block';
    notification.style.opacity = 1;

    // Hide the notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = 0;
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500); // Wait for the fade-out transition
    }, 3000);
}