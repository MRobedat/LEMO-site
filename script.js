document.addEventListener('DOMContentLoaded', function() {
    // Slider functionality
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    
    // Show initial slide
    showSlide(currentSlide);
    
    // Next slide
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });
    
    // Previous slide
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto slide change
    let slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
    
    // Pause on hover
    const slider = document.querySelector('.hero-slider');
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    });
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    // Cart functionality
    const cartBtn = document.querySelector('.cart-btn');
    const cartOverlay = document.getElementById('cart');
    const closeCart = document.querySelector('.close-cart');
    
    cartBtn.addEventListener('click', () => {
        cartOverlay.style.right = '0';
    });
    
    closeCart.addEventListener('click', () => {
        cartOverlay.style.right = '-100%';
    });
    
    // Quantity buttons in cart
    const minusBtns = document.querySelectorAll('.quantity-btn.minus');
    const plusBtns = document.querySelectorAll('.quantity-btn.plus');
    
    minusBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const quantityElement = btn.nextElementSibling;
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 1) {
                quantity--;
                quantityElement.textContent = quantity;
                updateCartTotal();
            }
        });
    });
    
    plusBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const quantityElement = btn.previousElementSibling;
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity;
            updateCartTotal();
        });
    });
    
    // Remove item from cart
    const removeBtns = document.querySelectorAll('.remove-item');
    
    removeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.cart-item').remove();
            updateCartTotal();
            updateCartCount();
        });
    });
    
    // Add to cart buttons
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const productCard = btn.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            const productImage = productCard.querySelector('.product-image img').src;
            
            // In a real app, you would add this to your cart data structure
            // For demo, we'll just update the cart count
            updateCartCount(1);
            
            // Show added to cart feedback
            const feedback = document.createElement('div');
            feedback.className = 'cart-feedback';
            feedback.innerHTML = `
                <div class="feedback-content">
                    <i class="fas fa-check-circle"></i>
                    <span>تمت إضافة "${productName}" إلى السلة</span>
                </div>
            `;
            document.body.appendChild(feedback);
            
            setTimeout(() => {
                feedback.classList.add('show');
            }, 10);
            
            setTimeout(() => {
                feedback.classList.remove('show');
                setTimeout(() => {
                    feedback.remove();
                }, 300);
            }, 3000);
        });
    });
    
    // Update cart total
    function updateCartTotal() {
        const items = document.querySelectorAll('.cart-item');
        let total = 0;
        
        items.forEach(item => {
            const priceText = item.querySelector('.item-price').textContent;
            const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
            const quantity = parseInt(item.querySelector('.item-quantity span').textContent);
            total += price * quantity;
        });
        
        document.querySelector('.total-price').textContent = total.toFixed(2) + ' ر.س';
    }
    
    // Update cart count
    function updateCartCount(addedItems = 0) {
        const countElement = document.querySelector('.cart-count');
        let currentCount = parseInt(countElement.textContent);
        currentCount += addedItems;
        countElement.textContent = currentCount;
    }
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const categoriesList = document.querySelector('.categories-list');
    
    menuToggle.addEventListener('click', () => {
        categoriesList.classList.toggle('show');
    });
    
    // Quick view functionality
    const quickViewBtns = document.querySelectorAll('.quick-view');
    
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const productCard = btn.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            const productImage = productCard.querySelector('.product-image img').src;
            const productDesc = "هذا وصف تفصيلي للمنتج سيتم جلبها من قاعدة البيانات في التطبيق الحقيقي.";
            
            // Create quick view modal
            const modal = document.createElement('div');
            modal.className = 'quick-view-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <button class="close-modal">&times;</button>
                    <div class="modal-image">
                        <img src="${productImage}" alt="${productName}">
                    </div>
                    <div class="modal-details">
                        <h3>${productName}</h3>
                        <div class="modal-price">${productPrice}</div>
                        <p class="modal-desc">${productDesc}</p>
                        <button class="add-to-cart">
                            <i class="fas fa-shopping-cart"></i> أضف للسلة
                        </button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Show modal
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            
            // Close modal
            const closeModal = modal.querySelector('.close-modal');
            closeModal.addEventListener('click', () => {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.remove();
                }, 300);
            });
            
            // Add to cart from modal
            const modalAddToCart = modal.querySelector('.add-to-cart');
            modalAddToCart.addEventListener('click', () => {
                updateCartCount(1);
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.remove();
                }, 300);
            });
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Here you would typically send the email to your server
        // For demo, we'll just show a success message
        emailInput.value = '';
        
        const feedback = document.createElement('div');
        feedback.className = 'newsletter-feedback';
        feedback.textContent = 'شكراً لك! تم الاشتراك بنجاح.';
        newsletterForm.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 3000);
    });
});


