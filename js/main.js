(function ($) {
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
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
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