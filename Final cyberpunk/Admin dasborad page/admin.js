        // Load products from localStorage on page load
        window.addEventListener('load', function() {
            loadProducts();
        });

        // Add Product Form Handler
        document.getElementById('addProductForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            
            // Save product to localStorage
            const products = JSON.parse(localStorage.getItem('products') || '[]');
            const newProduct = {
                id: Date.now(),
                name: formData.get('productName'),
                price: formData.get('price'),
                description: formData.get('description')
            };
            products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(products));
            
            showNotification('Product added successfully!', 'success');
            loadProducts();
            this.reset();
        });

        // Edit Product Function
        function editProduct(productId) {
            const modal = document.getElementById('editModal');
            const form = document.getElementById('editProductForm');
            const products = JSON.parse(localStorage.getItem('products') || '[]');
            const product = products.find(p => p.id === productId) || 
                          {name: document.querySelector(`[data-id="${productId}"] h3`).textContent,
                           price: document.querySelector(`[data-id="${productId}"] p`).textContent.replace('Price: $', '')};

            form.querySelector('[name="productId"]').value = productId;
            form.querySelector('[name="editProductName"]').value = product.name;
            form.querySelector('[name="editPrice"]').value = product.price;
            form.querySelector('[name="editDescription"]').value = product.description || '';

            modal.classList.add('active');
        }

        // Close Edit Modal
        function closeEditModal() {
            document.getElementById('editModal').classList.remove('active');
        }

        // Edit Product Form Handler
        document.getElementById('editProductForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const productId = parseInt(this.querySelector('[name="productId"]').value);
            const newName = this.querySelector('[name="editProductName"]').value;
            const newPrice = this.querySelector('[name="editPrice"]').value;
            const newDescription = this.querySelector('[name="editDescription"]').value;

            // Update in localStorage
            const products = JSON.parse(localStorage.getItem('products') || '[]');
            const productIndex = products.findIndex(p => p.id === productId);
            
            if (productIndex !== -1) {
                products[productIndex] = {
                    ...products[productIndex],
                    name: newName,
                    price: newPrice,
                    description: newDescription
                };
                localStorage.setItem('products', JSON.stringify(products));
            }

            // Update UI
            const product = document.querySelector(`.product-card[data-id="${productId}"]`);
            product.querySelector('h3').textContent = newName;
            product.querySelector('p').textContent = `Price: $${newPrice}`;

            closeEditModal();
            showNotification('Product updated successfully!', 'success');
        });

        let productToDelete = null;

        // Delete Product Function
        function deleteProduct(productId) {
            productToDelete = productId;
            document.getElementById('deleteModal').classList.add('active');
        }

        // Close Delete Modal
        function closeDeleteModal() {
            document.getElementById('deleteModal').classList.remove('active');
            productToDelete = null;
        }

        // Confirm Delete Handler
        document.getElementById('confirmDelete').addEventListener('click', function() {
            if (productToDelete) {
                // Remove from localStorage
                const products = JSON.parse(localStorage.getItem('products') || '[]');
                const updatedProducts = products.filter(p => p.id !== productToDelete);
                localStorage.setItem('products', JSON.stringify(updatedProducts));

                // Remove from UI
                const product = document.querySelector(`.product-card[data-id="${productToDelete}"]`);
                product.remove();

                closeDeleteModal();
                showNotification('Product deleted successfully!', 'success');
            }
        });

        // Load Products Function
        function loadProducts() {
            const products = JSON.parse(localStorage.getItem('products') || '[]');
            const productsList = document.querySelector('.products-list');
            
            // Keep the heading
            const heading = productsList.querySelector('h2');
            productsList.innerHTML = '';
            productsList.appendChild(heading);

            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.setAttribute('data-id', product.id);
                productCard.innerHTML = `
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>Price: $${product.price}</p>
                    </div>
                    <div class="product-actions">
                        <button class="btn edit-btn" onclick="editProduct(${product.id})">
                            <i class="fas fa-edit"></i>
                            Edit
                        </button>
                        <button class="btn delete-btn" onclick="deleteProduct(${product.id})">
                            <i class="fas fa-trash"></i>
                            Delete
                        </button>
                    </div>
                `;
                productsList.appendChild(productCard);
            });
        }

        // Show Notification Function
        function showNotification(message, type = 'success') {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.innerHTML = `
                <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}-circle" 
                   style="color: ${type === 'success' ? '#10b981' : '#e74c3c'}; margin-right: 8px;"></i>
                ${message}
            `;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }

        // Add hover effect to buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px)';
            });
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });
        });