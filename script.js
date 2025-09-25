// Language and theme state
let currentLang = localStorage.getItem("lang") || "en";
let isDarkMode = false;

// Data variables - will be loaded from JSON
let classificationConfig = {};
let products = [];
let bestSellingProducts = [];
let searchTerm = '';

// Load data from JSON files
async function loadData() {
    try {
        const [productsResponse, categoriesResponse, bestsellersResponse] = await Promise.all([
            fetch('data/products.json'),
            fetch('data/categories.json'),
            fetch('data/bestsellers.json')
        ]);
        
        const rawProducts = await productsResponse.json();
        classificationConfig = await categoriesResponse.json();
        const bestsellersData = await bestsellersResponse.json();
        
        // Filter and validate products data
        products = rawProducts.filter(product => 
            product && product.id && product.name && product.description && product.category
        );
        
        // Build bestsellers array from products and bestsellers data
        bestSellingProducts = bestsellersData
            .map(bestseller => {
                const product = products.find(p => p.id === bestseller.productId);
                if (!product) return null;
                return {
                    ...product,
                    originalPrice: bestseller.originalPrice,
                    discount: bestseller.discount
                };
            })
            .filter(item => item !== null);
        
        return true;
    } catch (error) {
        console.error('Error loading data:', error);
        return false;
    }
}

// Current filter state
let currentPrimaryCategory = null;
let currentSecondaryCategory = null;
let hasSelectedCategory = false;

// Language switching functionality
function toggleLanguage() {
    currentLang = currentLang === "en" ? "ar" : "en";
    localStorage.setItem("lang", currentLang);
  
    const html = document.documentElement;
    if (currentLang === "ar") {
      html.setAttribute("lang", "ar");
      html.setAttribute("dir", "rtl");
    } else {
      html.setAttribute("lang", "en");
      html.setAttribute("dir", "ltr");
    }
  
    updateTextContent();
}
  
// Dark mode functionality
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    const html = document.documentElement;
  
    if (isDarkMode) {
      html.setAttribute("data-theme", "dark");
      localStorage.setItem("darkMode", "true");
    } else {
      html.setAttribute("data-theme", "light");
      localStorage.setItem("darkMode", "false");
    }
  
    updateDarkModeIcon();
}
  
// Update dark mode icon
function updateDarkModeIcon() {
    const darkModeIcon = document.querySelector(".dark-mode-icon");
    if (darkModeIcon) {
      darkModeIcon.textContent = isDarkMode ? "☀️" : "🌙";
    }
}

// Initialize dark mode from localStorage (called early to prevent FOUC)
function initializeDarkMode() {
    const savedMode = localStorage.getItem('darkMode');
    const html = document.documentElement;
    
    if (savedMode === 'true') {
        isDarkMode = true;
        html.setAttribute('data-theme', 'dark');
    } else {
        isDarkMode = false;
        html.setAttribute('data-theme', 'light');
    }
    
    // Update icon after DOM is ready
    setTimeout(() => updateDarkModeIcon(), 0);
}

// Initialize theme immediately to prevent FOUC
(function() {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
})();

// Update all text content based on current language
function updateTextContent() {
    const elements = document.querySelectorAll('[data-en][data-ar]');
    elements.forEach(element => {
        if (currentLang === 'ar') {
            if (element.children.length === 0) {
                element.textContent = element.getAttribute('data-ar');
            } else {
                element.innerHTML = element.getAttribute('data-ar');
            }
        } else {
            if (element.children.length === 0) {
                element.textContent = element.getAttribute('data-en');
            } else {
                element.innerHTML = element.getAttribute('data-en');
            }
        }
    });
    
    // Update form placeholders and options if on contact page
    updateFormContent();
    
    // Re-render products and update classification bars if secondary bar is visible
    if (document.getElementById('primaryBar')) {
        if (currentSecondaryCategory && document.getElementById('secondaryBar').style.display !== 'none') {
            populateSecondaryBar(currentPrimaryCategory);
        }
        // Display products if a category has been selected OR if search is active
        if (hasSelectedCategory || searchTerm) {
            displayProducts();
        }
    }
}

function updateFormContent() {
    // Update search input placeholder
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const placeholder = currentLang === 'ar' ? 'البحث عن المنتجات...' : 'Search products...';
        searchInput.placeholder = placeholder;
    }
}

// Search functionality with debouncing
let searchTimeout;
function performSearch() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const searchInput = document.getElementById('searchInput');
        searchTerm = searchInput.value.toLowerCase().trim();
        
        // Reset category selection if searching
        if (searchTerm) {
            currentPrimaryCategory = null;
            currentSecondaryCategory = null;
            hasSelectedCategory = false;
            
            // Hide classification bars when searching
            const primaryBar = document.getElementById('primaryBar');
            const secondaryBar = document.getElementById('secondaryBar');
            if (primaryBar) primaryBar.style.display = 'none';
            if (secondaryBar) secondaryBar.style.display = 'none';
        } else {
            // Show primary bar when search is cleared
            const primaryBar = document.getElementById('primaryBar');
            if (primaryBar) primaryBar.style.display = 'block';
        }
        
        displayProducts();
    }, 300);
}

function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = '';
    searchTerm = '';
    currentPrimaryCategory = null;
    currentSecondaryCategory = null;
    hasSelectedCategory = false;
    
    // Show primary bar
    const primaryBar = document.getElementById('primaryBar');
    const secondaryBar = document.getElementById('secondaryBar');
    if (primaryBar) primaryBar.style.display = 'block';
    if (secondaryBar) secondaryBar.style.display = 'none';
    
    // Show initial message
    const container = document.getElementById('productsContainer');
    if (container && primaryBar) {
        container.innerHTML = `
            <div class="no-products">
                <p data-en="Please select a category above to view products" data-ar="يرجى اختيار فئة أعلاه لعرض المنتجات">
                    ${currentLang === 'ar' ? 'يرجى اختيار فئة أعلاه لعرض المنتجات' : 'Please select a category above to view products'}
                </p>
            </div>
        `;
    }
}

function filterProductsBySearch(products) {
    if (!searchTerm) return products;
    
    return products.filter(product => {
        const name = product.name[currentLang].toLowerCase();
        const description = product.description[currentLang].toLowerCase();
        const id = product.id.toLowerCase();
        
        return name.includes(searchTerm) || 
               description.includes(searchTerm) || 
               id.includes(searchTerm);
    });
}

function setupSearchListeners() {
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', performSearch);
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Escape') {
                clearSearch();
            }
        });
    }
    
    if (clearButton) {
        clearButton.addEventListener('click', clearSearch);
    }
}

// WhatsApp functionality
function openWhatsAppOrder(productId) {
    const whatsappNumber = "+9647819914700"; // Replace with actual WhatsApp business number
    const message = currentLang === 'ar' 
        ? `مرحبا! أود طلب المنتج رقم: ${productId}` 
        : `Hello! I would like to order product ID: ${productId}`;
    
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Primary category selection
function selectPrimaryCategory(primaryCategory) {
    currentPrimaryCategory = primaryCategory;
    currentSecondaryCategory = null;
    hasSelectedCategory = true;
    
    // Update primary buttons
    document.querySelectorAll('.primary-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-primary="${primaryCategory}"]`).classList.add('active');
    
    // Hide primary bar and show secondary bar
    document.getElementById('primaryBar').style.display = 'none';
    document.getElementById('secondaryBar').style.display = 'block';
    
    // Populate secondary bar
    populateSecondaryBar(primaryCategory);
    
    // Display all products for this primary category
    displayProducts();
}

// Populate secondary classification bar
function populateSecondaryBar(primaryCategory) {
    const secondaryBar = document.getElementById('secondaryBar');
    const categoryButtons = secondaryBar.querySelector('.category-buttons');
    
    const config = classificationConfig[primaryCategory];
    if (!config) return;
    
    categoryButtons.innerHTML = config.subcategories.map(subcat => `
        <button class="category-btn secondary-btn" 
                data-secondary="${subcat.key}" 
                data-en="${subcat.name.en}" 
                data-ar="${subcat.name.ar}"
                onclick="selectSecondaryCategory('${subcat.key}')">
            ${subcat.name[currentLang]}
        </button>
    `).join('') + `
        <button class="category-btn secondary-btn back-btn" 
                data-en="Back" 
                data-ar="رجوع"
                onclick="goBackToPrimary()">
            ${currentLang === 'ar' ? 'رجوع' : 'Back'}
        </button>
    `;
    
    // Restore active state for currently selected secondary category
    if (currentSecondaryCategory) {
        const activeBtn = categoryButtons.querySelector(`[data-secondary="${currentSecondaryCategory}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }
}

// Secondary category selection
function selectSecondaryCategory(secondaryCategory) {
    currentSecondaryCategory = secondaryCategory;
    
    // Update secondary buttons
    document.querySelectorAll('.secondary-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-secondary="${secondaryCategory}"]`).classList.add('active');
    
    // Display filtered products
    displayProducts();
}

// Go back to primary categories
function goBackToPrimary() {
    currentSecondaryCategory = null;
    
    // Show primary bar and hide secondary bar
    document.getElementById('primaryBar').style.display = 'block';
    document.getElementById('secondaryBar').style.display = 'none';
    
    // Display all products for current primary category
    displayProducts();
}

// Products functionality with images
function displayProducts() {
    const container = document.getElementById('productsContainer');
    if (!container) return;
    
    let filteredProducts;
    
    if (searchTerm) {
        // Search mode - search all products
        filteredProducts = filterProductsBySearch(products);
    } else if (currentSecondaryCategory) {
        // Filter by specific secondary category
        filteredProducts = products.filter(product => 
            product.primaryCategory === currentPrimaryCategory && 
            product.category === currentSecondaryCategory
        );
    } else if (currentPrimaryCategory) {
        // Show all products for current primary category
        filteredProducts = products.filter(product => 
            product.primaryCategory === currentPrimaryCategory
        );
    } else {
        // No selection made
        return;
    }
    
    if (filteredProducts.length === 0) {
        const noResultsMessage = searchTerm 
            ? (currentLang === 'ar' ? 'لا توجد منتجات تطابق البحث' : 'No products match your search')
            : (currentLang === 'ar' ? 'لا توجد منتجات في هذه الفئة' : 'No products found in this category');
            
        container.innerHTML = `
            <div class="no-products">
                <p>${noResultsMessage}</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name[currentLang]}" loading="lazy">
                <div class="product-id">ID: ${product.id}</div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name[currentLang]}</h3>
                <p class="product-description">${product.description[currentLang]}</p>
                <div class="product-price">${product.price}</div>
            </div>
            <button class="whatsapp-btn" onclick="openWhatsAppOrder('${product.id}')" data-en="Order via WhatsApp" data-ar="اطلب عبر واتساب">
                <span class="whatsapp-icon">📱</span>
                ${currentLang === 'ar' ? 'اطلب عبر واتساب' : 'Order via WhatsApp'}
            </button>
        </div>
    `).join('');
}

// Setup classification bars
function setupClassificationBars() {
    // Only setup if primary bar exists (products page)
    const primaryBar = document.getElementById('primaryBar');
    if (!primaryBar) return;
    
    const primaryButtons = document.querySelectorAll('.primary-btn');
    primaryButtons.forEach(button => {
        // Check if listener already attached to prevent duplicates
        if (!button.dataset.initialized) {
            button.dataset.initialized = 'true';
            button.addEventListener('click', () => {
                const primaryCategory = button.getAttribute('data-primary');
                selectPrimaryCategory(primaryCategory);
            });
        }
    });
}

// Best-selling products for homepage
function displayBestSellers() {
    const container = document.getElementById('bestSellersContainer');
    if (!container) return;
    
    container.innerHTML = bestSellingProducts.map(product => `
        <div class="bestseller-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name[currentLang]}" loading="lazy">
                ${product.discount ? `<div class="discount-badge">${product.discount} ${currentLang === 'ar' ? 'خصم' : 'OFF'}</div>` : ''}
                <div class="product-id">ID: ${product.id}</div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name[currentLang]}</h3>
                <p class="product-description">${product.description[currentLang]}</p>
                <div class="price-section">
                    <div class="current-price">${product.price}</div>
                    ${product.originalPrice ? `<div class="original-price">${product.originalPrice}</div>` : ''}
                </div>
            </div>
            <button class="whatsapp-btn" onclick="openWhatsAppOrder('${product.id}')" data-en="Order via WhatsApp" data-ar="اطلب عبر واتساب">
                <span class="whatsapp-icon">📱</span>
                ${currentLang === 'ar' ? 'اطلب عبر واتساب' : 'Order via WhatsApp'}
            </button>
        </div>
    `).join('');
}

// Contact form functionality
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Simple form validation
    if (!data.name || !data.email || !data.subject || !data.message) {
        alert(currentLang === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields');
        return;
    }
    
    // Simulate form submission
    alert(currentLang === 'ar' ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.' : 'Your message has been sent successfully! We will contact you soon.');
    event.target.reset();
}

// Initialize language from localStorage
const savedLang = localStorage.getItem("lang") || "en";
currentLang = savedLang;
if (currentLang === "ar") {
    document.documentElement.setAttribute("lang", "ar");
    document.documentElement.setAttribute("dir", "rtl");
} else {
    document.documentElement.setAttribute("lang", "en");
    document.documentElement.setAttribute("dir", "ltr");
}

// Initialize page functionality
document.addEventListener('DOMContentLoaded', async function() {
    // Initialize dark mode from saved preference
    initializeDarkMode();
    
    // Load data from JSON files
    const dataLoaded = await loadData();
    if (!dataLoaded) {
        console.error('Failed to load data');
        return;
    }
    
    // Setup classification bars
    setupClassificationBars();
    
    // Setup search functionality
    setupSearchListeners();
    
    // Ensure primary bar is visible initially (only if elements exist)
    const primaryBar = document.getElementById('primaryBar');
    const secondaryBar = document.getElementById('secondaryBar');
    if (primaryBar) {
        primaryBar.style.display = 'block';
    }
    if (secondaryBar) {
        secondaryBar.style.display = 'none';
    }
    
    // Initialize best sellers display on homepage
    displayBestSellers();
    
    // Set up contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Update form placeholders on page load
    updateFormContent();
    
    // Update text content for current language
    updateTextContent();
    
    // Display initial message since no category is selected (only on products page)
    const container = document.getElementById('productsContainer');
    if (container && primaryBar) {
        container.innerHTML = `
            <div class="no-products">
                <p data-en="Please select a category above to view products" data-ar="يرجى اختيار فئة أعلاه لعرض المنتجات">
                    ${currentLang === 'ar' ? 'يرجى اختيار فئة أعلاه لعرض المنتجات' : 'Please select a category above to view products'}
                </p>
            </div>
        `;
    }
});