// Language and theme state
let currentLang = 'en';
let isDarkMode = false;

// Medical Products Data with IDs and Images
const products = [
    // Medical Supplies
    { 
        id: 'MS001', 
        category: 'supplies', 
        name: { en: 'Surgical Gloves (Box of 100)', ar: 'قفازات جراحية (علبة 100 قطعة)' },
        description: { en: 'Sterile latex surgical gloves for medical procedures', ar: 'قفازات جراحية معقمة من اللاتكس للإجراءات الطبية' },
        price: '$45.99',
        image: 'attached_assets/stock_images/surgical_gloves_medi_a193c302.jpg'
    },
    { 
        id: 'MS002', 
        category: 'supplies', 
        name: { en: 'Disposable Face Masks (50 Pack)', ar: 'أقنعة وجه يمكن التخلص منها (50 قطعة)' },
        description: { en: '3-layer surgical masks with ear loops', ar: 'أقنعة جراحية ثلاثية الطبقات مع حلقات الأذن' },
        price: '$29.99',
        image: 'attached_assets/stock_images/medical_face_masks_d_8d786020.jpg'
    },
    { 
        id: 'MS003', 
        category: 'supplies', 
        name: { en: 'Sterile Gauze Pads (4x4 inch)', ar: 'ضمادات شاش معقمة (4x4 بوصة)' },
        description: { en: 'Absorbent gauze pads for wound care', ar: 'ضمادات شاش ماصة لرعاية الجروح' },
        price: '$12.50',
        image: 'attached_assets/stock_images/sterile_gauze_pads_m_42bc5ca1.jpg'
    },
    { 
        id: 'MS004', 
        category: 'supplies', 
        name: { en: 'Medical Tape Roll', ar: 'لفة شريط طبي' },
        description: { en: 'Hypoallergenic adhesive medical tape', ar: 'شريط طبي لاصق مضاد للحساسية' },
        price: '$8.75',
        image: 'attached_assets/stock_images/medical_tape_roll_ad_69f7b558.jpg'
    },
    { 
        id: 'MS005', 
        category: 'supplies', 
        name: { en: 'Alcohol Prep Pads (200 Pack)', ar: 'ضمادات كحول للتحضير (200 قطعة)' },
        description: { en: '70% isopropyl alcohol prep pads', ar: 'ضمادات تحضير بكحول الأيزوبروبيل 70%' },
        price: '$18.99',
        image: 'attached_assets/stock_images/antiseptic_solution__9e8e1afc.jpg'
    },
    
    // Medical Devices
    { 
        id: 'MD001', 
        category: 'devices', 
        name: { en: 'Digital Thermometer', ar: 'مقياس حرارة رقمي' },
        description: { en: 'Fast and accurate digital thermometer', ar: 'مقياس حرارة رقمي سريع ودقيق' },
        price: '$24.99',
        image: 'attached_assets/stock_images/digital_thermometer__725677d4.jpg'
    },
    { 
        id: 'MD002', 
        category: 'devices', 
        name: { en: 'Blood Pressure Monitor', ar: 'جهاز مراقبة ضغط الدم' },
        description: { en: 'Automatic digital blood pressure monitor', ar: 'جهاز مراقبة ضغط الدم الرقمي الأوتوماتيكي' },
        price: '$89.99',
        image: 'attached_assets/stock_images/blood_pressure_monit_ee1b6683.jpg'
    },
    { 
        id: 'MD003', 
        category: 'devices', 
        name: { en: 'Pulse Oximeter', ar: 'مقياس نبض الأكسجين' },
        description: { en: 'Fingertip pulse oximeter with LED display', ar: 'مقياس نبض الأكسجين للإصبع مع شاشة LED' },
        price: '$35.50',
        image: 'attached_assets/stock_images/pulse_oximeter_medic_e4dce6a5.jpg'
    },
    { 
        id: 'MD004', 
        category: 'devices', 
        name: { en: 'Stethoscope', ar: 'سماعة طبية' },
        description: { en: 'Professional cardiology stethoscope', ar: 'سماعة طبية متخصصة في أمراض القلب' },
        price: '$125.00',
        image: 'attached_assets/stock_images/stethoscope_medical__ff8a309e.jpg'
    },
    { 
        id: 'MD005', 
        category: 'devices', 
        name: { en: 'Nebulizer Machine', ar: 'جهاز البخاخات الطبية' },
        description: { en: 'Portable nebulizer for respiratory treatment', ar: 'جهاز بخاخات محمول لعلاج الجهاز التنفسي' },
        price: '$75.99',
        image: 'attached_assets/stock_images/nebulizer_machine_re_11b8ff64.jpg'
    },
    { 
        id: 'MD006', 
        category: 'devices', 
        name: { en: 'Glucometer Kit', ar: 'جهاز قياس السكر' },
        description: { en: 'Blood glucose monitoring system with test strips', ar: 'نظام مراقبة سكر الدم مع شرائط الاختبار' },
        price: '$42.99',
        image: 'attached_assets/stock_images/pulse_oximeter_medic_e4dce6a5.jpg'
    },
    
    // Medicines
    { 
        id: 'MED001', 
        category: 'medicines', 
        name: { en: 'Antiseptic Solution (500ml)', ar: 'محلول مطهر (500 مل)' },
        description: { en: 'Povidone iodine antiseptic solution', ar: 'محلول مطهر بوفيدون اليود' },
        price: '$15.99',
        image: 'attached_assets/stock_images/antiseptic_solution__9e8e1afc.jpg'
    },
    { 
        id: 'MED002', 
        category: 'medicines', 
        name: { en: 'Hydrogen Peroxide 3%', ar: 'بيروكسيد الهيدروجين 3%' },
        description: { en: 'Topical antiseptic and wound cleanser', ar: 'مطهر موضعي ومنظف للجروح' },
        price: '$6.50',
        image: 'attached_assets/stock_images/antiseptic_solution__9e8e1afc.jpg'
    },
    { 
        id: 'MED003', 
        category: 'medicines', 
        name: { en: 'Saline Solution (1000ml)', ar: 'محلول ملحي (1000 مل)' },
        description: { en: 'Sterile normal saline for irrigation', ar: 'محلول ملحي عادي معقم للغسل' },
        price: '$12.99',
        image: 'attached_assets/stock_images/antiseptic_solution__9e8e1afc.jpg'
    },
    { 
        id: 'MED004', 
        category: 'medicines', 
        name: { en: 'Antibiotic Ointment', ar: 'مرهم مضاد حيوي' },
        description: { en: 'Triple antibiotic ointment for wound care', ar: 'مرهم مضاد حيوي ثلاثي لرعاية الجروح' },
        price: '$9.99',
        image: 'attached_assets/stock_images/antiseptic_solution__9e8e1afc.jpg'
    },
    { 
        id: 'MED005', 
        category: 'medicines', 
        name: { en: 'Pain Relief Tablets', ar: 'أقراص مسكنة للألم' },
        description: { en: 'Over-the-counter pain relief medication', ar: 'دواء مسكن للألم بدون وصفة طبية' },
        price: '$11.75',
        image: 'attached_assets/stock_images/antiseptic_solution__9e8e1afc.jpg'
    },
    { 
        id: 'MED006', 
        category: 'medicines', 
        name: { en: 'Vitamin C Supplements', ar: 'مكملات فيتامين سي' },
        description: { en: 'Immune system support supplements', ar: 'مكملات دعم جهاز المناعة' },
        price: '$19.99',
        image: 'attached_assets/stock_images/antiseptic_solution__9e8e1afc.jpg'
    }
];

// Best-selling products with discounts for homepage
const bestSellingProducts = [
    {
        ...products.find(p => p.id === 'MD002'), // Blood Pressure Monitor
        originalPrice: '$109.99',
        discount: '18%'
    },
    {
        ...products.find(p => p.id === 'MS001'), // Surgical Gloves  
        originalPrice: '$54.99',
        discount: '16%'
    },
    {
        ...products.find(p => p.id === 'MD004'), // Stethoscope
        originalPrice: '$149.99',
        discount: '17%'
    },
    {
        ...products.find(p => p.id === 'MS002'), // Face Masks
        originalPrice: '$39.99',
        discount: '25%'
    },
    {
        ...products.find(p => p.id === 'MD001'), // Digital Thermometer
        originalPrice: '$29.99',
        discount: '17%'
    },
    {
        ...products.find(p => p.id === 'MD003'), // Pulse Oximeter
        originalPrice: '$42.50',
        discount: '16%'
    }
];

// Language switching functionality
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    const html = document.documentElement;
    
    if (currentLang === 'ar') {
        html.setAttribute('lang', 'ar');
        html.setAttribute('dir', 'rtl');
    } else {
        html.setAttribute('lang', 'en');
        html.setAttribute('dir', 'ltr');
    }
    
    updateTextContent();
}

// Dark mode functionality
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    const html = document.documentElement;
    
    if (isDarkMode) {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('darkMode', 'true');
    } else {
        html.setAttribute('data-theme', 'light');
        localStorage.setItem('darkMode', 'false');
    }
    
    updateDarkModeIcon();
}

// Update dark mode icon
function updateDarkModeIcon() {
    const darkModeIcon = document.querySelector('.dark-mode-icon');
    if (darkModeIcon) {
        darkModeIcon.textContent = isDarkMode ? '☀️' : '🌙';
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
            // Use textContent for simple text elements to preserve structure
            if (element.children.length === 0) {
                element.textContent = element.getAttribute('data-ar');
            } else {
                element.innerHTML = element.getAttribute('data-ar');
            }
        } else {
            // Use textContent for simple text elements to preserve structure
            if (element.children.length === 0) {
                element.textContent = element.getAttribute('data-en');
            } else {
                element.innerHTML = element.getAttribute('data-en');
            }
        }
    });
    
    // Update form placeholders and options if on contact page
    updateFormContent();
    
    // Re-render products if on products page
    if (document.getElementById('productsContainer')) {
        displayProducts(getCurrentCategoryFilter());
    }
}

// Update form content for contact page
function updateFormContent() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageTextarea = document.getElementById('message');
    
    if (nameInput) {
        nameInput.placeholder = currentLang === 'ar' ? 'أدخل اسمك' : 'Enter your name';
    }
    if (emailInput) {
        emailInput.placeholder = currentLang === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email';
    }
    if (phoneInput) {
        phoneInput.placeholder = currentLang === 'ar' ? 'أدخل رقم هاتفك' : 'Enter your phone number';
    }
    if (messageTextarea) {
        messageTextarea.placeholder = currentLang === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...';
    }
}

// WhatsApp functionality
function openWhatsAppOrder(productId) {
    const whatsappNumber = "+1234567890"; // Replace with actual WhatsApp business number
    const message = currentLang === 'ar' 
        ? `مرحبا! أود طلب المنتج رقم: ${productId}` 
        : `Hello! I would like to order product ID: ${productId}`;
    
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Products functionality with images
function displayProducts(category = 'all') {
    const container = document.getElementById('productsContainer');
    if (!container) return;
    
    const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
    
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

// Category filter functionality
function filterProducts(category) {
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Display filtered products
    displayProducts(category);
}

// Get current category filter
function getCurrentCategoryFilter() {
    const activeBtn = document.querySelector('.category-btn.active');
    return activeBtn ? activeBtn.getAttribute('data-category') : 'all';
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

// Initialize page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dark mode from saved preference
    initializeDarkMode();
    
    // Set up category buttons event listeners
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            filterProducts(category);
        });
    });
    
    // Initialize products display
    displayProducts('all');
    
    // Initialize best sellers display on homepage
    displayBestSellers();
    
    // Set up contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Update form placeholders on page load
    updateFormContent();
});