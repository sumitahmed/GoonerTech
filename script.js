document.addEventListener('DOMContentLoaded', () => {
    console.log('Tech E-commerce site loading...');
    
    // Tech Products Data
    const products = [
        {id: 1, name: "AeroBook Pro 15-inch", price: 1299.99, category: "laptops", image: "https://placehold.co/300x300/e0e7ff/1d4ed8?text=AeroBook+Pro", rating: 4.8, discount: 10},
        {id: 2, name: "Quantum Wireless Earbuds", price: 149.00, category: "audio", image: "https://placehold.co/300x300/e0e7ff/1d4ed8?text=Earbuds", rating: 4.6},
        {id: 3, name: "Galaxy S25 Smartphone", price: 899.00, originalPrice: 999.00, category: "smartphones", image: "https://placehold.co/300x300/e0e7ff/1d4ed8?text=Galaxy+S25", rating: 4.9},
        {id: 4, name: "Chroma Mechanical Keyboard", price: 119.99, category: "accessories", image: "https://placehold.co/300x300/e0e7ff/1d4ed8?text=Keyboard", rating: 4.7},
        {id: 5, name: "Nova Smartwatch Series 8", price: 399.50, category: "accessories", image: "https://placehold.co/300x300/e0e7ff/1d4ed8?text=Smartwatch", rating: 4.5},
        {id: 6, name: "SonicBlast Bluetooth Speaker", price: 89.99, category: "audio", image: "https://placehold.co/300x300/e0e7ff/1d4ed8?text=Speaker", rating: 4.4, discount: 15},
        {id: 7, name: "Pixel Tablet Pro", price: 549.00, category: "smartphones", image: "https://placehold.co/300x300/e0e7ff/1d4ed8?text=Tablet+Pro", rating: 4.6},
        {id: 8, name: "4K UHD 27-inch Monitor", price: 450.00, category: "accessories", image: "https://placehold.co/300x300/e0e7ff/1d4ed8?text=4K+Monitor", rating: 4.7},
        {id: 9, name: "Blade Gaming Laptop 16-inch", price: 2499.00, category: "laptops", image: "https://placehold.co/300x300/e0e7ff/1d4ed8?text=Gaming+Laptop", rating: 4.8, discount: 5},
        {id: 10, name: "Pro-Gamer Mouse", price: 79.99, category: "accessories", image: "https://placehold.co/300x300/e0e7ff/1d4ed8?text=Gaming+Mouse", rating: 4.5},
        {id: 11, name: "EchoSphere Smart Hub", price: 129.99, category: "accessories", image: "https://placehold.co/300x300/e0e7ff/1d4ed8?text=Smart+Hub", rating: 4.4},
        {id: 12, name: "Studio Pro Headphones", price: 349.50, category: "audio", image: "https://placehold.co/300x300/e0e7ff/1d4ed8?text=Headphones", rating: 4.7}
    ];

    // State Management
    let cart = [];
    let wishlist = [];
    let currentUser = null;
    let currentTheme = 'light';
    let filteredProducts = [...products];
    let currentSection = 'home';

    // DOM Elements
    const productList = document.getElementById("product-list");
    const featuredProducts = document.getElementById("featured-products");
    const cartItems = document.getElementById("cart-items");
    const wishlistItems = document.getElementById("wishlist-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const emptyWishlistMessage = document.getElementById("empty-wishlist");
    const totalPriceDisplay = document.getElementById("total-price");
    const cartCount = document.getElementById("cart-count");
    const wishlistCount = document.getElementById("wishlist-count");
    const darkModeBtn = document.querySelector('.dark-mode-btn');
    const searchDropdown = document.getElementById('search-dropdown');
    const mobileMenu = document.getElementById('mobile-menu');

    console.log('DOM elements loaded');

    // Initialize
    init();

    function init() {
        console.log('Initializing tech e-commerce site...');
        displayFeaturedProducts();
        displayProducts(filteredProducts);
        renderCart();
        renderWishlist();
        checkUserLogin();
        showSection('home');
        initializeDarkMode();
        updateCounts();
    }

    // Dark Mode Functions
    function initializeDarkMode() {
        if (currentTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            if (darkModeBtn) darkModeBtn.textContent = '☀️';
        } else {
            document.body.removeAttribute('data-theme');
            if (darkModeBtn) darkModeBtn.textContent = '🌙';
        }
    }

    function toggleDarkMode() {
        const body = document.body;
        const isDark = body.getAttribute('data-theme') === 'dark';
        
        if (isDark) {
            body.removeAttribute('data-theme');
            currentTheme = 'light';
            if (darkModeBtn) darkModeBtn.textContent = '🌙';
            showNotification('Light mode activated! ☀️');
        } else {
            body.setAttribute('data-theme', 'dark');
            currentTheme = 'dark';
            if (darkModeBtn) darkModeBtn.textContent = '☀️';
            showNotification('Dark mode activated! 🌙');
        }
    }

    // Search Functions
    function toggleSearch() {
        if (searchDropdown) {
            searchDropdown.classList.toggle('hidden');
            if (!searchDropdown.classList.contains('hidden')) {
                const searchInput = document.getElementById('search-input');
                if (searchInput) searchInput.focus();
            }
        }
    }

    function filterProducts() {
        const searchInput = document.getElementById('search-input');
        const priceFilter = document.getElementById('price-filter');
        const categoryFilter = document.getElementById('category-filter');
        
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const priceFilterValue = priceFilter ? priceFilter.value : 'all';
        const categoryFilterValue = categoryFilter ? categoryFilter.value : 'all';
        
        filteredProducts = products.filter(product => {
            // Search filter
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                                product.category.toLowerCase().includes(searchTerm);
            
            // Price filter
            let matchesPrice = true;
            if (priceFilterValue === 'below300') {
                matchesPrice = product.price < 300;
            } else if (priceFilterValue === '300to1000') {
                matchesPrice = product.price >= 300 && product.price <= 1000;
            } else if (priceFilterValue === 'above1000') {
                matchesPrice = product.price > 1000;
            }
            
            // Category filter
            const matchesCategory = categoryFilterValue === 'all' || product.category === categoryFilterValue;
            
            return matchesSearch && matchesPrice && matchesCategory;
        });
        
        displayProducts(filteredProducts);
    }

    // Mobile Menu
    function toggleMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden');
        }
    }

    // Product Display Functions
    function displayFeaturedProducts() {
        if (!featuredProducts) return;
        
        // Get first 4 products for featured section
        const featured = products.slice(0, 4);
        
        featuredProducts.innerHTML = '';
        featured.forEach(product => {
            const productCard = createProductCard(product, true);
            featuredProducts.appendChild(productCard);
        });
    }

    function displayProducts(productsToShow) {
        if (!productList) return;
        
        productList.innerHTML = '';
        
        if (productsToShow.length === 0) {
            productList.innerHTML = '<div class="no-products"><p>No gadgets found matching your criteria.</p></div>';
            return;
        }
        
        productsToShow.forEach(product => {
            const productCard = createProductCard(product, false);
            productList.appendChild(productCard);
        });
    }

    function createProductCard(product, isFeatured = false) {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-card');
        
        const discountHtml = product.discount ? `<div class="discount">-${product.discount}%</div>` : '';
        const originalPriceHtml = product.originalPrice ? `<span style="text-decoration: line-through; opacity: 0.6;">$${product.originalPrice.toFixed(2)}</span> ` : '';
        const ratingStars = generateStars(product.rating);
        
        productDiv.innerHTML = `
            ${discountHtml}
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">
                    ${originalPriceHtml}$${product.price.toFixed(2)}
                </div>
                <div class="product-rating">
                    ${ratingStars}
                    <span>(${product.rating})</span>
                </div>
                ${!isFeatured ? `
                <div class="product-buttons">
                    <button onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">Add to Cart</button>
                    <button class="wishlist-btn" onclick="addToWishlist(${product.id})">♡ Wishlist</button>
                </div>
                ` : ''}
            </div>
        `;
        
        // Add click listener for featured products
        if (isFeatured) {
            productDiv.addEventListener('click', () => {
                addToCart(product);
            });
        }
        
        return productDiv;
    }

    function generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let starsHtml = '';
        
        // Full stars
        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<span class="star">★</span>';
        }
        
        // Half star
        if (hasHalfStar) {
            starsHtml += '<span class="star">☆</span>';
        }
        
        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += '<span class="star" style="opacity: 0.3;">☆</span>';
        }
        
        return starsHtml;
    }

    // Cart Functions
    function addToCart(product) {
        const existingIndex = cart.findIndex(item => item.id === product.id);
        if (existingIndex !== -1) {
            cart[existingIndex].quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }
        renderCart();
        updateCounts();
        showNotification(`${product.name} added to cart!`);
    }

    function removeFromCart(id) {
        const product = cart.find(item => item.id === id);
        cart = cart.filter(item => item.id !== id);
        renderCart();
        updateCounts();
        if (product) {
            showNotification(`${product.name} removed from cart!`);
        }
    }

    function updateQuantity(id, change) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeFromCart(id);
            } else {
                renderCart();
                updateCounts();
            }
        }
    }

    function renderCart() {
        if (!cartItems || !totalPriceDisplay) return;
        
        cartItems.innerHTML = "";
        let totalPrice = 0;

        if (cart.length > 0) {
            if (emptyCartMessage) emptyCartMessage.classList.add("hidden");

            cart.forEach(item => {
                totalPrice += item.price * item.quantity;
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="item-info">
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div class="item-controls">
                        <button onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="secondary-btn" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                `;
                cartItems.appendChild(cartItem);
            });

            totalPriceDisplay.textContent = totalPrice.toFixed(2);
        } else {
            if (emptyCartMessage) emptyCartMessage.classList.remove("hidden");
            totalPriceDisplay.textContent = '0.00';
        }
    }

    // Wishlist Functions
    function addToWishlist(productId) {
        const product = products.find(p => p.id === productId);
        const exists = wishlist.find(item => item.id === productId);
        
        if (!exists && product) {
            wishlist.push(product);
            renderWishlist();
            updateCounts();
            showNotification(`${product.name} added to wishlist!`);
        } else if (product) {
            showNotification(`${product.name} is already in wishlist!`);
        }
    }

    function removeFromWishlist(id) {
        const product = wishlist.find(item => item.id === id);
        wishlist = wishlist.filter(item => item.id !== id);
        renderWishlist();
        updateCounts();
        if (product) {
            showNotification(`${product.name} removed from wishlist!`);
        }
    }

    function renderWishlist() {
        if (!wishlistItems) return;
        
        wishlistItems.innerHTML = "";

        if (wishlist.length > 0) {
            if (emptyWishlistMessage) emptyWishlistMessage.classList.add("hidden");

            wishlist.forEach(item => {
                const wishlistItem = document.createElement('div');
                wishlistItem.className = 'wishlist-item';
                wishlistItem.innerHTML = `
                    <div class="item-info">
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)}</p>
                        <p class="product-category">${item.category}</p>
                    </div>
                    <div class="item-controls">
                        <button onclick="addToCart(${JSON.stringify(item).replace(/"/g, '&quot;')})">Add to Cart</button>
                        <button class="secondary-btn" onclick="removeFromWishlist(${item.id})">Remove</button>
                    </div>
                `;
                wishlistItems.appendChild(wishlistItem);
            });
        } else {
            if (emptyWishlistMessage) emptyWishlistMessage.classList.remove("hidden");
        }
    }

    // Update counts in header
    function updateCounts() {
        const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalWishlistItems = wishlist.length;
        
        if (cartCount) {
            cartCount.textContent = totalCartItems;
            cartCount.style.display = totalCartItems > 0 ? 'flex' : 'none';
        }
        
        if (wishlistCount) {
            wishlistCount.textContent = totalWishlistItems;
            wishlistCount.style.display = totalWishlistItems > 0 ? 'flex' : 'none';
        }
    }

    // User Authentication
    function toggleLogin() {
        showSection('login');
    }

    function login() {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        
        if (username && email) {
            currentUser = { username, email };
            checkUserLogin();
            showNotification(`Welcome back, ${username}!`);
            showSection('home');
            
            // Clear form
            document.getElementById('username').value = '';
            document.getElementById('email').value = '';
        } else {
            showNotification('Please fill in all fields');
        }
    }

    function logout() {
        currentUser = null;
        checkUserLogin();
        showNotification('Logged out successfully!');
        showSection('home');
    }

    function checkUserLogin() {
        const loginForm = document.querySelector('.login-form');
        const userInfo = document.getElementById('user-info');
        const loggedUsername = document.getElementById('logged-username');

        if (currentUser) {
            if (loginForm) loginForm.classList.add('hidden');
            if (userInfo) userInfo.classList.remove('hidden');
            if (loggedUsername) loggedUsername.textContent = currentUser.username;
        } else {
            if (loginForm) loginForm.classList.remove('hidden');
            if (userInfo) userInfo.classList.add('hidden');
        }
    }

    // Checkout Functions
    function showCheckout() {
        if (cart.length === 0) {
            showNotification('Your cart is empty!');
            return;
        }
        showSection('checkout');
    }

    function placeOrder() {
        const name = document.getElementById('checkout-name').value;
        const address = document.getElementById('checkout-address').value;
        const phone = document.getElementById('checkout-phone').value;
        const email = document.getElementById('checkout-email').value;

        if (name && address && phone && email) {
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            showNotification(`Order placed successfully! Thank you, ${name}! Total: $${total.toFixed(2)}`);
            
            cart = [];
            renderCart();
            updateCounts();
            showSection('home');
            
            // Clear form
            document.getElementById('checkout-name').value = '';
            document.getElementById('checkout-address').value = '';
            document.getElementById('checkout-phone').value = '';
            document.getElementById('checkout-email').value = '';
        } else {
            showNotification('Please fill in all fields');
        }
    }

    // Navigation
    function showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('hidden');
        });
        
        // Show selected section
        const targetSection = document.getElementById(`${sectionName}-section`);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            currentSection = sectionName;
        }
        
        // Close mobile menu and search dropdown
        if (mobileMenu) mobileMenu.classList.add('hidden');
        if (searchDropdown) searchDropdown.classList.add('hidden');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Notification System
    function showNotification(message) {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notification-text');
        
        if (!notification || !notificationText) {
            console.log(message);
            return;
        }
        
        notificationText.textContent = message;
        notification.classList.remove('hidden');
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.classList.add('hidden');
            }, 300);
        }, 3000);
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container') && searchDropdown) {
            searchDropdown.classList.add('hidden');
        }
        
        if (!e.target.closest('.hamburger') && !e.target.closest('.mobile-menu') && mobileMenu) {
            mobileMenu.classList.add('hidden');
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            if (mobileMenu) mobileMenu.classList.add('hidden');
        }
    });

    // Make functions globally available
    window.showSection = showSection;
    window.toggleDarkMode = toggleDarkMode;
    window.toggleSearch = toggleSearch;
    window.toggleMobileMenu = toggleMobileMenu;
    window.filterProducts = filterProducts;
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.updateQuantity = updateQuantity;
    window.addToWishlist = addToWishlist;
    window.removeFromWishlist = removeFromWishlist;
    window.toggleLogin = toggleLogin;
    window.login = login;
    window.logout = logout;
    window.showCheckout = showCheckout;
    window.placeOrder = placeOrder;

    console.log('Tech e-commerce site fully initialized!');
});