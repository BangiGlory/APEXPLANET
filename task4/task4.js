document.addEventListener('DOMContentLoaded', () => {
    // Sample Product Data (More realistic data for demonstration)
    const products = [
        { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 99.99, rating: 4.5, image: 'https://picsum.photos/id/20/400/300' },
        { id: 2, name: 'Ergonomic Office Chair', category: 'Furniture', price: 249.00, rating: 4.2, image: 'https://picsum.photos/id/178/400/300' },
        { id: 3, name: 'Smart Watch X', category: 'Electronics', price: 199.50, rating: 4.7, image: 'https://picsum.photos/id/21/400/300' },
        { id: 4, name: 'Travel Backpack', category: 'Accessories', price: 75.00, rating: 4.0, image: 'https://picsum.photos/id/22/400/300' },
        { id: 5, name: 'Portable Bluetooth Speaker', category: 'Electronics', price: 59.99, rating: 4.3, image: 'https://picsum.photos/id/23/400/300' },
        { id: 6, name: 'Desk Lamp with LED', category: 'Furniture', price: 45.00, rating: 3.9, image: 'https://picsum.photos/id/24/400/300' },
        { id: 7, name: 'Gaming Mouse', category: 'Electronics', price: 35.75, rating: 4.1, image: 'https://picsum.photos/id/25/400/300' },
        { id: 8, name: 'Yoga Mat Pro', category: 'Sports', price: 29.99, rating: 4.8, image: 'https://picsum.photos/id/26/400/300' },
        { id: 9, name: 'External SSD 1TB', category: 'Electronics', price: 120.00, rating: 4.6, image: 'https://picsum.photos/id/27/400/300' },
        { id: 10, name: 'Water Bottle Stainless Steel', category: 'Accessories', price: 18.50, rating: 4.4, image: 'https://picsum.photos/id/28/400/300' },
        { id: 11, name: 'Running Shoes X2', category: 'Sports', price: 89.99, rating: 4.2, image: 'https://picsum.photos/id/29/400/300' },
        { id: 12, name: 'Smart Home Hub', category: 'Smart Home', price: 150.00, rating: 4.9, image: 'https://picsum.photos/id/30/400/300' }
    ];

    let filteredProducts = [...products]; // Working copy of products for filtering/sorting

    // --- DOM Elements ---
    const productGrid = document.getElementById('product-grid');
    const sortBySelect = document.getElementById('sort-by');
    const categoryFiltersContainer = document.getElementById('category-filters');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const applyPriceFilterBtn = document.getElementById('apply-price-filter');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    const noResultsMessage = document.getElementById('no-results-message');
    const toggleFiltersBtn = document.getElementById('toggle-filters-btn');
    const sidebar = document.getElementById('sidebar');

    // --- Helper Functions ---

    // Function to render star ratings
    function getStarRating(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        let starsHtml = '';
        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<i class="fas fa-star"></i>';
        }
        if (halfStar) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        }
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += '<i class="far fa-star"></i>'; // far for empty star
        }
        return `<div class="product-rating">${starsHtml} (${rating})</div>`;
    }

    // Function to render products
    function renderProducts(productsToRender) {
        productGrid.innerHTML = ''; // Clear existing products
        if (productsToRender.length === 0) {
            noResultsMessage.style.display = 'flex'; // Show no results message
            return;
        }
        noResultsMessage.style.display = 'none'; // Hide no results message

        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>Category: ${product.category}</p>
                    ${getStarRating(product.rating)}
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="add-to-cart-btn">Add to Cart</button>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
    }

    // Function to populate category filters
    function populateCategoryFilters() {
        const categories = [...new Set(products.map(p => p.category))]; // Get unique categories
        categories.forEach(category => {
            const checkboxId = `category-${category.toLowerCase().replace(/\s/g, '-')}`;
            const checkboxHtml = `
                <label for="${checkboxId}">
                    <input type="checkbox" id="${checkboxId}" value="${category}" class="category-checkbox">
                    ${category}
                </label>
            `;
            categoryFiltersContainer.innerHTML += checkboxHtml;
        });
    }

    // --- Filtering Logic ---

    function applyFilters() {
        let currentProducts = [...products];

        // 1. Category Filter
        const selectedCategories = Array.from(document.querySelectorAll('.category-checkbox:checked'))
                                       .map(checkbox => checkbox.value);
        if (selectedCategories.length > 0) {
            currentProducts = currentProducts.filter(product =>
                selectedCategories.includes(product.category)
            );
        }

        // 2. Price Filter
        const minPrice = parseFloat(minPriceInput.value);
        const maxPrice = parseFloat(maxPriceInput.value);

        if (!isNaN(minPrice) && minPrice >= 0) {
            currentProducts = currentProducts.filter(product => product.price >= minPrice);
        }
        if (!isNaN(maxPrice) && maxPrice >= 0) {
            currentProducts = currentProducts.filter(product => product.price <= maxPrice);
        }

        filteredProducts = currentProducts; // Update the filteredProducts for sorting
        applySorting(); // Apply sorting after filtering
    }

    // --- Sorting Logic ---

    function applySorting() {
        const sortBy = sortBySelect.value;
        let sorted = [...filteredProducts]; // Sort the currently filtered products

        switch (sortBy) {
            case 'name-asc':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                sorted.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'price-asc':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'rating-desc':
                sorted.sort((a, b) => b.rating - a.rating);
                break;
            case 'default':
            default:
                // No specific sort, use initial order or a stable sort if needed
                // For simplicity, we just won't sort if default is selected
                break;
        }
        renderProducts(sorted);
    }

    // --- Clear Filters ---
    function clearAllFilters() {
        // Clear category checkboxes
        document.querySelectorAll('.category-checkbox:checked').forEach(checkbox => {
            checkbox.checked = false;
        });

        // Clear price inputs
        minPriceInput.value = '';
        maxPriceInput.value = '';

        // Reset sort select
        sortBySelect.value = 'default';

        // Re-apply filters which will now show all products
        filteredProducts = [...products]; // Reset filtered products to original
        applySorting(); // Apply sorting to the reset products
    }


    // --- Event Listeners ---

    // Category filter change
    categoryFiltersContainer.addEventListener('change', applyFilters);

    // Price filter application
    applyPriceFilterBtn.addEventListener('click', applyFilters);
    minPriceInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') applyFilters(); });
    maxPriceInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') applyFilters(); });


    // Sort by dropdown change
    sortBySelect.addEventListener('change', applySorting);

    // Clear all filters button
    clearFiltersBtn.addEventListener('click', clearAllFilters);

    // Toggle sidebar on mobile
    toggleFiltersBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Close sidebar if clicking outside (on overlay)
    sidebar.addEventListener('click', (e) => {
        if (e.target === sidebar && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });

    // --- Initial Render ---
    populateCategoryFilters();
    renderProducts(products); // Render all products initially
});