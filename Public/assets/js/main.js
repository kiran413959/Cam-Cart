/* 
    Project Name : Cam Cart - Ecommerce Website
    Designed & Coded by : Kiran kumar
*/

// const { invalid } = require("joi");


// $(window).on("load", function () { $("#preloader").fadeOut(1e3) }), $(document).ready(function () { "use strict"; const e = $(window).scrollTop(), s = $("html, body"), o = $("#header"), i = $("#sidebar"), t = $(".goTop"), l = $(".mobile_search"), r = $("#account_modal"), a = $(".product_modal"), c = $(".product_swiper"), n = $(".thumb_swiper"); $(window).on("scroll", function () { const e = $(this).scrollTop(); e > 100 ? o.addClass("sticky") : o.removeClass("sticky"), e > 800 ? t.addClass("popped") : t.removeClass("popped") }), e > 100 ? o.addClass("sticky") : o.removeClass("sticky"), e > 800 ? t.addClass("popped") : t.removeClass("popped"), t.click(function () { return s.animate({ scrollTop: 0 }, "fast"), !1 }), $(".sidebar_toggler").click(function () { i.addClass("show") }), $(".drop_down_head").click(function () { let e = $(this).children("i"); $(".drop_down_body").slideToggle(300), e.hasClass("bi-plus") ? e.attr("class", "bi-dash") : e.attr("class", "bi-plus") }), $(".sidebar_close").click(function () { i.removeClass("show") }), $(document).mouseup(function (e) { 0 === $(e.target).closest(i).length && i.removeClass("show") }), $(".search-icon").click(function () { $(".search_field").toggle(400) }), $(".mob-search").click(function () { l.addClass("visible") }), $(".mob_search_close").click(function () { l.removeClass("visible") }), $(".user-icon, .checkout_btn").click(function () { s.addClass("overflow_hide"), r.fadeIn(), $(".account_swiper").slideDown() }); new Swiper(".account_swiper", { effect: "flip", autoHeight: !0, speed: 500, allowTouchMove: !1, navigation: { nextEl: ".account_swiper .swiper-button-next", prevEl: ".account_swiper .swiper-button-prev" } }); $(".account_close").click(function () { s.removeClass("overflow_hide"), r.fadeOut(), $(".account_swiper").slideUp() }), $(window).on("keydown", function (e) { "Escape" === e.key && (s.removeClass("overflow_hide"), r.fadeOut(), $(".account_swiper").slideUp()) }), $(".foot_subscribe form").on("submit", function () { alert("You are subscribed to receive our Daily Newsletter."), location.reload() }); new Swiper(".hero_swiper", { speed: 500, loop: !0, loopedSlides: 3, slidesPerView: 1, navigation: { nextEl: ".hero_swiper .swiper-button-next", prevEl: ".hero_swiper .swiper-button-prev" }, autoplay: { delay: 3e3, disableOnInteraction: !1 }, keyboard: { enabled: !0, onlyInViewport: !1 } }); function d(e) { s.animate({ scrollTop: $(e).offset().top }, "fast") } function p(e) { let s = $(".toast_msg"); $(".toast_msg span").text(e), s.addClass("pop"), setTimeout(function () { s.removeClass("pop") }, 3e3) } $(".hero_btn").click(function () { return d("#popular"), !1 }), $(".scroll_down_btn").click(function () { return d("#products"), !1 }), $(".cart_btn").click(function () { p("Added to Cart") }), $(".buy_btn, .compare_btn").click(function () { p("Login First") }), $(".bi-heart").click(function () { let e = $(this); e.hasClass("bi-heart") ? (e.attr("class", "bi-heart-fill"), p("Added to wishlist")) : (e.attr("class", "bi-heart"), p("Removed from wishlist")) }), $(".bi-share").click(function () { prompt("Press Ctrl + C, then Enter to copy link to clipboard", $(location).attr("href")) && p("Link Copied") }); new Swiper(".reviews_swiper", { speed: 400, loop: !0, loopedSlides: 4, slidesPerView: "auto", spaceBetween: 10, navigation: { nextEl: ".reviews_swiper .swiper-button-next", prevEl: ".reviews_swiper .swiper-button-prev" }, keyboard: { enabled: !0, onlyInViewport: !1 }, breakpoints: { 320: { slidesPerView: 1 }, 480: { slidesPerView: 1 }, 640: { slidesPerView: 2 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 2 } } }); $(".popular_quick_btn").click(function () { let e = $(this).attr("data-filter"); s.addClass("overflow_hide"), a.filter("." + e).addClass("view") }); for (let e = 0; e < c.length; e++) { c[e].classList.add("gallery-top-" + e), n[e].classList.add("gallery-thumbs-" + e); const s = new Swiper(".gallery-thumbs-" + e, { spaceBetween: 10, slidesPerView: 4, freeMode: !0, watchSlidesVisibility: !0, watchSlidesProgress: !0 }); new Swiper(".gallery-top-" + e, { effect: "cube", speed: 500, slidesPerView: 1, grabCursor: !0, cubeEffect: { shadow: !0, slideShadows: !1, shadowOffset: 20, shadowScale: .94 }, thumbs: { swiper: s } }) } $(".product_close").click(function () { s.removeClass("overflow_hide"), a.removeClass("view") }), $(window).on("click keydown", function (e) { ($(e.target).is(".product_modal .modal_centered") || "Escape" === e.key) && (s.removeClass("overflow_hide"), a.removeClass("view")) }) });



/* 
Project Name : Cam Cart - Ecommerce Website
Designed & Coded by : Kiran kumar
*/

// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'

$(window).on("load", function () {
    $("#preloader").fadeOut(1e3)
}),

$(document).ready(function () {
    "use strict";
    const e = $(window).scrollTop(),
        s = $("html, body"),
        o = $("#header"),
        i = $("#sidebar"),
        t = $(".goTop"),
        l = $(".mobile_search"),
        r = $("#account_modal"),
        a = $(".product_modal"),
        k=  $('.order_product'),
        c = $(".product_swiper"),
        n = $(".thumb_swiper");
    $(window).on("scroll", function () {
        const e = $(this).scrollTop();
        e > 100 ? o.addClass("sticky") : o.removeClass("sticky"), e > 800 ? t.addClass("popped") : t.removeClass("popped")
    }),
    
    e > 100 ? o.addClass("sticky") : o.removeClass("sticky"), e > 800 ? t.addClass("popped") : t.removeClass("popped"), t.click(function () {
        return s.animate({
            scrollTop: 0
        }, "fast"), !1
    }),
    
    $(".sidebar_toggler").click(function () {
        i.addClass("show")
    }),
    
    $(".drop_down_head").click(function () {
        let e = $(this).children("i");
        $(".drop_down_body").slideToggle(300), e.hasClass("bi-plus") ? e.attr("class", "bi-dash") : e.attr("class", "bi-plus")
    }),
    
    $(".sidebar_close").click(function () {
        i.removeClass("show")
    }),
    
    $(document).mouseup(function (e) {
        0 === $(e.target).closest(i).length && i.removeClass("show")
    }),
    
    $(".search-icon").click(function () {
        $(".search_field").toggle(400)
    }),
    
    $(".mob-search").click(function () {
        l.addClass("visible")
    }),
    
    $(".mob_search_close").click(function () {
        l.removeClass("visible")
    }),
    
    $(".user-icon, .checkout_btn").click(function () {
        s.addClass("overflow_hide"), r.fadeIn(), $(".account_swiper").slideDown()
    });


    new Swiper(".account_swiper", {
        effect: "flip",
        autoHeight: !0,
        speed: 500,
        allowTouchMove: !1,
        navigation: {
            nextEl: ".account_swiper .swiper-button-next",
            prevEl: ".account_swiper .swiper-button-prev"
        }
    });


    $(".account_close").click(function () {
        s.removeClass("overflow_hide"), r.fadeOut(), $(".account_swiper").slideUp()
    }),
    
    $(window).on("keydown", function (e) {
        "Escape" === e.key && (s.removeClass("overflow_hide"), r.fadeOut(), $(".account_swiper").slideUp())
    }),
    
    $(".foot_subscribe form").on("submit", function () {
        alert("You are subscribed to receive our Daily Newsletter."), location.reload()
    });


    new Swiper(".hero_swiper", {
        speed: 500,
        loop: !0,
        loopedSlides: 3,
        slidesPerView: 1,
        navigation: {
            nextEl: ".hero_swiper .swiper-button-next",
            prevEl: ".hero_swiper .swiper-button-prev"
        },
        autoplay: {
            delay: 3e3,
            disableOnInteraction: !1
        },
        keyboard: {
            enabled: !0,
            onlyInViewport: !1
        }
    });

    function d(e) {
        s.animate({
            scrollTop: $(e).offset().top
        }, "fast")
    }

    function p(e) {
        let s = $(".toast_msg");
        $(".toast_msg span").text(e), s.addClass("pop"), setTimeout(function () {
            s.removeClass("pop")
        }, 3e3)
    }
    $(".hero_btn").click(function () {
        return d("#popular"), !1
    }), $(".scroll_down_btn").click(function () {
        return d("#products"), !1




    }),


     /// <!--============== *Cart Add Section* ==============-->///

        $(document).ready(function () {
            $('.cart_btn').on('click', function (event) {
                event.preventDefault();


                var productId = $(this).attr('data-product-id');


                console.log(productId);
                let e = $(this);


                if (productId) {
                    $.ajax({
                        type: 'POST',
                        url: '/cart/add/' + productId,
                        data: {
                            productId: productId


                        },


                        success: function (response) {

                            console.log(response);
                            console.log(response + "resond");
                            if (response) {

                                const cartId = `#id${productId}`;
                                const cartQuantity = $(cartId);
                                cartQuantity[0].innerText = `${1 + + cartQuantity[0]?.innerText}`;
                                const quantity = parseInt(cartQuantity[0].innerText);
                                console.log(quantity);

                                const realPrice = `#price${productId}`;
                                const price = $(realPrice)
                                const productprice = parseInt(price[0].innerText)
                                console.log(productprice);

                                const totalprice = `#totalprice${productId}`;
                                const TotPrice = $(totalprice)
                                console.log(TotPrice[0].innerText);

                                const newtotalprice = `${parseInt(price[0].innerText) * quantity}`;
                                TotPrice[0].innerText = `${newtotalprice}`
                                console.log(newtotalprice);

                                const totalAmount = $('#total');
                                totalAmount[0].innerText = `${+totalAmount[0].innerText + +productprice}`

                                const subtotal = parseInt(totalAmount[0].innerText);

                                console.log(totalAmount[0].innerText);

                            } else {
                                console.log(`Error: ${response.success}`);
                            }
                        },
                        error: function (error) {
                            console.error('Error :', error);
                        }
                    });
                }
            });
        });

        $(".cart_btn").click(function () {
            p("Added to Cart")
        }),


     /// <!--============== *Cart Add Section* ==============-->///




     /// <!--============== *Cart Remove Section* ==============-->///

    $(document).ready(function () {
        $('.minus').on('click', function (event) {
            console.log('calling')
            event.preventDefault();

            var productId = $(this).attr('data-product-id');

            if (productId) {
                $.ajax({
                    type: 'POST',
                    url: '/cart/remove/' + productId,
                    data: {
                        productId: productId
                    },
                    success: function (response) {
                        console.log(response);
                        if (response) {
                            const cartId = `#id${productId}`;
                            const cartQuantity = $(cartId);
                            // var quantity = cartQuantity[0].innerText;
                            console.log(cartQuantity[0].innerText);
                            if (cartQuantity[0].innerText > 0) {

                                cartQuantity[0].innerText = `${cartQuantity[0]?.innerText - 1}`  // Decrease quantity by 1
                                var quantity = parseInt(cartQuantity[0].innerText)


                            }
                        } else {
                            console.log(`Error: ${response.success}`);
                        }
                        console.log(quantity);

                        const realPrice = `#price${productId}`;
                        const price = $(realPrice)
                        const productprice = parseInt(price[0].innerText)
                        console.log(price[0].innerText);

                        const totalprice = `#totalprice${productId}`;
                        const TotPrice = $(totalprice)
                        console.log(TotPrice[0].innerText);

                        const newtotalprice = `${parseInt(price[0].innerText) * quantity}`;
                        TotPrice[0].innerText = `${newtotalprice}`


                        const totalAmount = $('#total');
                        totalAmount[0].innerText = `${+totalAmount[0].innerText - +productprice}`

                        const subtotal = parseInt(totalAmount[0].innerText);

                        console.log(totalAmount[0].innerText);

                    },
                    error: function (error) {
                        console.error('Error:', error);
                    }
                });
            }
        });
    });


     /// <!--============== *Cart Remove Section* ==============-->///




     /// <!--============== *Cart Delete Section* ==============-->///


    $(document).ready(function () {
        $('#cartDelete').on('click', function (event) {
            event.preventDefault();

            var productId = $(this).attr('data-product-id');

            if (productId) {
                $.ajax({
                    type: 'POST',
                    url: '/cart/delete/' + productId,
                    data: {
                        productId: productId
                    },
                    success: function (response) {
                        console.log(response);
                        // Handle the success response here
                        if (response) {
                            window.location.reload()
                            console.log("Product successfully deleted from cart.");


                            // Optionally, perform any additional actions after successful deletion
                        } else {
                            console.log("Error deleting product from cart:", response.error);
                        }
                    },
                    error: function (error) {
                        console.error('Error:', error);
                        // Handle the error here
                        console.log("An error occurred while deleting product from cart.");
                    }
                });
            }
        });
    });


     /// <!--============== *Cart Delete Section* ==============-->///





    /// <!--============== *Product Wishlist Section* ==============-->///



        $(document).ready(function () {
            $('.wishlist-button').on('click', function (event) {
                event.preventDefault();


                var productId = $(this).attr('data-product-id');

                console.log(productId);
                let e = $(this);

                var active = e.hasClass("bi-heart");
                console.log(active);

                if (productId) {
                    $.ajax({
                        type: 'POST',
                        url: '/Whishlist/add/' + productId,
                        data: {
                            productId: productId,
                            active: active,
                        },


                        success: function (response) {
                            console.log(response);
                            if (response.success) {

                                // console.log(removeWishlist);

                                if (response.update) {
                                    console.log('hello')
                                    e.attr("class", "+-fill")
                                } else {

                                    console.log('hiiiiiiiiiiii');
                                    e.attr("class", "bi-heart")
                                }

                                // updateWishlistCount();
                            } else {
                                console.log(`Error toggling wishlist: ${response.success}`);
                            }
                        },
                        error: function (error) {
                            console.error('Error toggling wishlist:', error);
                        }
                    });
                }
            });
        });



        $(".wishlist-button").click(function () {
            let e = $(this);
            e.hasClass("bi-heart") ? (e.attr("class", "bi-heart-fill"), p("Added to wishlist")) : (e.attr("class", "bi-heart"), p("Removed from wishlist"))
        }),
    
            $(".bi-share").click(function () {
                prompt("Press Ctrl + C, then Enter to copy link to clipboard", $(location).attr("href")) && p("Link Copied")
            });



     /// <!--============== *Product Wishlist Section* ==============-->///



    /// <!--============== *Product Buy Now Section* ==============-->///


    $(document).ready(function () {
        $('.buy_btn').on('click', function (event) {
            event.preventDefault();

            var productId = $(this).attr('data-product-id');
            console.log(productId);

            if (productId) {
                $.ajax({
                    type: 'POST',
                    url: '/buynow/' + productId,
                    data: {
                        productId: productId
                    },
                    success: function (response) {
                        console.log(response);
                        // Handle the success response here
                        if (response) {
                            window.location.href = '/checkout'
                            console.log("order successfully placed.");


                            // Optionally, perform any additional actions after successful deletion
                        } else {
                            console.log("Error buying products:", response.error);
                        }
                    },
                    error: function (error) {
                        console.error('Error:', error);
                        // Handle the error here
                        console.log("An error occurred.");
                    }
                });
            }
        });
    });

    /// <!--============== *Product Buy Now Section* ==============-->///





    
    new Swiper(".reviews_swiper", {
        speed: 400,
        loop: !0,
        loopedSlides: 4,
        slidesPerView: "auto",
        spaceBetween: 10,
        navigation: {
            nextEl: ".reviews_swiper .swiper-button-next",
            prevEl: ".reviews_swiper .swiper-button-prev"
        },
        keyboard: {
            enabled: !0,
            onlyInViewport: !1
        },
        breakpoints: {
            320: {
                slidesPerView: 1
            },
            480: {
                slidesPerView: 1
            },
            640: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 2
            }
        }
    });

    /// <!--============== *Product Quick View Section* ==============-->///



    $(".popular_quick_btn").click(function () {
        let e = $(this).attr("data-filter");
        s.addClass("overflow_hide"), a.filter("." + e).addClass("view")
    });
    for (let e = 0; e < c.length; e++) {
        c[e].classList.add("gallery-top-" + e), n[e].classList.add("gallery-thumbs-" + e);
        const s = new Swiper(".gallery-thumbs-" + e, {
            spaceBetween: 10,
            slidesPerView: 4,
            freeMode: !0,
            watchSlidesVisibility: !0,
            watchSlidesProgress: !0
        });
        new Swiper(".gallery-top-" + e, {
            effect: "cube",
            speed: 500,
            slidesPerView: 1,
            grabCursor: !0,
            cubeEffect: {
                shadow: !0,
                slideShadows: !1,
                shadowOffset: 20,
                shadowScale: .94
            },
            thumbs: {
                swiper: s
            }
        })
    }
    $(".product_close").click(function () {
        s.removeClass("overflow_hide"), a.removeClass("view")
    }), $(window).on("click keydown", function (e) {
        ($(e.target).is(".product_modal .modal_centered") || "Escape" === e.key) && (s.removeClass("overflow_hide"), a.removeClass("view"))
    })


    /// <!--============== *Product Quick View Section* ==============-->///



    /// <!--============== *Order Quick View Section* ==============-->///

$(document).ready(function() {
    $(".quicklook").click(function () {
        let e = $(this).attr("data-filter");
        s.addClass("overflow_hide"), k.filter("." + e).addClass("view")
    });

    for (let e = 0; e < c.length; e++) {
        c[e].classList.add("gallery-top-" + e), n[e].classList.add("gallery-thumbs-" + e);
        const s = new Swiper(".gallery-thumbs-" + e, {
            spaceBetween: 10,
            slidesPerView: 4,
            freeMode: !0,
            watchSlidesVisibility: !0,
            watchSlidesProgress: !0
        });
        new Swiper(".gallery-top-" + e, {
            effect: "cube",
            speed: 500,
            slidesPerView: 1,
            grabCursor: !0,
            cubeEffect: {
                shadow: !0,
                slideShadows: !1,
                shadowOffset: 20,
                shadowScale: .94
            },
            thumbs: {
                swiper: s
            }
        })
    }
    $(".product_close").click(function () {
        s.removeClass("overflow_hide"), k.removeClass("view")
    });

    $(window).on("click keydown", function (e) {
        ($(e.target).is(".order_product .modal_centered") || "Escape" === e.key) && (s.removeClass("overflow_hide"), k.removeClass("view"))
    });
    });



    /// <!--============== *Order Quick View Section* ==============-->///




    /// <!--============== *Coupon Section* ==============-->///

    $(document).ready(function () {
        $('#coupon_btn').on('click', function (event) {
            event.preventDefault();
    
            var couponCode = $("#Coupon").val();
            console.log(couponCode);
    
            if (couponCode) {
                $.ajax({
                    type: 'POST',
                    url: '/couponApply',
                    data: JSON.stringify({
                        coupon: couponCode
                    }),
                    success: function (response) {
                        console.log("response    :" + response);

                        if (!isNaN(response)) {
                            let discountPercentage = parseInt(response);
                            console.log("discountPercentage   :" + discountPercentage);
    
                            let totalText = $("#totalprice").text();
                            console.log("totalText   :" + totalText);
    
                            // Remove the currency symbol and convert the total price to a float number
                            let total = parseFloat(totalText.replace(" TL", ""));
                            console.log("total:" + total);
    
                            let discountedAmount = total * (1 - (discountPercentage / 100));
                            let finalPrice = total - discountedAmount;
    
                            $('#totalprice').text("₹"+discountedAmount.toFixed(2));
                            $('#discountedAmount').text("₹"+finalPrice.toFixed(2));
    
                            console.log("discountedAmount   :" + discountedAmount);
                            console.log("final price is   : " + finalPrice);
    
                        } else {
                            alert("Invalid Coupon Code");
                        }
                    },
                    error: function (error) {
                        console.error('Error:', error);
                        console.log("An error occurred.");
                    }
                });
            }
        });
    });


    /// <!--============== *Coupon Section* ==============-->///



});
