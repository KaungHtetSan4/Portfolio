// Navbar scroll effect
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scroll-top');

// Change navbar style on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Show/hide scroll to top button
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const bars = hamburger.querySelectorAll('.bar');
    bars[0].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(-5px, 6px)' : '';
    bars[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    bars[2].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(-5px, -6px)' : '';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const bars = hamburger.querySelectorAll('.bar');
        bars[0].style.transform = '';
        bars[1].style.opacity = '1';
        bars[2].style.transform = '';
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll to top functionality
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    observer.observe(section);
});

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkills = () => {
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
};

// Trigger skill animation when skills section is visible
const skillsSection = document.getElementById('skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillsSection && skillsObserver.observe(skillsSection);

// Contact form submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (name && email && message) {
        // In a real application, you would send this data to a server
        alert(`Thank you ${name}! Your message has been received. I'll get back to you soon!`);
        
        // Reset form
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Typing effect for hero subtitle (optional enhancement)
const subtitle = document.querySelector('.hero-subtitle');
const titles = ['Full Stack Web Developer', 'Frontend Developer', 'UI/UX Enthusiast', 'Problem Solver'];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function typeEffect() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        subtitle.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        subtitle.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }
    
    if (!isDeleting && charIndex === currentTitle.length) {
        // Pause before deleting
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect after page loads
window.addEventListener('load', () => {
    setTimeout(typeEffect, 1000);
});

// Project cards hover effect
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - scrolled / 700;
    }
});

// Add cursor trail effect (optional - can be removed for simpler version)
let dots = [];
const MAX_DOTS = 50;

document.addEventListener('mousemove', (e) => {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.style.cssText = `
        position: fixed;
        width: 5px;
        height: 5px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        opacity: 0.6;
        transition: opacity 0.5s;
    `;
    
    document.body.appendChild(dot);
    dots.push(dot);
    
    if (dots.length > MAX_DOTS) {
        const oldDot = dots.shift();
        oldDot.remove();
    }
    
    setTimeout(() => {
        dot.style.opacity = '0';
        setTimeout(() => dot.remove(), 500);
    }, 100);
});

// Console message for developers
console.log('%c🚀 Welcome Developer! ', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out my GitHub!', 'color: #8b5cf6; font-size: 14px;');
console.log('%cBuilt with ❤️ using HTML, CSS, and JavaScript', 'color: #64748b; font-size: 12px;');
