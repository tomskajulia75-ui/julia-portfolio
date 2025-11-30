// ==================== MENU HAMBURGER ==================== 
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Zamykaj menu przy kliknięciu na link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ==================== OBSŁUGA FORMULARZA KONTAKTOWEGO ==================== 
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Zbierz dane z formularza
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Walidacja
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Proszę wypełnić wszystkie pola!');
            return;
        }
        
        // Tutaj możesz dodać obsługę wysyłania danych
        console.log('Wiadomość:', { name, email, message });
        alert('Dziękuję za wiadomość! Wkrótce się skontaktuję.');
        
        // Wyczyść formularz
        contactForm.reset();
    });
}

// ==================== EFEKTY SCROLLOWANIA ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Obserwuj karty projektów
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Obserwuj karty umiejętności
document.querySelectorAll('.skill-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ==================== ACTIVE NAV LINK ==================== 
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== SCROLL TO TOP ==================== 
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar && window.pageYOffset > 100) {
        navbar.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.15)';
    }
});

// ==================== ANIMACJA LICZNIKÓW ==================== 
const animateCounters = () => {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        
        const increment = target / 30;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target + '+';
            }
        };
        
        // Uruchom animację przy scrollowaniu do sekcji
        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                counterObserver.unobserve(stat);
            }
        }, { threshold: 0.5 });
        
        counterObserver.observe(stat);
    });
};

animateCounters();

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Konsola powitalna
console.log('%cWitaj! 👋', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cZainteresowany kodem tej strony?', 'font-size: 14px; color: #64748b;');
console.log('%cOtworz DevTools i przeglądaj kod! 🔍', 'font-size: 12px; color: #94a3b8;');

// ==================== THEME TOGGLE (dark / light) ====================
const themeToggle = document.getElementById('theme-toggle');
const preferredTheme = localStorage.getItem('theme');

const applyTheme = (theme) => {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.documentElement.classList.remove('dark');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
};

// Initialize theme from localStorage or system preference
if (preferredTheme) {
    applyTheme(preferredTheme);
} else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        const newTheme = isDark ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
}
}