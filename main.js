document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for nav links
    const navLinks = document.querySelectorAll('.nav-links a, .hero-btns a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Form submission handling (prevent default and show message)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            // Get form values
            const name = document.getElementById('name').value;
            const message = document.getElementById('message').value;
            
            // Constructing a professional mailto link
            const subject = `New Project Inquiry from ${name}`;
            const body = `Hello Harsh,%0D%0A%0D%0AMy name is ${name} and I'm reaching out from LocalWeb Forge.%0D%0A%0D%0AProject Details:%0D%0A${message}%0D%0A%0D%0ABest regards,%0D%0A${name}`;
            
            const mailtoLink = `mailto:cbook678harsh@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
            
            btn.innerText = 'Opening Gmail...';
            btn.disabled = true;

            // Trigger the client's mail app
            window.location.href = mailtoLink;

            // Show success and reset form
            setTimeout(() => {
                btn.innerText = 'Form Ready!';
                btn.style.background = '#22c55e'; // Success Green
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.style.background = ''; // Reverts to CSS gradient
                }, 3000);
            }, 1000);
        });
    }

    // Theme Switch Logic
    const toggleSwitch = document.querySelector('#checkbox');
    const toggleSwitchMobile = document.querySelector('#checkbox-mobile');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'light') {
            if (toggleSwitch) toggleSwitch.checked = true;
            if (toggleSwitchMobile) toggleSwitchMobile.checked = true;
        }
    }

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            // Sync other toggle
            if (e.target === toggleSwitch && toggleSwitchMobile) toggleSwitchMobile.checked = true;
            if (e.target === toggleSwitchMobile && toggleSwitch) toggleSwitch.checked = true;
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            // Sync other toggle
            if (e.target === toggleSwitch && toggleSwitchMobile) toggleSwitchMobile.checked = false;
            if (e.target === toggleSwitchMobile && toggleSwitch) toggleSwitch.checked = false;
        }    
    }

    if (toggleSwitch) toggleSwitch.addEventListener('change', switchTheme, false);
    if (toggleSwitchMobile) toggleSwitchMobile.addEventListener('change', switchTheme, false);

    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileOverlayLinks = document.querySelectorAll('.mobile-links a');

    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close mobile menu when a link is clicked
        mobileOverlayLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.service-card, .benefit-card, .roadmap-node, .contact-card, .section-header, .pricing-card, .three-d-card');
    
    const reveal = () => {
        const triggerBottom = window.innerHeight * 0.85;
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial styles for reveal
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', reveal);
    reveal(); // Call once on load

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Dynamic Clock in Footer
    function updateClock() {
        const clockElement = document.getElementById('clock');
        if (!clockElement) return;

        const now = new Date();
        const options = { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit', 
            hour12: true 
        };
        clockElement.textContent = now.toLocaleTimeString('en-US', options);
    }

    setInterval(updateClock, 1000);
    updateClock(); // Initial call

    // Hosting Duration Slider Logic
    const durationSlider = document.getElementById('hosting-duration-slider');
    const durationText = document.getElementById('current-duration-text');
    const hostingConsultBtn = document.getElementById('hosting-consult-btn');
    
    const durations = ["1 Month", "12 Months", "24 Months", "48 Months"];
    
    function updateHostingDuration() {
        if (!durationSlider || !durationText) return;
        
        const index = durationSlider.value;
        const duration = durations[index];
        durationText.textContent = duration;
        
        // Update WhatsApp Link for the main consultation button
        if (hostingConsultBtn) {
            const message = `Hello Harsh, I'm interested in the Hostinger Hosting partnership for a duration of ${duration}. Could you help me set this up?`;
            hostingConsultBtn.href = `https://wa.me/919142385537?text=${encodeURIComponent(message)}`;
        }
    }
    
    if (durationSlider) {
        durationSlider.addEventListener('input', updateHostingDuration);
        updateHostingDuration(); // Initial call to set starting message
    }

    // Bird Jumping Logic (Across Branches)
    const birdContainer = document.querySelector('.bird-branch-container');
    const birdPupils = document.querySelectorAll('.pupil');
    const birdHead = document.querySelector('.bird-group');
    
    if (birdContainer) {
        let lastScrollTop = 0;
        let birdZone = -1;
        const zones = [500, 1500, 2500, 3500]; // Scroll heights where branches appear

        window.addEventListener('scroll', () => {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            let currentZone = -1;
            
            // Determine which zone we are in
            zones.forEach((z, i) => {
                if (st > z && st < z + 600) currentZone = i;
            });

            if (currentZone !== birdZone) {
                const oldZone = birdZone;
                birdZone = currentZone;
                
                if (birdZone === -1) {
                    birdContainer.classList.remove('visible', 'flying');
                } else {
                    birdContainer.classList.add('visible');
                    
                    if (oldZone !== -1) {
                        // Dramatic fly across if switching branches
                        birdContainer.classList.add('flying');
                        
                        // Switch sides
                        if (birdZone % 2 === 0) {
                            birdContainer.classList.remove('on-right');
                        } else {
                            birdContainer.classList.add('on-right');
                        }
                        
                        // Landing after flight
                        setTimeout(() => {
                            birdContainer.classList.remove('flying');
                        }, 1200); // Matches CSS transition duration
                    } else {
                        // Quick appear for first branch
                        if (birdZone % 2 === 0) {
                            birdContainer.classList.remove('on-right');
                        } else {
                            birdContainer.classList.add('on-right');
                        }
                    }
                }
            }
            lastScrollTop = st <= 0 ? 0 : st;
        });

        // Eye Tracking (Works globally)
        document.addEventListener('mousemove', (e) => {
            if (!birdHead) return;
            
            const birdRect = birdHead.getBoundingClientRect();
            const birdCenterX = birdRect.left + birdRect.width / 2;
            const birdCenterY = birdRect.top + birdRect.height / 2;
            
            const dx = e.clientX - birdCenterX;
            const dy = e.clientY - birdCenterY;
            const angle = Math.atan2(dy, dx);
            const distance = Math.min(3, Math.hypot(dx, dy) / 50);
            
            // Adjust for flipped SVG if on right
            const isFlipped = birdContainer.classList.contains('on-right');
            const moveX = Math.cos(angle) * distance * (isFlipped ? -1 : 1);
            const moveY = Math.sin(angle) * distance;
            
            birdPupils.forEach(pupil => {
                pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });

            const tiltX = Math.cos(angle) * 2;
            birdHead.style.transform = `translateY(${Math.sin(Date.now() / 1000) * 5}px) rotate(${tiltX * 0.5}deg)`;
        });
    }
});
