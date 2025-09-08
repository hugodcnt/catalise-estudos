// ========================
// EMAILJS CONFIGURATION
// ========================

const EMAILJS_CONFIG = {
    serviceID: 'service_nooo1v5',
    templateID: 'template_g99r5xc',
    publicKey: 'YlgyKX0_nVeBbDxA4'
};

// Inicializar EmailJS
(function() {
    emailjs.init(EMAILJS_CONFIG.publicKey);
})();

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

👤 Nome: ${formData.nome}
📧 Email: ${formData.email}
📞 Telefone: ${formData.telefone || 'Não fornecido'}
📚 Matéria: ${formData.materia}

💬 Mensagem:
${formData.mensagem}
        `.trim()
    };

    return emailjs.send(
        EMAILJS_CONFIG.serviceID, 
        EMAILJS_CONFIG.templateID, 
        templateParams
    );
}

// ========================
// MAIN WEBSITE FUNCTIONALITY
// ========================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Website carregado - EmailJS inicializado');
    
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

    // Debug
    console.log('📧 EmailJS Config:', EMAILJS_CONFIG);

    // Mobile Navigation Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
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

    // Navbar scroll effects
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        updateActiveNavLink();
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
                const offsetTop = targetSection.offsetTop - 80;
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

    // Modal functionality
    function openModal() {
        if (scheduleModal) {
            scheduleModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            const firstInput = scheduleModal.querySelector('input');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        }
    }

    function closeModalHandler() {
        if (scheduleModal) {
            scheduleModal.classList.add('hidden');
            document.body.style.overflow = '';
            
            if (scheduleForm) {
                scheduleForm.reset();
            }
        }
    }

    // Agendar buttons
    agendarBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                openModal();
            });
        }
    });

    // Close modal
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

    // ========================
    // FORM SUBMISSIONS - CORRIGIDO
    // ========================

    // Schedule Form Submission
    if (scheduleForm) {
        scheduleForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('📝 Formulário de agendamento submetido');
            
            const formData = {
                nome: document.getElementById('modal-nome').value.trim(),
                email: document.getElementById('modal-email').value.trim(),
                telefone: document.getElementById('modal-telefone').value.trim(),
                materia: document.getElementById('modal-materia').value,
                modalidade: document.getElementById('modal-modalidade').value,
                mensagem: document.getElementById('modal-mensagem').value.trim()
            };
            
            console.log('📋 Dados do formulário:', formData);
            
            // Validação básica
            if (!formData.nome || !formData.email || !formData.materia || !formData.modalidade) {
                alert('❌ Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('❌ Por favor, introduza um email válido.');
                return;
            }
            
            // Loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            console.log('📧 Enviando email...');
            
            // Send email
            enviarAgendamento(formData)
                .then(function(response) {
                    console.log('✅ Email enviado com sucesso:', response);
                    alert('✅ Agendamento solicitado com sucesso!\n\nO Professor Hugo entrará em contacto brevemente.');
                    
                    scheduleForm.reset();
                    closeModalHandler();
                })
                .catch(function(error) {
                    console.error('❌ Erro ao enviar email:', error);
                    alert('❌ Erro ao enviar solicitação.\n\nTente contactar diretamente:\n📞 +351 933 237 805\n📧 hugodcnt@hotmail.pt');
                })
                .finally(function() {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;
                });
        });
    }
    
    // Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('📝 Formulário de contacto submetido');
            
            const formData = {
                nome: document.getElementById('nome').value.trim(),
                email: document.getElementById('email').value.trim(),
                telefone: document.getElementById('telefone').value.trim(),
                materia: document.getElementById('materia').value,
                mensagem: document.getElementById('mensagem').value.trim()
            };
            
            console.log('📋 Dados do contacto:', formData);
            
            // Validação
            if (!formData.nome || !formData.email || !formData.materia || !formData.mensagem) {
                alert('❌ Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('❌ Por favor, introduza um email válido.');
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            console.log('📧 Enviando contacto...');
            
            enviarContacto(formData)
                .then(function(response) {
                    console.log('✅ Contacto enviado com sucesso:', response);
                    alert('✅ Mensagem enviada com sucesso!\n\nO Professor Hugo entrará em contacto brevemente.');
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.error('❌ Erro ao enviar contacto:', error);
                    alert('❌ Erro ao enviar mensagem.\n\nTente contactar diretamente:\n📞 +351 933 237 805\n📧 hugodcnt@hotmail.pt');
                })
                .finally(function() {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;
                });
        });
    }

    // Initialize animations
    setTimeout(() => {
        animateOnScroll();
    }, 100);

    console.log('✅ Professor Hugo - Catálise Estudos inicializado com sucesso!');
});
