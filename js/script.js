// ===== GLOBAL VARIABLES =====
let currentLanguage = 'pt';
let isScrolling = false;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// ===== INITIALIZE WEBSITE =====
function initializeWebsite() {
    // Initialize all components
    initializeNavigation();
    initializeLanguageSelector();
    initializeScrollAnimations();
    initializeCarousel();
    initializeForms();
    initializeProductFilters();
    initializeGallery();
    initializeTracking();
    initializeReviews();
    initializeScrollEffects();
    
    // Add loading animation
    document.body.classList.add('loading');
    
    // Initialize language
    setLanguage(currentLanguage);
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const header = document.querySelector('.header');
    
    // Hamburger menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== LANGUAGE SELECTOR =====
function initializeLanguageSelector() {
    const langToggle = document.getElementById('lang-toggle');
    const langDropdown = document.getElementById('lang-dropdown');
    const currentLangSpan = document.getElementById('current-lang');
    
    if (langToggle && langDropdown) {
        // Toggle dropdown
        langToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            langDropdown.classList.remove('active');
        });
        
        // Language selection
        const langButtons = langDropdown.querySelectorAll('button[data-lang]');
        langButtons.forEach(button => {
            button.addEventListener('click', function() {
                const selectedLang = this.getAttribute('data-lang');
                setLanguage(selectedLang);
                langDropdown.classList.remove('active');
                
                // Update current language display
                if (currentLangSpan) {
                    currentLangSpan.textContent = selectedLang.toUpperCase();
                }
            });
        });
    }
}

// ===== LANGUAGE SWITCHING =====
function setLanguage(lang) {
    currentLanguage = lang;
    
    // Update all elements with data attributes
    const elements = document.querySelectorAll('[data-pt][data-en]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = text;
            } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        }
    });
    
    // Update document language
    document.documentElement.lang = lang;
    
    // Store language preference
    localStorage.setItem('preferred-language', lang);
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .team-card, .product-card, .gallery-item, .review-item');
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// ===== CAROUSEL =====
function initializeCarousel() {
    const carouselTrack = document.getElementById('carousel-track');
    
    if (carouselTrack) {
        // Clone slides for infinite effect
        const slides = carouselTrack.children;
        const slideCount = slides.length;
        
        // Clone all slides and append them
        for (let i = 0; i < slideCount; i++) {
            const clone = slides[i].cloneNode(true);
            carouselTrack.appendChild(clone);
        }
        
        // Pause animation on hover
        carouselTrack.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        carouselTrack.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
}

// ===== FORMS =====
function initializeForms() {
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm(this);
        });
    }
    
    // Order form
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleOrderForm(this);
        });
    }
    
    // Review form
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleReviewForm(this);
        });
    }
    
    // Tracking form
    const trackingForm = document.getElementById('tracking-form');
    if (trackingForm) {
        trackingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleTrackingForm(this);
        });
    }
}

// ===== FORM HANDLERS =====
function handleContactForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function handleOrderForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
    submitBtn.disabled = true;
    
    // Simulate order processing
    setTimeout(() => {
        const orderCode = 'KSB' + new Date().getFullYear() + String(Math.floor(Math.random() * 1000)).padStart(3, '0');
        showNotification(`Pedido realizado com sucesso! Código de rastreio: ${orderCode}`, 'success');
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 3000);
}

function handleReviewForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    // Simulate review submission
    setTimeout(() => {
        showNotification('Avaliação enviada com sucesso! Obrigado pelo seu feedback.', 'success');
        form.reset();
        
        // Reset rating stars
        const ratingInputs = form.querySelectorAll('input[name="rating"]');
        ratingInputs.forEach(input => input.checked = false);
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function handleTrackingForm(form) {
    const formData = new FormData(form);
    const trackingCode = formData.get('tracking-code');
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Buscando...';
    submitBtn.disabled = true;
    
    // Simulate tracking lookup
    setTimeout(() => {
        if (trackingCode && trackingCode.toLowerCase().includes('ksb')) {
            showTrackingResults(trackingCode);
        } else {
            showNoResults();
        }
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// ===== PRODUCT FILTERS =====
function initializeProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card, .gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products/gallery items
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===== GALLERY =====
function initializeGallery() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    if (lightbox && lightboxImage && lightboxClose) {
        // Close lightbox
        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // ESC key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
}

function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    
    if (lightbox && lightboxImage) {
        lightboxImage.src = imageSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== TRACKING =====
function initializeTracking() {
    // This function is called when the page loads
    // The actual tracking form handling is in initializeForms()
}

function showTrackingResults(trackingCode) {
    const trackingResults = document.getElementById('tracking-results');
    const noResults = document.getElementById('no-results');
    
    if (trackingResults) {
        // Update order code in the results
        const orderCodeElement = document.getElementById('order-code');
        if (orderCodeElement) {
            orderCodeElement.textContent = trackingCode;
        }
        
        trackingResults.style.display = 'block';
        if (noResults) noResults.style.display = 'none';
        
        // Scroll to results
        trackingResults.scrollIntoView({ behavior: 'smooth' });
    }
}

function showNoResults() {
    const trackingResults = document.getElementById('tracking-results');
    const noResults = document.getElementById('no-results');
    
    if (noResults) {
        noResults.style.display = 'block';
        if (trackingResults) trackingResults.style.display = 'none';
        
        // Scroll to no results
        noResults.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== REVIEWS =====
function initializeReviews() {
    // Rating stars interaction
    const ratingInputs = document.querySelectorAll('.rating-input input');
    const ratingLabels = document.querySelectorAll('.rating-input label');
    
    ratingLabels.forEach((label, index) => {
        label.addEventListener('mouseenter', function() {
            highlightStars(index);
        });
        
        label.addEventListener('mouseleave', function() {
            resetStars();
        });
        
        label.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input) {
                input.checked = true;
                highlightStars(index);
            }
        });
    });
    
    function highlightStars(index) {
        ratingLabels.forEach((label, i) => {
            if (i >= index) {
                label.style.color = '#ffc107';
            } else {
                label.style.color = '#ddd';
            }
        });
    }
    
    function resetStars() {
        const checkedInput = document.querySelector('.rating-input input:checked');
        if (checkedInput) {
            const checkedIndex = Array.from(ratingInputs).indexOf(checkedInput);
            highlightStars(checkedIndex);
        } else {
            ratingLabels.forEach(label => {
                label.style.color = '#ddd';
            });
        }
    }
}

// ===== PRODUCT DETAIL =====
function changeMainImage(thumbnail) {
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (mainImage) {
        mainImage.src = thumbnail.src;
        
        // Update active thumbnail
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnail.classList.add('active');
    }
}

function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        const currentValue = parseInt(quantityInput.value) || 1;
        quantityInput.value = currentValue + 1;
    }
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        const currentValue = parseInt(quantityInput.value) || 1;
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    }
}

function addToCart() {
    const quantity = document.getElementById('quantity')?.value || 1;
    const productTitle = document.getElementById('product-title')?.textContent || 'Produto';
    
    showNotification(`${quantity}x ${productTitle} adicionado ao carrinho!`, 'success');
    
    // Add cart animation
    const addToCartBtn = document.querySelector('.add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            addToCartBtn.style.transform = 'scale(1)';
        }, 150);
    }
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        word-wrap: break-word;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You could send this to an error tracking service
});

// ===== ACCESSIBILITY =====
function initializeAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Keyboard navigation for custom elements
    const customButtons = document.querySelectorAll('.btn, .filter-btn, .gallery-btn');
    customButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// ===== INITIALIZE ON LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    initializeLazyLoading();
    initializeAccessibility();
    
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
        setLanguage(savedLanguage);
        const currentLangSpan = document.getElementById('current-lang');
        if (currentLangSpan) {
            currentLangSpan.textContent = savedLanguage.toUpperCase();
        }
    }
});

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}



// ==================== CARROSSEL PRINCIPAL ====================

const cards = document.querySelectorAll(".card");
const dots = document.querySelectorAll(".dot");
const memberName = document.querySelector(".member-name");
const memberRole = document.querySelector(".member-role");
const leftArrow = document.querySelector(".nav-arrow.left");
const rightArrow = document.querySelector(".nav-arrow.right");

let currentIndex = 0;
let isAnimating = false;
let autoplayInterval;

function updateCarousel(newIndex) {
    if (isAnimating) return;
    isAnimating = true;

    currentIndex = (newIndex + cards.length) % cards.length;

    cards.forEach((card, i) => {
        const offset = (i - currentIndex + cards.length) % cards.length;
        card.classList.remove("center", "left-1", "left-2", "right-1", "right-2", "hidden");

        if (offset === 0) card.classList.add("center");
        else if (offset === 1) card.classList.add("right-1");
        else if (offset === 2) card.classList.add("right-2");
        else if (offset === cards.length - 1) card.classList.add("left-1");
        else if (offset === cards.length - 2) card.classList.add("left-2");
        else card.classList.add("hidden");
    });

    dots.forEach((dot, i) => dot.classList.toggle("active", i === currentIndex));

    memberName.style.opacity = "0";
    memberRole.style.opacity = "0";

    setTimeout(() => {
        memberName.textContent = products[currentIndex].name;
        memberRole.textContent = products[currentIndex].role;
        memberName.style.opacity = "1";
        memberRole.style.opacity = "1";
    }, 300);

    setTimeout(() => {
        isAnimating = false;
    }, 800);

    resetAutoplay();
}

leftArrow.addEventListener("click", () => updateCarousel(currentIndex - 1));
rightArrow.addEventListener("click", () => updateCarousel(currentIndex + 1));
dots.forEach((dot, i) => dot.addEventListener("click", () => updateCarousel(i)));

// Autoplay
function startAutoplay() {
    autoplayInterval = setInterval(() => {
        updateCarousel(currentIndex + 1);
    }, 4000);
}

function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
}

startAutoplay();
updateCarousel(0);

// Pausar autoplay ao interagir com o carrossel
document.querySelector(".carousel-container").addEventListener("mouseenter", () => {
    clearInterval(autoplayInterval);
});

document.querySelector(".carousel-container").addEventListener("mouseleave", () => {
    startAutoplay();
});

// ==================== CARROSSEL DE PORTFÓLIO ====================
const portfolioTrack = document.querySelector(".portfolio-track");
const prevBtn = document.querySelector(".carousel-nav.prev");
const nextBtn = document.querySelector(".carousel-nav.next");

prevBtn.addEventListener("click", () => {
    portfolioTrack.scrollBy({
        left: -320,
        behavior: "smooth"
    });
});

nextBtn.addEventListener("click", () => {
    portfolioTrack.scrollBy({
        left: 320,
        behavior: "smooth"
    });
});

// ==================== SCROLL REVEAL ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, observerOptions);

// Aplicar scroll reveal aos elementos
document.querySelectorAll(".about-card").forEach(card => {
    card.classList.add("scroll-reveal");
    observer.observe(card);
});

document.querySelectorAll(".gallery-item").forEach(item => {
    item.classList.add("scroll-reveal");
    observer.observe(item);
});

// ==================== NAVBAR MOBILE ====================
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navbar-menu");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
});

// Fechar menu ao clicar em um link
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
    });
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});
