/**
 * Configuration et constantes
 */
const CONFIG = {
    NAVBAR_OFFSET: 70,
    SCROLL_THRESHOLD: 100,
    ANIMATION_THRESHOLD: 0.1,
    ANIMATION_ROOT_MARGIN: '0px 0px -50px 0px'
};

/**
 * Utilitaires pour le menu mobile
 */
const MenuToggle = {
    init() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!menuToggle || !navMenu) return;
        
        menuToggle.addEventListener('click', () => this.toggle(navMenu, menuToggle));
        
        // Fermer le menu lors du clic sur un lien
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => this.close(navMenu, menuToggle));
        });
        
        // Fermer le menu lors du clic en dehors
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                this.close(navMenu, menuToggle);
            }
        });
    },
    
    toggle(navMenu, menuToggle) {
        const isActive = navMenu.classList.contains('active');
        navMenu.classList.toggle('active');
        
        // Mettre à jour les attributs ARIA
        menuToggle.setAttribute('aria-expanded', !isActive);
        menuToggle.setAttribute('aria-label', !isActive ? 'Fermer le menu' : 'Ouvrir le menu');
        
        this.animateHamburger(navMenu, menuToggle);
    },
    
    close(navMenu, menuToggle) {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
        this.resetHamburger(menuToggle);
    },
    
    animateHamburger(navMenu, menuToggle) {
        const spans = menuToggle.querySelectorAll('span');
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            this.resetHamburger(menuToggle);
        }
    },
    
    resetHamburger(menuToggle) {
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
};

/**
 * Gestion du défilement fluide
 */
const SmoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleClick(e, anchor));
        });
    },
    
    handleClick(e, anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const offsetTop = target.offsetTop - CONFIG.NAVBAR_OFFSET;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
};

/**
 * Effet de scroll sur la navbar
 */
const NavbarScroll = {
    init() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        window.addEventListener('scroll', () => this.handleScroll(navbar));
    },
    
    handleScroll(navbar) {
        const currentScroll = window.pageYOffset;
        // L'ombre est déjà définie dans le CSS, cette fonction peut être étendue
        // pour d'autres effets de scroll si nécessaire
    }
};

/**
 * Gestion du formulaire de contact
 */
const ContactForm = {
    init() {
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', (e) => this.handleSubmit(e, contactForm));
        
        // Validation en temps réel
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
        });
    },
    
    handleSubmit(e, form) {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const isValid = this.validate(form);
        
        if (isValid) {
            this.setLoading(submitButton, true);
            // Simuler l'envoi (remplacer par un vrai appel API)
            setTimeout(() => {
                this.submitForm(form, submitButton);
            }, 1500);
        } else {
            this.showError('Veuillez remplir tous les champs obligatoires.');
        }
    },
    
    validate(form) {
        // Vérifier le honeypot (anti-spam)
        const honeypot = form.querySelector('.honeypot');
        if (honeypot && honeypot.value) {
            // Si le honeypot est rempli, c'est un bot
            return false;
        }
        
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    },
    
    validateField(input) {
        const isEmpty = !input.value.trim();
        const isEmail = input.type === 'email';
        const isValidEmail = isEmail ? this.isValidEmail(input.value) : true;
        
        if (input.hasAttribute('required') && isEmpty) {
            input.style.borderColor = 'var(--color-border-error)';
            return false;
        } else if (isEmail && input.value && !isValidEmail) {
            input.style.borderColor = 'var(--color-border-error)';
            return false;
        } else {
            input.style.borderColor = 'var(--color-border)';
            return true;
        }
    },
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    setLoading(button, isLoading) {
        if (isLoading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    },
    
    submitForm(form, button) {
        // Ici, vous enverriez normalement les données à un serveur
        this.setLoading(button, false);
        this.showSuccess('Merci pour votre message ! Nous vous contacterons bientôt.');
        form.reset();
    },
    
    showSuccess(message) {
        this.showNotification(message, 'success');
    },
    
    showError(message) {
        this.showNotification(message, 'error');
    },
    
    showNotification(message, type) {
        // Créer une notification toast
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');
        
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Retirer après 5 secondes
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
};

/**
 * Gestion des FAQ
 */
const FAQ = {
    init() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            item.addEventListener('toggle', () => this.handleToggle(item, faqItems));
        });
    },
    
    handleToggle(activeItem, allItems) {
        // Optionnel : fermer les autres items quand un s'ouvre
        // Décommentez les lignes suivantes si vous voulez ce comportement
        /*
        if (activeItem.open) {
            allItems.forEach(item => {
                if (item !== activeItem && item.open) {
                    item.open = false;
                }
            });
        }
        */
    }
};

/**
 * Animations au scroll avec Intersection Observer
 */
const ScrollAnimations = {
    observer: null,
    
    init() {
        const observerOptions = {
            threshold: CONFIG.ANIMATION_THRESHOLD,
            rootMargin: CONFIG.ANIMATION_ROOT_MARGIN
        };
        
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            observerOptions
        );
        
        this.observeElements();
    },
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Ne plus observer une fois animé
                this.observer.unobserve(entry.target);
            }
        });
    },
    
    observeElements() {
        const selectors = '.service-card, .about-content, .contact-info, .testimonial-card, .portfolio-item, .blog-wrapper';
        const elements = document.querySelectorAll(selectors);
        
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(el);
        });
    }
};

/**
 * Gestion des cookies et conformité RGPD
 */
const CookieManager = {
    COOKIE_CONSENT_KEY: 'cookie_consent',
    COOKIE_PREFERENCES_KEY: 'cookie_preferences',
    
    init() {
        this.createCookieBanner();
        this.loadPreferences();
    },
    
    createCookieBanner() {
        // Vérifier si le consentement existe déjà
        if (this.hasConsent()) {
            return;
        }
        
        // Créer la bannière
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.className = 'cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-labelledby', 'cookie-banner-title');
        banner.innerHTML = `
            <div class="cookie-banner-content">
                <div class="cookie-banner-text">
                    <h3 id="cookie-banner-title">Gestion des cookies</h3>
                    <p>Nous utilisons des cookies pour améliorer votre expérience sur notre site. Certains cookies sont nécessaires au fonctionnement du site, d'autres nous aident à analyser l'utilisation du site.</p>
                    <p class="cookie-banner-links">
                        <a href="politique-confidentialite.html#cookies">En savoir plus sur les cookies</a> | 
                        <a href="politique-confidentialite.html">Politique de confidentialité</a>
                    </p>
                </div>
                <div class="cookie-banner-actions">
                    <button class="btn btn-secondary" id="cookie-preferences-btn">Personnaliser</button>
                    <button class="btn btn-primary" id="cookie-accept-all-btn">Tout accepter</button>
                    <button class="btn btn-secondary" id="cookie-reject-all-btn">Tout refuser</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(banner);
        
        // Événements
        document.getElementById('cookie-accept-all-btn').addEventListener('click', () => {
            this.acceptAll();
        });
        
        document.getElementById('cookie-reject-all-btn').addEventListener('click', () => {
            this.rejectAll();
        });
        
        document.getElementById('cookie-preferences-btn').addEventListener('click', () => {
            this.showPreferences();
        });
    },
    
    showPreferences() {
        const banner = document.getElementById('cookie-banner');
        if (!banner) return;
        
        const preferences = this.getPreferences();
        
        banner.innerHTML = `
            <div class="cookie-banner-content">
                <div class="cookie-banner-text">
                    <h3 id="cookie-banner-title">Gérer vos préférences de cookies</h3>
                    <p>Choisissez les types de cookies que vous souhaitez accepter :</p>
                </div>
                <div class="cookie-preferences">
                    <div class="cookie-preference-item">
                        <div class="cookie-preference-header">
                            <label>
                                <input type="checkbox" id="cookie-necessary" checked disabled>
                                <strong>Cookies nécessaires</strong>
                            </label>
                            <span class="cookie-preference-status">Toujours actif</span>
                        </div>
                        <p class="cookie-preference-desc">Ces cookies sont essentiels au fonctionnement du site et ne peuvent pas être désactivés.</p>
                    </div>
                    <div class="cookie-preference-item">
                        <div class="cookie-preference-header">
                            <label>
                                <input type="checkbox" id="cookie-analytics" ${preferences.analytics ? 'checked' : ''}>
                                <strong>Cookies d'analyse</strong>
                            </label>
                        </div>
                        <p class="cookie-preference-desc">Ces cookies nous aident à comprendre comment les visiteurs utilisent notre site.</p>
                    </div>
                </div>
                <div class="cookie-banner-actions">
                    <button class="btn btn-primary" id="cookie-save-preferences-btn">Enregistrer mes préférences</button>
                    <button class="btn btn-secondary" id="cookie-cancel-preferences-btn">Annuler</button>
                </div>
            </div>
        `;
        
        document.getElementById('cookie-save-preferences-btn').addEventListener('click', () => {
            const analytics = document.getElementById('cookie-analytics').checked;
            this.savePreferences({ necessary: true, analytics });
            this.hideBanner();
        });
        
        document.getElementById('cookie-cancel-preferences-btn').addEventListener('click', () => {
            this.createCookieBanner();
        });
    },
    
    acceptAll() {
        this.savePreferences({ necessary: true, analytics: true });
        this.hideBanner();
    },
    
    rejectAll() {
        this.savePreferences({ necessary: true, analytics: false });
        this.hideBanner();
    },
    
    savePreferences(preferences) {
        const consent = {
            ...preferences,
            date: new Date().toISOString()
        };
        localStorage.setItem(this.COOKIE_PREFERENCES_KEY, JSON.stringify(consent));
        localStorage.setItem(this.COOKIE_CONSENT_KEY, 'true');
        
        // Appliquer les préférences
        this.applyPreferences(preferences);
    },
    
    loadPreferences() {
        if (!this.hasConsent()) return;
        
        const stored = localStorage.getItem(this.COOKIE_PREFERENCES_KEY);
        if (stored) {
            const preferences = JSON.parse(stored);
            this.applyPreferences(preferences);
        }
    },
    
    applyPreferences(preferences) {
        // Ici vous pouvez ajouter votre code d'analyse (Google Analytics, etc.)
        // Exemple :
        // if (preferences.analytics) {
        //     // Initialiser Google Analytics
        // } else {
        //     // Désactiver Google Analytics
        // }
    },
    
    getPreferences() {
        const stored = localStorage.getItem(this.COOKIE_PREFERENCES_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        return { necessary: true, analytics: false };
    },
    
    hasConsent() {
        return localStorage.getItem(this.COOKIE_CONSENT_KEY) === 'true';
    },
    
    hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.style.opacity = '0';
            setTimeout(() => banner.remove(), 300);
        }
    },
    
    showPreferencesFromLink() {
        // Afficher la bannière de préférences même si le consentement existe déjà
        this.showPreferences();
    }
};

// Gestion du lien "Gérer les cookies" dans le footer
document.addEventListener('DOMContentLoaded', () => {
    // Ajouter un gestionnaire pour les liens de gestion des cookies
    document.addEventListener('click', (e) => {
        if (e.target.matches('[data-cookie-preferences]') || 
            e.target.closest('[data-cookie-preferences]')) {
            e.preventDefault();
            CookieManager.showPreferencesFromLink();
        }
    });
});

/**
 * Initialisation de l'application
 */
document.addEventListener('DOMContentLoaded', () => {
    MenuToggle.init();
    SmoothScroll.init();
    NavbarScroll.init();
    ContactForm.init();
    FAQ.init();
    ScrollAnimations.init();
    CookieManager.init();
});

