$(document).ready(function() {
    let $slides = $('.slides'); 
    let totalSlides = $slides.length;
    let currentIndex = 0;
    let slideWidth = $('.carousel-box-slide').width();

    function updateSlidesToShow() {
        let slidesToShow = 1; 
        let windowWidth = $(window).width();

        if (windowWidth >= 1200) {
            slidesToShow = 4;
        } else if (windowWidth >= 992) {
            slidesToShow = 3;
        } else if (windowWidth >= 768) {
            slidesToShow = 2;
        }

        slideWidth = $('.carousel-box-slide').width() / slidesToShow;
        $slides.css('min-width', slideWidth + 'px');
    }

    updateSlidesToShow();
    $(window).resize(updateSlidesToShow);

    function moveSlides() {
        currentIndex++;

        $('.carousel-imgs').css('transform', 'translateX(' + (-currentIndex * slideWidth) + 'px)');

        if (currentIndex === totalSlides) {
            setTimeout(function() {
                $('.carousel-imgs').css('transition', 'none');
                currentIndex = 0;
                $('.carousel-imgs').css('transform', 'translateX(0px)');
                setTimeout(function() {
                    $('.carousel-imgs').css('transition', 'transform 0.5s ease-in-out');
                }, 50);
            }, 500);
        }
    }

    setInterval(moveSlides, 3000);
});