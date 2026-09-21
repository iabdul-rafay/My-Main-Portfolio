(function () {
    var arrow = document.getElementById('ink-arrow');
    var ringEl = document.getElementById('ink-ring');
    var ringCirc = document.getElementById('ink-ring-circle');
    var ringDot = document.getElementById('ink-ring-dot');
    var arrowBody = document.getElementById('ink-arrow-body');
    var drip1 = document.querySelector('.ink-drip');
    var drip2 = document.querySelector('.ink-drip2');
    var canvas = document.getElementById('ink-canvas');

    if (!arrow || !ringEl || !ringCirc || !ringDot || !arrowBody || !canvas) return;

    var ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
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

    document.addEventListener('mousemove', function (event) {
        mx = event.clientX;
        my = event.clientY;

        var dx = mx - lastX, dy = my - lastY;
        speed = Math.sqrt(dx * dx + dy * dy);
        lastX = mx;
        lastY = my;
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
        arrowBody.setAttribute('fill', on ? '#ffffff' : '#EF233C');
        arrowBody.setAttribute('stroke', on ? 'rgba(255,255,255,0.25)' : '#2b2d42');
        if (drip1) drip1.setAttribute('fill', on ? 'rgba(255,255,255,0.75)' : '#EF233C');
        if (drip2) drip2.setAttribute('fill', on ? 'rgba(255,255,255,0.5)' : '#2b2d42');
        ringCirc.setAttribute('stroke', on ? '#ffffff' : '#EF233C');
    }

    function spawnTrail(x, y) {
        particles.push({ x: x + (Math.random() - 0.5) * 10, y: y + 14 + Math.random() * 8,
            r: Math.random() * 2.5 + 0.8, vx: (Math.random() - 0.5) * 1.2,
            vy: Math.random() * 2.5 + 0.8, life: 0.9, decay: Math.random() * 0.035 + 0.025,
            col: Math.random() < 0.65 ? '#EF233C' : '#2b2d42', blob: false });
    }

    function spawnBurst(x, y, count) {
        for (var i = 0; i < count; i++) {
            var angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
            var spd = Math.random() * 3.5 + 2;
            particles.push({ x: x, y: y, r: Math.random() * 3.5 + 1.5,
                vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd - 1,
                life: 1, decay: Math.random() * 0.03 + 0.025,
                col: Math.random() < 0.55 ? '#EF233C' : '#2b2d42', blob: true });
        }
    }

    document.addEventListener('mousedown', function () {
        document.body.classList.add('cur-is-click');
        spawnBurst(mx, my, 16);
    });
    document.addEventListener('mouseup', function () { document.body.classList.remove('cur-is-click'); });
    document.addEventListener('mouseleave', function () { arrow.style.opacity = '0'; ringEl.style.opacity = '0'; });
    document.addEventListener('mouseenter', function () { arrow.style.opacity = '1'; ringEl.style.opacity = '1'; });

    function lerp(a, b, t) { return a + (b - a) * t; }

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        rx = lerp(rx, mx, 0.1);
        ry = lerp(ry, my, 0.1);
        ringEl.style.transform = 'translate(' + (rx - 40) + 'px,' + (ry - 40) + 'px)';

        particles = particles.filter(function (particle) { return particle.life > 0; });
        particles.forEach(function (particle) {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.18;
            particle.vx *= 0.96;
            particle.life -= particle.decay;
            ctx.save();
            ctx.globalAlpha = Math.max(0, particle.life);
            ctx.fillStyle = particle.col;
            ctx.beginPath();
            if (particle.blob) {
                ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
            } else {
                ctx.ellipse(particle.x, particle.y, particle.r, particle.r * 1.5, 0, 0, Math.PI * 2);
            }
            ctx.fill();
            ctx.restore();
        });

        if (speed < 1 && Math.random() < 0.025) spawnTrail(mx, my);
        requestAnimationFrame(loop);
    }

    loop();
})();