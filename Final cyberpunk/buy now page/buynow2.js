// Initialize cart in localStorage if it doesn't exist
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

function addToCart(button, productName) {
    // Disable button
    button.disabled = true;
    
    // Loading state
    button.classList.add('loading');
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
    
    // Subtle haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
    
    // Get the product details and update localStorage
    const productContainer = button.closest('.product-one, .product-two');
    const price = productContainer.querySelector('.product-Price h2').textContent;
    const description = productContainer.querySelector('.product-Description p').textContent;
    const imageUrl = productContainer.querySelector('img').src;

    const product = {
        name: productName,
        price: price,
        description: description,
        imageUrl: imageUrl,
        quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    
    setTimeout(() => {
        // Success state
        button.classList.remove('loading');
        button.classList.add('added');
        button.innerHTML = '<i class="fas fa-check"></i> Added';
        
        // Create notifications
        createNotification('Cart Updated', `${productName} added to cart`);
        createNotification('Quick Actions', 'View Cart or Continue Shopping');
        
        // Reset button
        setTimeout(() => {
            button.classList.remove('added');
            button.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
            button.disabled = false;
        }, 2000);
    }, 800);
}

function createNotification(title, message) {
    const container = document.querySelector('.notification-container') || 
                     (() => {
                         const cont = document.createElement('div');
                         cont.className = 'notification-container';
                         document.body.appendChild(cont);
                         return cont;
                     })();
    
    const notification = document.createElement('div');
    notification.className = 'notification-card';
    
    notification.innerHTML = `
        <i class="fas ${title === 'Cart Updated' ? 'fa-shopping-cart' : 'fa-bell'}"></i>
        <div class="notification-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
        <div class="notification-progress"></div>
    `;
    
    container.appendChild(notification);
    
    // Remove notification after delay
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}