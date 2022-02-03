$(".slider").slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  dots: true,
  speed: 500,
  autoplaySpeed: 2000,
  prevArrow: "<i class='fas fa-angle-left left-arrow'></i>",
  nextArrow: "<i class='fas fa-angle-right right-arrow'></i>",
  infinite: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 580,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 380,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ],
});
