// Intro Splash — shows only once per session
(function () {
    document.addEventListener('DOMContentLoaded', function () {

        var path = document.getElementById('welcome-path');
        var splash = document.getElementById('splash');
        var nameWrap = document.querySelector('.name-wrap');
        var corners = document.querySelectorAll('.corner');
        var progressFill = document.querySelector('.progress-fill');
        var track = document.querySelector('.progress-track');

        if (!path || !splash) return;

        // Check if splash was already shown this session
        if (sessionStorage.getItem('splashShown')) {
            // Hide everything immediately — no animation
            splash.style.display = 'none';
            document.body.style.overflow = '';
            corners.forEach(function (c) { c.style.display = 'none'; });
            if (track) track.style.display = 'none';
            return;
        }

        // Mark splash as shown for this session
        sessionStorage.setItem('splashShown', 'true');

        // Show corner brackets
        setTimeout(function () {
            corners.forEach(function (c) { c.classList.add('visible'); });
        }, 200);

        // Start progress bar
        path.style.visibility = 'visible';
        setTimeout(function () {
            if (progressFill) progressFill.style.width = '100%';
        }, 200);

        // Get path length and animate
        var len = path.getTotalLength();
        path.style.visibility = 'visible';
        path.style.strokeDasharray  = len;
        path.style.strokeDashoffset = len;
        path.style.transition = 'none';
        path.getBoundingClientRect();

        setTimeout(function () {
            path.style.transition = 'stroke-dashoffset 3s ease-in-out';
            path.style.strokeDashoffset = '0';
        }, 100);

        // Show name
        setTimeout(function () {
            if (nameWrap) nameWrap.classList.add('visible');
        }, 3400);

        // Slide up and hide
        setTimeout(function () {
            splash.classList.add('exit');
            setTimeout(function () {
                splash.style.display = 'none';
                document.body.style.overflow = '';
                corners.forEach(function (c) { c.style.display = 'none'; });
                if (track) track.style.display = 'none';
            }, 850);
        }, 4400);

    });
})();
(function ($) {
    // About Terminal Typing Animation
(function () {
    var lines = [
        { text: "const rafay = {",           cls: "tc-white" },
        { text: "  name: ",   end: "'Abdul Rafay',",          sc: "tc-blue",  ec: "tc-green" },
        { text: "  role: ",   end: "'Full-Stack Developer',",  sc: "tc-blue",  ec: "tc-green" },
        { text: "  skills: [",                cls: "tc-white" },
        { text: "    'React.js', 'Node.js',", cls: "tc-green" },
        { text: "    'Python', 'Firebase',",  cls: "tc-green" },
        { text: "    'MongoDB', 'TypeScript'",cls: "tc-green" },
        { text: "  ],",                       cls: "tc-white" },
        { text: "  passion: ", end: "'Building cool things'", sc: "tc-blue", ec: "tc-green" },
        { text: "};",                         cls: "tc-white" },
        { text: "" },
        { text: "rafay.", end: "hire();",     sc: "tc-pink",  ec: "tc-yellow" },
        { text: "" },
        { text: "// ✓ Available for work!",   cls: "tc-muted" }
    ];

    var tbody = document.getElementById('tbody');
    if (!tbody) return;

    var lineIdx = 0, charIdx = 0, currentDiv = null;

    function typeNext() {
        if (lineIdx >= lines.length) {
            var cur = document.createElement('span');
            cur.className = 't-cursor';
            tbody.appendChild(cur);
            return;
        }

        var line = lines[lineIdx];

        if (!currentDiv) {
            currentDiv = document.createElement('div');
            currentDiv.className = 't-line';
            tbody.appendChild(currentDiv);
            charIdx = 0;
        }

        var fullText = line.text + (line.end || '');
        var splitAt  = line.text.length;

        if (charIdx < fullText.length) {
            var ch = fullText[charIdx];
            if (charIdx < splitAt) {
                var s1 = currentDiv.querySelector('.s1');
                if (!s1) {
                    s1 = document.createElement('span');
                    s1.className = 's1 ' + (line.cls || line.sc || '');
                    currentDiv.appendChild(s1);
                }
                s1.textContent += ch;
            } else {
                var s2 = currentDiv.querySelector('.s2');
                if (!s2) {
                    s2 = document.createElement('span');
                    s2.className = 's2 ' + (line.ec || '');
                    currentDiv.appendChild(s2);
                }
                s2.textContent += ch;
            }
            charIdx++;
            setTimeout(typeNext, fullText.length === 0 ? 0 : 38);
        } else {
            lineIdx++;
            currentDiv = null;
            setTimeout(typeNext, fullText.length === 0 ? 20 : 90);
        }
    }

    setTimeout(typeNext, 800);
})();
    "use strict";

    // loader
    var loader = function () {
        setTimeout(function () {
            if ($('#loader').length > 0) {
                $('#loader').removeClass('show');
            }
        }, 1);
    };
    loader();


    // Initiate the wowjs
    new WOW().init();


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 200, 'easeInOutExpo');
        return false;
    });


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');

            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Typed Initiate
    if ($('.hero .hero-text h2').length == 1) {
        var typed_strings = $('.hero .hero-text .typed-text').text();
        var typed = new Typed('.hero .hero-text h2', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Skills
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, { offset: '80%' });


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        center: true,
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0: {
                items: 1
            }
        }
    });

    // Certificates carousel — 1-up card shuffle
    var $certCarousel = $(".certificates-carousel");

    function updateCertCounter(e) {
        if (!e) return;
        var total = (e.item && e.item.count) ? e.item.count : $(".certificates-carousel .cert-slide").length;
        var current = 1;
        if (e.relatedTarget && typeof e.relatedTarget.relative === "function") {
            current = e.relatedTarget.relative(e.item.index) + 1;
        } else if (e.item && typeof e.item.index === "number") {
            current = ((e.item.index % total) + total) % total + 1;
        }
        $("#certCurrent").text(current);
        $("#certTotal").text(total);
    }

    $certCarousel.on("changed.owl.carousel", updateCertCounter);

    $certCarousel.owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 4500,
        autoplayHoverPause: true,
        smartSpeed: 600,
        animateOut: 'certShuffleOut',
        animateIn:  'certShuffleIn',
        dots: false,
        nav: false,
        items: 1,
        margin: 0,
        stagePadding: 0
    });

    // Set initial counter values
    var totalCertCards = $(".certificates-carousel .cert-slide").length;
    $("#certCurrent").text("1");
    $("#certTotal").text(totalCertCards || 10);

    // Custom prev/next buttons
    $("#certPrev").off("click").on("click", function () {
        $certCarousel.trigger("prev.owl.carousel");
    });
    $("#certNext").off("click").on("click", function () {
        $certCarousel.trigger("next.owl.carousel");
    });

    // Certificate Lightbox
    $(document).on("click", ".certificate-img-container", function () {
        var $img = $(this).find("img");
        var src = $img.attr("src");
        var caption = $(this).closest(".certificate-item").find("h3").text();
        if (src) {
            $("#certLightboxImg").attr("src", src);
            $("#certLightboxCaption").text(caption);
            $("#certLightbox").addClass("active");
            $("body").css("overflow", "hidden");
        }
    });

    function closeCertLightbox() {
        $("#certLightbox").removeClass("active");
        $("body").css("overflow", "");
        setTimeout(function () { $("#certLightboxImg").attr("src", ""); }, 300);
    }
    window.closeCertLightbox = closeCertLightbox;

    $(document).on("click", "#certLightboxClose, #certLightboxOverlay", function (e) {
        e.preventDefault();
        e.stopPropagation();
        closeCertLightbox();
    });

    $(document).on("keydown", function (e) {
        if (e.key === "Escape") closeCertLightbox();
    });


    // Project details modal
    var projectDetails = {
        docconnect: {
            title: "DocConnect",
            category: "Live healthcare appointment platform",
            description: "A healthcare platform that helps patients find doctors, review available services, and book appointments through a focused, easy-to-use experience.",
            stack: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs"],
            highlights: ["Doctor and patient workflows", "Appointment discovery and booking", "Responsive MERN application"],
            live: "https://doc-connect-self.vercel.app/",
            github: "https://github.com/iabdul-rafay/Doc-Connect.git"
        },
        "brew-bloom": {
            title: "Brew & Bloom",
            category: "In-development coffee shop platform",
            description: "A warm, modern coffee shop website designed to present the brand, menu, and customer experience through an engaging React interface.",
            stack: ["React.js", "JavaScript", "HTML5", "CSS3", "Responsive UI"],
            highlights: ["Coffee shop branding and menu presentation", "Responsive customer-facing interface", "Modern product-focused design"],
            live: "https://brewandbloom-vert.vercel.app/",
            github: "https://github.com/iabdul-rafay/Brew-Bloom-Coffee-Shop"
        },
        khastech: {
            title: "Khastech Solutions",
            category: "Technology company website",
            description: "A professional technology services website built to present Khastech Solutions, its offerings, and its capabilities to prospective clients.",
            stack: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
            highlights: ["Service-focused company presentation", "Responsive business website", "Clear navigation and conversion paths"],
            live: "https://khastech.com",
            preview: "https://khastechcom.vercel.app/"
        },
        myvista: {
            title: "myVISTA",
            category: "FYP mobile application for smart home automation",
            description: "A bilingual AI smart home controller that connects ESP32-based devices with a mobile experience for intelligent home automation and control.",
            stack: ["Python", "AI / Machine Learning", "ESP32", "IoT", "Mobile Application", "TensorFlow Lite"],
            highlights: ["Bilingual voice-enabled smart home control", "ESP32 hardware integration", "AI-assisted device automation"],
            image: "img/My_VISTA_.png"
        },
        xaryab: {
            title: "Xaryab Mentorship",
            category: "Live private mentorship project",
            description: "A personal mentorship website created to present Xaryab Hashmi's professional profile, experience, and mentorship journey in a polished online format.",
            stack: ["React.js", "JavaScript", "HTML5", "CSS3", "Responsive Design"],
            highlights: ["Personal brand and profile presentation", "Mentorship-focused content structure", "Responsive modern website"],
            live: "https://xaryab-mentorship-ten.vercel.app/"
        },
        "tax-portal": {
            title: "AI Tax Portal",
            category: "Live AI dashboard",
            description: "An AI-powered tax dashboard designed to organize tax information, surface useful insights, and present financial data through clear visual reporting.",
            stack: ["React.js", "Node.js", "AI / Machine Learning", "Data Visualization", "REST APIs"],
            highlights: ["Dashboard-based tax reporting", "Visual analytics and key metrics", "AI-assisted financial workflow"],
            live: "https://ai-tax-portal.vercel.app/dashboard",
            github: "https://github.com/iabdul-rafay/my-ai-tax-portal"
        },
        paws: {
            title: "Paws and Co.",
            category: "In-development pet community platform",
            description: "A community platform for pet owners to connect, discover useful resources, and share experiences around the animals they care for.",
            stack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
            highlights: ["Pet-focused community experience", "Responsive social platform interface", "Scalable full-stack foundation"],
            live: "https://paws-and-co-swart.vercel.app/",
            github: "https://github.com/iabdul-rafay/Paws-and-Co.-"
        }
    };

    function openProjectModal(projectId) {
        var project = projectDetails[projectId];
        if (!project) return;

        $("#projectModalLabel").text(project.title);
        $("#projectModalCategory").text(project.category);
        $("#projectModalDescription").text(project.description);
        $("#projectModalStack").empty();
        project.stack.forEach(function (technology) {
            $("#projectModalStack").append($("<span>", {
                class: "modal-badge",
                text: technology
            }));
        });
        $("#projectModalHighlights").empty();
        project.highlights.forEach(function (highlight) {
            $("#projectModalHighlights").append($("<li>", { text: highlight }));
        });
        $("#projectModalLinks").empty();

        if (project.live) {
            $("#projectModalLinks").append($("<a>", {
                class: "btn mr-2",
                href: project.live,
                target: "_blank",
                rel: "noopener",
                html: '<i class="fa fa-external-link-alt mr-1"></i> Visit Project'
            }));
        }
        if (project.preview) {
            $("#projectModalLinks").append($("<a>", {
                class: "btn mr-2",
                href: project.preview,
                target: "_blank",
                rel: "noopener",
                html: '<i class="fa fa-eye mr-1"></i> Preview'
            }));
        }
        if (project.github) {
            $("#projectModalLinks").append($("<a>", {
                class: "btn mr-2",
                href: project.github,
                target: "_blank",
                rel: "noopener",
                html: '<i class="fab fa-github mr-1"></i> GitHub'
            }));
        }
        if (project.image) {
            $("#projectModalLinks").append($("<a>", {
                class: "btn mr-2",
                href: project.image,
                target: "_blank",
                rel: "noopener",
                html: '<i class="fa fa-image mr-1"></i> View Image'
            }));
        }
        $("#projectModal").modal("show");
    }

    $(document).on("click", ".project-trigger", function (event) {
        if ($(event.target).closest("a").length) return;
        openProjectModal($(this).data("project"));
    });

    $(document).on("keydown", ".project-trigger", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openProjectModal($(this).data("project"));
        }
    });



    // Portfolio filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-filter li').on('click', function () {
        $("#portfolio-filter li").removeClass('filter-active');
        $(this).addClass('filter-active');
        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });
    
    // Smooth scroll reveal on scroll
(function () {
    var animatedEls = document.querySelectorAll(
        '.fade-in-up, .fade-in-left, .fade-in-right, .zoom-in'
    );

    function checkVisible() {
        animatedEls.forEach(function (el) {
            var rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkVisible);
    window.addEventListener('load', checkVisible);
})();

// Ink Drop Cursor
(function () {
    var arrow     = document.getElementById('ink-arrow');
    var ringEl    = document.getElementById('ink-ring');
    var ringCirc  = document.getElementById('ink-ring-circle');
    var ringDot   = document.getElementById('ink-ring-dot');
    var arrowBody = document.getElementById('ink-arrow-body');
    var drip1     = document.querySelector('.ink-drip');
    var drip2     = document.querySelector('.ink-drip2');
    var canvas    = document.getElementById('ink-canvas');
    if (!arrow || !canvas) return;

    var ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    var mx = -200, my = -200;
    var rx = -200, ry = -200;
    var lastX = -200, lastY = -200;
    var speed = 0;
    var particles = [];
    var isLink = false, isDark = false;

    document.addEventListener('mousemove', function (e) {
        mx = e.clientX;
        my = e.clientY;

        var dx = mx - lastX, dy = my - lastY;
        speed = Math.sqrt(dx * dx + dy * dy);
        lastX = mx; lastY = my;

        arrow.style.transform = 'translate(' + (mx - 3) + 'px,' + (my - 3) + 'px)';

        var hit = document.elementFromPoint(mx, my);
        var dark = !!(hit && hit.closest('[data-dark]'));
        if (dark !== isDark) {
            isDark = dark;
            applyDarkMode(dark);
        }

        var linked = !!(hit && hit.closest('a, button, [role="button"]'));
        if (linked !== isLink) {
            isLink = linked;
            document.body.classList.toggle('cur-is-link', linked);
            ringDot.style.opacity = linked ? '0.6' : '0';
            if (linked) spawnBurst(mx, my, 8);
        }

        var drops = Math.min(Math.floor(speed * 0.2), 5);
        for (var i = 0; i < drops; i++) spawnTrail(mx, my);
    });

    function applyDarkMode(on) {
        if (on) {
            arrowBody.setAttribute('fill', '#ffffff');
            arrowBody.setAttribute('stroke', 'rgba(255,255,255,0.25)');
            drip1 && drip1.setAttribute('fill', 'rgba(255,255,255,0.75)');
            drip2 && drip2.setAttribute('fill', 'rgba(255,255,255,0.5)');
            ringCirc.setAttribute('stroke', '#ffffff');
        } else {
            arrowBody.setAttribute('fill', '#EF233C');
            arrowBody.setAttribute('stroke', '#2b2d42');
            drip1 && drip1.setAttribute('fill', '#EF233C');
            drip2 && drip2.setAttribute('fill', '#2b2d42');
            ringCirc.setAttribute('stroke', '#EF233C');
        }
    }

    function spawnTrail(x, y) {
        particles.push({
            x: x + (Math.random() - 0.5) * 10,
            y: y + 14 + Math.random() * 8,
            r: Math.random() * 2.5 + 0.8,
            vx: (Math.random() - 0.5) * 1.2,
            vy: Math.random() * 2.5 + 0.8,
            life: 0.9,
            decay: Math.random() * 0.035 + 0.025,
            col: Math.random() < 0.65 ? '#EF233C' : '#2b2d42',
            blob: false
        });
    }

    function spawnBurst(x, y, count) {
        for (var i = 0; i < count; i++) {
            var angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
            var spd   = Math.random() * 3.5 + 2;
            particles.push({
                x: x, y: y,
                r: Math.random() * 3.5 + 1.5,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd - 1,
                life: 1.0,
                decay: Math.random() * 0.03 + 0.025,
                col: Math.random() < 0.55 ? '#EF233C' : '#2b2d42',
                blob: true
            });
        }
    }

    document.addEventListener('mousedown', function () {
        document.body.classList.add('cur-is-click');
        spawnBurst(mx, my, 16);
    });
    document.addEventListener('mouseup', function () {
        document.body.classList.remove('cur-is-click');
    });

    document.addEventListener('mouseleave', function () {
        arrow.style.opacity = '0';
        ringEl.style.opacity = '0';
    });
    document.addEventListener('mouseenter', function () {
        arrow.style.opacity = '1';
        ringEl.style.opacity = '1';
    });

    function lerp(a, b, t) { return a + (b - a) * t; }

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        rx = lerp(rx, mx, 0.1);
        ry = lerp(ry, my, 0.1);
        ringEl.style.transform = 'translate(' + (rx - 40) + 'px,' + (ry - 40) + 'px)';

        particles = particles.filter(function (p) { return p.life > 0; });
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            p.x  += p.vx;
            p.y  += p.vy;
            p.vy += 0.18;
            p.vx *= 0.96;
            p.life -= p.decay;

            ctx.save();
            ctx.globalAlpha = Math.max(0, p.life);
            ctx.fillStyle   = p.col;
            if (p.blob) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.translate(p.x, p.y);
                ctx.scale(1, 1.5);
                ctx.beginPath();
                ctx.arc(0, 0, p.r, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.ellipse(0, p.r * 0.9, p.r * 0.4, p.r * 0.7, 0, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }

        if (speed < 1 && Math.random() < 0.025) {
            particles.push({
                x: mx, y: my + 6,
                r: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.4,
                vy: Math.random() + 0.5,
                life: 1.0, decay: 0.022,
                col: '#EF233C', blob: false
            });
        }

        requestAnimationFrame(loop);
    }
    loop();
})();
// End Ink Drop Cursor

})(jQuery);

// Skill percentage counter animation
function animateCounters() {
    $('.skill-name p:last-child').each(function () {
        var $this = $(this);
        var target = parseInt($this.text());
        $this.text('0%');

        $({ count: 0 }).animate({ count: target }, {
            duration: 2000,
            easing: 'swing',
            step: function () {
                $this.text(Math.ceil(this.count) + '%');
            },
            complete: function () {
                $this.text(target + '%');
            }
        });
    });
}

// Waypoint — sirf tab chale jab about section screen pe aaye
$('#about').waypoint(function () {
    animateCounters();
}, { offset: '80%', triggerOnce: true });