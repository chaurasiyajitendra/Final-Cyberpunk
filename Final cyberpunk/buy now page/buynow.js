document.addEventListener('DOMContentLoaded', function() {
  const inputElement = document.querySelector('#srchbx input');

  document.getElementById('srch').addEventListener('click', function() {
    inputElement.classList.add('youtube');
    inputElement.classList.remove('srchbx');

    setTimeout(function() {
      if (document.activeElement !== inputElement) {
        inputElement.classList.remove('youtube');
        inputElement.classList.add('srchbx');
      }
    }, 5000); // 5 seconds
  });

  inputElement.addEventListener('focus', function() {
    inputElement.classList.add('youtube');
    inputElement.classList.remove('srchbx');
  });

  inputElement.addEventListener('blur', function() {
    setTimeout(function() {
      if (document.activeElement !== inputElement) {
        inputElement.classList.remove('youtube');
        inputElement.classList.add('srchbx');
      }
    }, 2000); // 2 seconds
  });

  // Line animation
  const infoIcons = document.querySelectorAll('.product-Price .fa-circle-info');
  
  infoIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      const productPrice = this.closest('.product-Price');
      const line = productPrice.nextElementSibling;
      const otherDescription = productPrice.parentElement.querySelector('.other-description, .other-description-two');
      
      if (line && line.classList.contains('line')) {
        line.classList.toggle('show');
      }
      
      if (otherDescription) {
        setTimeout(function() {
          otherDescription.classList.toggle('show');
        }, 500); // 0.5 seconds delay
      }
    });
  });

  // Logo click handler
  const logo = document.querySelector('.logo');
  logo.addEventListener('click', function() {
    window.location.href = './index.html'; // Assuming index.html is in the same directory
  });
});

// Create notification container if it doesn't exist
if (!document.querySelector('.notification-container')) {
    const container = document.createElement('div');
    container.className = 'notification-container';
    document.body.appendChild(container);
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
    const container = document.querySelector('.notification-container');
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

// Ripple effect function
function createRipple(event, button) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    button.appendChild(ripple);
    
    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
}

// Add keyframe animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-progress {
        height: 3px;
        background: var(--accent-color);
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        animation: progress 3s linear;
    }
    
    @keyframes progress {
        to {
            width: 0%;
        }
    }
`;
document.head.appendChild(style);