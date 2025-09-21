// Language state
let currentLang = 'en';

// Medical Products Data with IDs
const products = [
    // Medical Supplies
    { 
        id: 'MS001', 
        category: 'supplies', 
        name: { en: 'Surgical Gloves (Box of 100)', ar: 'قفازات جراحية (علبة 100 قطعة)' },
        description: { en: 'Sterile latex surgical gloves for medical procedures', ar: 'قفازات جراحية معقمة من اللاتكس للإجراءات الطبية' },
        price: '$45.99'
    },
    { 
        id: 'MS002', 
        category: 'supplies', 
        name: { en: 'Disposable Face Masks (50 Pack)', ar: 'أقنعة وجه يمكن التخلص منها (50 قطعة)' },
        description: { en: '3-layer surgical masks with ear loops', ar: 'أقنعة جراحية ثلاثية الطبقات مع حلقات الأذن' },
        price: '$29.99'
    },
    { 
        id: 'MS003', 
        category: 'supplies', 
        name: { en: 'Sterile Gauze Pads (4x4 inch)', ar: 'ضمادات شاش معقمة (4x4 بوصة)' },
        description: { en: 'Absorbent gauze pads for wound care', ar: 'ضمادات شاش ماصة لرعاية الجروح' },
        price: '$12.50'
    },
    { 
        id: 'MS004', 
        category: 'supplies', 
        name: { en: 'Medical Tape Roll', ar: 'لفة شريط طبي' },
        description: { en: 'Hypoallergenic adhesive medical tape', ar: 'شريط طبي لاصق مضاد للحساسية' },
        price: '$8.75'
    },
    { 
        id: 'MS005', 
        category: 'supplies', 
        name: { en: 'Alcohol Prep Pads (200 Pack)', ar: 'ضمادات كحول للتحضير (200 قطعة)' },
        description: { en: '70% isopropyl alcohol prep pads', ar: 'ضمادات تحضير بكحول الأيزوبروبيل 70%' },
        price: '$18.99'
    },
    
    // Medical Devices
    { 
        id: 'MD001', 
        category: 'devices', 
        name: { en: 'Digital Thermometer', ar: 'مقياس حرارة رقمي' },
        description: { en: 'Fast and accurate digital thermometer', ar: 'مقياس حرارة رقمي سريع ودقيق' },
        price: '$24.99'
    },
    { 
        id: 'MD002', 
        category: 'devices', 
        name: { en: 'Blood Pressure Monitor', ar: 'جهاز مراقبة ضغط الدم' },
        description: { en: 'Automatic digital blood pressure monitor', ar: 'جهاز مراقبة ضغط الدم الرقمي الأوتوماتيكي' },
        price: '$89.99'
    },
    { 
        id: 'MD003', 
        category: 'devices', 
        name: { en: 'Pulse Oximeter', ar: 'مقياس نبض الأكسجين' },
        description: { en: 'Fingertip pulse oximeter with LED display', ar: 'مقياس نبض الأكسجين للإصبع مع شاشة LED' },
        price: '$35.50'
    },
    { 
        id: 'MD004', 
        category: 'devices', 
        name: { en: 'Stethoscope', ar: 'سماعة طبية' },
        description: { en: 'Professional cardiology stethoscope', ar: 'سماعة طبية متخصصة في أمراض القلب' },
        price: '$125.00'
    },
    { 
        id: 'MD005', 
        category: 'devices', 
        name: { en: 'Nebulizer Machine', ar: 'جهاز البخاخات الطبية' },
        description: { en: 'Portable nebulizer for respiratory treatment', ar: 'جهاز بخاخات محمول لعلاج الجهاز التنفسي' },
        price: '$75.99'
    },
    { 
        id: 'MD006', 
        category: 'devices', 
        name: { en: 'Glucometer Kit', ar: 'جهاز قياس السكر' },
        description: { en: 'Blood glucose monitoring system with test strips', ar: 'نظام مراقبة سكر الدم مع شرائط الاختبار' },
        price: '$42.99'
    },
    
    // Medicines
    { 
        id: 'MED001', 
        category: 'medicines', 
        name: { en: 'Antiseptic Solution (500ml)', ar: 'محلول مطهر (500 مل)' },
        description: { en: 'Povidone iodine antiseptic solution', ar: 'محلول مطهر بوفيدون اليود' },
        price: '$15.99'
    },
    { 
        id: 'MED002', 
        category: 'medicines', 
        name: { en: 'Hydrogen Peroxide 3%', ar: 'بيروكسيد الهيدروجين 3%' },
        description: { en: 'Topical antiseptic and wound cleanser', ar: 'مطهر موضعي ومنظف للجروح' },
        price: '$6.50'
    },
    { 
        id: 'MED003', 
        category: 'medicines', 
        name: { en: 'Saline Solution (1000ml)', ar: 'محلول ملحي (1000 مل)' },
        description: { en: 'Sterile normal saline for irrigation', ar: 'محلول ملحي عادي معقم للغسل' },
        price: '$12.99'
    },
    { 
        id: 'MED004', 
        category: 'medicines', 
        name: { en: 'Antibiotic Ointment', ar: 'مرهم مضاد حيوي' },
        description: { en: 'Triple antibiotic ointment for wound care', ar: 'مرهم مضاد حيوي ثلاثي لرعاية الجروح' },
        price: '$9.99'
    },
    { 
        id: 'MED005', 
        category: 'medicines', 
        name: { en: 'Pain Relief Tablets', ar: 'أقراص مسكنة للألم' },
        description: { en: 'Over-the-counter pain relief medication', ar: 'دواء مسكن للألم بدون وصفة طبية' },
        price: '$11.75'
    },
    { 
        id: 'MED006', 
        category: 'medicines', 
        name: { en: 'Vitamin C Supplements', ar: 'مكملات فيتامين سي' },
        description: { en: 'Immune system support supplements', ar: 'مكملات دعم جهاز المناعة' },
        price: '$19.99'
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

// Products functionality
function displayProducts(category = 'all') {
    const container = document.getElementById('productsContainer');
    if (!container) return;
    
    const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
    
    container.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-id">ID: ${product.id}</div>
            <div class="product-info">
                <h3 class="product-name">${product.name[currentLang]}</h3>
                <p class="product-description">${product.description[currentLang]}</p>
                <div class="product-price">${product.price}</div>
            </div>
            <button class="product-btn" data-en="View Details" data-ar="عرض التفاصيل">
                ${currentLang === 'ar' ? 'عرض التفاصيل' : 'View Details'}
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
    
    // Set up contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Update form placeholders on page load
    updateFormContent();
});