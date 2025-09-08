// ========================
// EMAILJS CONFIGURATION
// ========================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando website Catálise Estudos...');
    
    // Inicializar EmailJS
    emailjs.init("YlgyKX0_nVeBbDxA4");
    console.log('✅ EmailJS inicializado com sucesso');

    // ========================
    // FUNÇÕES DE EMAIL
    // ========================

    function enviarAgendamento(formData) {
        console.log('📧 Enviando agendamento...', formData);
        
        const templateParams = {
            from_name: formData.nome,
            from_email: formData.email,
            to_name: 'Professor Hugo',
            materia: formData.materia,
            modalidade: formData.modalidade,
            message: `
🎓 NOVA SOLICITAÇÃO DE AGENDAMENTO

👤 Nome: ${formData.nome}
📧 Email: ${formData.email}
📞 Telefone: ${formData.telefone || 'Não fornecido'}
📚 Matéria: ${formData.materia}
🎯 Modalidade: ${formData.modalidade}

💬 Mensagem do aluno:
${formData.mensagem || 'Sem mensagem adicional'}

---
Enviado através do website Catálise Estudos
Data: ${new Date().toLocaleDateString('pt-PT')} às ${new Date().toLocaleTimeString('pt-PT')}
            `.trim()
        };

        return emailjs.send('service_nooo1v5', 'template_g99r5xc', templateParams);
    }

    function enviarContacto(formData) {
        console.log('📧 Enviando contacto...', formData);
        
        const templateParams = {
            from_name: formData.nome,
            from_email: formData.email,
            to_name: 'Professor Hugo',
            materia: formData.materia,
            modalidade: 'Contacto Geral',
            message: `
📞 NOVA MENSAGEM DE CONTACTO

👤 Nome: ${formData.nome}
📧 Email: ${formData.email}
📞 Telefone: ${formData.telefone || 'Não fornecido'}
📚 Matéria de Interesse: ${formData.materia}

💬 Mensagem:
${formData.mensagem}

---
Enviado através do website Catálise Estudos
Data: ${new Date().toLocaleDateString('pt-PT')} às ${new Date().toLocaleTimeString('pt-PT')}
            `.trim()
        };

        return emailjs.send('service_nooo1v5', 'template_g99r5xc', templateParams);
    }

    // ========================
    // ELEMENTOS DOM
    // ========================

    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const scheduleModal = document.getElementById('schedule-modal');
    const agendarBtns = document.querySelectorAll('#agendar-btn, #hero-cta');
    const closeModal = document.getElementById('close-modal');
    
    const contactForm = document.getElementById('contact-form');
    const scheduleForm = document.getElementById('schedule-form');
    const saberMaisBtn = document.getElementById('saber-mais');

    console.log('📋 Elementos encontrados:', {
        navbar: !!navbar,
        navToggle: !!navToggle,
        navMenu: !!navMenu,
        scheduleModal: !!scheduleModal,
        agendarBtns: agendarBtns.length,
        closeModal: !!closeModal,
        contactForm: !!contactForm,
        scheduleForm: !!scheduleForm
    });

    // ========================
    // NAVEGAÇÃO
    // ========================

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
    });

    // Smooth scrolling
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

    // Saber Mais button
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

    // ========================
    // MODAL FUNCTIONALITY
    // ========================

    function openModal() {
        console.log('📱 Abrindo modal...');
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
        console.log('📱 Fechando modal...');
        if (scheduleModal) {
            scheduleModal.classList.add('hidden');
            document.body.style.overflow = '';
            
            if (scheduleForm) {
                scheduleForm.reset();
            }
        }
    }

    // Modal event listeners
    agendarBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('🎯 Botão agendar clicado');
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

    if (scheduleModal) {
        scheduleModal.addEventListener('click', function(e) {
            if (e.target === scheduleModal) {
                closeModalHandler();
            }
        });
    }

    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && scheduleModal && !scheduleModal.classList.contains('hidden')) {
            closeModalHandler();
        }
    });

    // ========================
    // FORM SUBMISSIONS
    // ========================

    // Schedule Form (Modal)
    if (scheduleForm) {
        scheduleForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('📝 Formulário de agendamento submetido');
            
            const formData = {
                nome: document.getElementById('modal-nome')?.value.trim() || '',
                email: document.getElementById('modal-email')?.value.trim() || '',
                telefone: document.getElementById('modal-telefone')?.value.trim() || '',
                materia: document.getElementById('modal-materia')?.value || '',
                modalidade: document.getElementById('modal-modalidade')?.value || '',
                mensagem: document.getElementById('modal-mensagem')?.value.trim() || ''
            };
            
            console.log('📋 Dados coletados:', formData);
            
            // Validação
            if (!formData.nome) {
                alert('❌ Por favor, preencha o seu nome.');
                document.getElementById('modal-nome')?.focus();
                return;
            }
            
            if (!formData.email) {
                alert('❌ Por favor, preencha o seu email.');
                document.getElementById('modal-email')?.focus();
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('❌ Por favor, introduza um email válido.');
                document.getElementById('modal-email')?.focus();
                return;
            }
            
            if (!formData.materia) {
                alert('❌ Por favor, selecione uma matéria.');
                document.getElementById('modal-materia')?.focus();
                return;
            }
            
            if (!formData.modalidade) {
                alert('❌ Por favor, selecione uma modalidade.');
                document.getElementById('modal-modalidade')?.focus();
                return;
            }
            
            // Loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Send email
            enviarAgendamento(formData)
                .then(function(response) {
                    console.log('✅ Agendamento enviado com sucesso:', response);
                    alert('✅ Pedido de agendamento enviado com sucesso!\n\nO Professor Hugo entrará em contacto brevemente através do email ou telefone fornecido.');
                    
                    scheduleForm.reset();
                    closeModalHandler();
                })
                .catch(function(error) {
                    console.error('❌ Erro ao enviar agendamento:', error);
                    alert('❌ Ocorreu um erro ao enviar o pedido.\n\nPor favor, contacte diretamente:\n📞 +351 933 237 805\n📧 hugodcnt@hotmail.pt');
                })
                .finally(function() {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;
                });
        });
    }

    // Contact Form
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('📝 Formulário de contacto submetido');
            
            const formData = {
                nome: document.getElementById('nome')?.value.trim() || '',
                email: document.getElementById('email')?.value.trim() || '',
                telefone: document.getElementById('telefone')?.value.trim() || '',
                materia: document.getElementById('materia')?.value || '',
                mensagem: document.getElementById('mensagem')?.value.trim() || ''
            };
            
            console.log('📋 Dados de contacto coletados:', formData);
            
            // Validação
            if (!formData.nome) {
                alert('❌ Por favor, preencha o seu nome.');
                document.getElementById('nome')?.focus();
                return;
            }
            
            if (!formData.email) {
                alert('❌ Por favor, preencha o seu email.');
                document.getElementById('email')?.focus();
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('❌ Por favor, introduza um email válido.');
                document.getElementById('email')?.focus();
                return;
            }
            
            if (!formData.materia) {
                alert('❌ Por favor, selecione uma matéria.');
                document.getElementById('materia')?.focus();
                return;
            }
            
            if (!formData.mensagem) {
                alert('❌ Por favor, escreva uma mensagem.');
                document.getElementById('mensagem')?.focus();
                return;
            }
            
            // Loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Send email
            enviarContacto(formData)
                .then(function(response) {
                    console.log('✅ Contacto enviado com sucesso:', response);
                    alert('✅ Mensagem enviada com sucesso!\n\nO Professor Hugo entrará em contacto brevemente.');
                    
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.error('❌ Erro ao enviar contacto:', error);
                    alert('❌ Ocorreu um erro ao enviar a mensagem.\n\nPor favor, contacte diretamente:\n📞 +351 933 237 805\n📧 hugodcnt@hotmail.pt');
                })
                .finally(function() {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;
                });
        });
    }

    // ========================
    // FINALIZAÇÃO
    // ========================

    console.log('✅ Website Catálise Estudos inicializado com sucesso!');
    console.log('📧 EmailJS funcionando - Formulários prontos para uso');
});
