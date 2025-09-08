// ========================
// EMAILJS CONFIGURATION
// ========================

const EMAILJS_CONFIG = {
    serviceID: 'service_nooo1v5',
    templateID: 'template_g99r5xc',
    publicKey: 'YlgyKX0_nVeBbDxA4'
};

// Função para enviar agendamento
function enviarAgendamento(formData) {
    const templateParams = {
        from_name: formData.nome,
        from_email: formData.email,
        to_name: "Professor Hugo",
        materia: formData.materia,
        modalidade: formData.modalidade,
        data_atual: new Date().toLocaleDateString('pt-PT'),
        message: `
Nova solicitação de agendamento de aula:

👤 Nome: ${formData.nome}
📧 Email: ${formData.email}
📞 Telefone: ${formData.telefone || 'Não fornecido'}
📚 Matéria: ${formData.materia}
🎯 Modalidade: ${formData.modalidade}

💬 Mensagem do aluno:
${formData.mensagem || 'Sem mensagem adicional'}

O aluno gostaria de agendar uma aula.
        `.trim()
    };

    return emailjs.send(
        EMAILJS_CONFIG.serviceID, 
        EMAILJS_CONFIG.templateID, 
        templateParams
    );
}


// Função para enviar contacto
function enviarContacto(formData) {
    const templateParams = {
        from_name: formData.nome,
        from_email: formData.email,
        to_name: "Professor Hugo",
        materia: formData.materia,
        modalidade: 'Contacto Geral',
        data_atual: new Date().toLocaleDateString('pt-PT'),
        message: `
Nova mensagem de contacto:

Nome: ${formData.nome}
Email: ${formData.email}
Telefone: ${formData.telefone || 'Não fornecido'}
Matéria: ${formData.materia}

Mensagem:
${formData.mensagem}
        `.trim()
    };

    return emailjs.send(
        EMAILJS_CONFIG.serviceID, 
        EMAILJS_CONFIG.templateID, 
        templateParams
    );
}

// Main JavaScript functionality for the tutoring website

document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Modal elements
    const scheduleModal = document.getElementById('schedule-modal');
    const agendarBtns = document.querySelectorAll('#agendar-btn, #hero-cta');
    const closeModal = document.getElementById('close-modal');
    
    // Form elements
    const contactForm = document.getElementById('contact-form');
    const scheduleForm = document.getElementById('schedule-form');
    
    // Other elements
    const saberMaisBtn = document.getElementById('saber-mais');

    // Debug: Log elements to check if they exist
    console.log('Modal element:', scheduleModal);
    console.log('Agendar buttons:', agendarBtns);
    console.log('Close modal button:', closeModal);

    // Mobile Navigation Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navToggle && navMenu) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navbar && navMenu && !navbar.contains(e.target) && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Navbar scroll effects
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Update active navigation link based on scroll position
        updateActiveNavLink();
        
        // Trigger animations for elements coming into view
        animateOnScroll();
    });

    // Update active navigation link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Animate elements on scroll
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.animate-fade-up');
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.animationPlayState = 'running';
            }
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // "Saber Mais" button functionality
    if (saberMaisBtn) {
        saberMaisBtn.addEventListener('click', function() {
            const servicesSection = document.getElementById('servicos');
            if (servicesSection) {
                const offsetTop = servicesSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Modal functionality - Fixed implementation
    function initializeModal() {
        console.log('Initializing modal functionality');
        
        // Get all agendar buttons including the one in navbar
        const allAgendarBtns = [
            document.getElementById('agendar-btn'),
            document.getElementById('hero-cta'),
            document.querySelector('.cta-btn')
        ].filter(Boolean);

        console.log('Found agendar buttons:', allAgendarBtns);

        allAgendarBtns.forEach(btn => {
            if (btn) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('Agendar button clicked');
                    openModal();
                });
            }
        });

        if (closeModal) {
            closeModal.addEventListener('click', function(e) {
                e.preventDefault();
                closeModalHandler();
            });
        }

        // Close modal when clicking outside
        if (scheduleModal) {
            scheduleModal.addEventListener('click', function(e) {
                if (e.target === scheduleModal) {
                    closeModalHandler();
                }
            });
        }

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && scheduleModal && !scheduleModal.classList.contains('hidden')) {
                closeModalHandler();
            }
        });
    }

    function openModal() {
        console.log('Opening modal');
        if (scheduleModal) {
            scheduleModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Focus on first input
            const firstInput = scheduleModal.querySelector('input');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        } else {
            console.error('Schedule modal not found');
        }
    }

    function closeModalHandler() {
        console.log('Closing modal');
        if (scheduleModal) {
            scheduleModal.classList.add('hidden');
            document.body.style.overflow = '';
            
            // Reset form
            if (scheduleForm) {
                scheduleForm.reset();
            }
        }
    }

    // Initialize modal after DOM is ready
    initializeModal();

    // Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'Mensagem enviada com sucesso! Entrarei em contacto brevemente.');
        });
    }

    // Schedule Form Submission
if (scheduleForm) {
    scheduleForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            nome: document.getElementById('modal-nome').value.trim(),
            email: document.getElementById('modal-email').value.trim(),
            telefone: document.getElementById('modal-telefone').value.trim(), // NOVO
            materia: document.getElementById('modal-materia').value,
            modalidade: document.getElementById('modal-modalidade').value,
            mensagem: document.getElementById('modal-mensagem').value.trim() // NOVO
        };
        
        // Validação
        if (!validateForm(this)) {
            return;
        }
        
        handleEmailSubmission(this, formData, 'agendamento');
    });
}

    // Generic form submission handler
    function handleFormSubmission(form, successMessage) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Validate form
        if (!validateForm(form)) {
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showNotification(successMessage, 'success');
            
            // Reset form
            form.reset();
        }, 2000);
    }

    // Form validation
    function validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            removeFieldError(field);
            
            if (!field.value.trim()) {
                showFieldError(field, 'Este campo é obrigatório');
                isValid = false;
            } else if (field.type === 'email' && !isValidEmail(field.value)) {
                showFieldError(field, 'Por favor, insira um email válido');
                isValid = false;
            }
        });
        
        return isValid;
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show field error
    function showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = 'var(--color-error)';
        errorElement.style.fontSize = 'var(--font-size-sm)';
        errorElement.style.marginTop = 'var(--space-4)';
        
        field.parentNode.appendChild(errorElement);
    }

    // Remove field error
    function removeFieldError(field) {
        field.classList.remove('error');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    // Clear field errors on input
    document.addEventListener('input', function(e) {
        if (e.target.classList.contains('form-control')) {
            removeFieldError(e.target);
        }
    });

    // Fix for dropdown functionality - ensure proper styling
    document.addEventListener('click', function(e) {
        const selectElements = document.querySelectorAll('select.form-control');
        selectElements.forEach(select => {
            // Force focus on select elements when clicked
            if (e.target === select) {
                select.focus();
                // Trigger change event to ensure proper styling
                select.dispatchEvent(new Event('focus'));
            }
        });
    });

    // Enhance select elements
    const selectElements = document.querySelectorAll('select.form-control');
    selectElements.forEach(select => {
        // Add focus and blur events for better UX
        select.addEventListener('focus', function() {
            this.style.borderColor = 'var(--color-primary)';
        });
        
        select.addEventListener('blur', function() {
            this.style.borderColor = 'var(--color-border)';
        });
        
        select.addEventListener('change', function() {
            // Remove any existing errors when user makes a selection
            removeFieldError(this);
        });
    });

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        // Notification styles
        const colorVar = type === 'success' ? 'success' : type === 'error' ? 'error' : 'info';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--color-surface);
            color: var(--color-text);
            padding: var(--space-16) var(--space-20);
            border-radius: var(--radius-base);
            box-shadow: var(--shadow-lg);
            border-left: 4px solid var(--color-${colorVar});
            z-index: 3000;
            max-width: 400px;
            animation: slideIn 0.3s ease-out;
            font-weight: var(--font-weight-medium);
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'fadeOut 0.3s ease-out forwards';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
        
        // Remove on click
        notification.addEventListener('click', function() {
            this.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                if (this.parentNode) {
                    this.remove();
                }
            }, 300);
        });
    }

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('service-card--featured')) {
                this.style.transform = 'translateY(-8px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('service-card--featured')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // Testimonial card animations
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Contact info item hover effects
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });

    // Initialize animations on page load
    setTimeout(() => {
        animateOnScroll();
    }, 100);

    // Performance optimization: Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            updateActiveNavLink();
            animateOnScroll();
        }, 10);
    }, { passive: true });

    // Add CSS for animations that aren't in the main stylesheet
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: scale(1);
            }
            to {
                opacity: 0;
                transform: scale(0.95);
            }
        }
        
        .form-control.error {
            border-color: var(--color-error) !important;
            box-shadow: 0 0 0 3px rgba(var(--color-error-rgb), 0.1) !important;
        }
        
        .notification {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .notification:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }

        /* Ensure select elements work properly */
        select.form-control {
            cursor: pointer;
            background-color: var(--color-surface);
        }

        select.form-control:focus {
            outline: none;
        }

        select.form-control option {
            background-color: var(--color-surface);
            color: var(--color-text);
            padding: var(--space-8);
        }
    `;
    document.head.appendChild(style);

    // Add structured data for SEO (JSON-LD)
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "Professor João Explicações",
        "description": "Explicações personalizadas de Matemática, Física, Química e Inglês com metodologia comprovada e 10+ anos de experiência",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Lisboa",
            "addressCountry": "Portugal"
        },
        "telephone": "+351 912 345 678",
        "email": "joao.explicacoes@email.pt",
        "offers": [
            {
                "@type": "Offer",
                "name": "Explicações de Matemática",
                "price": "15",
                "priceCurrency": "EUR"
            },
            {
                "@type": "Offer", 
                "name": "Explicações de Física e Química",
                "price": "18",
                "priceCurrency": "EUR"
            },
            {
                "@type": "Offer",
                "name": "Explicações de Inglês", 
                "price": "12",
                "priceCurrency": "EUR"
            },
            {
                "@type": "Offer",
                "name": "Preparação para Exames",
                "price": "20", 
                "priceCurrency": "EUR"
            }
        ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    console.log('Professor João Explicações - Website inicializado com sucesso! 🎓');
});