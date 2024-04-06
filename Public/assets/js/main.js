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



// const Swal = require('sweetalert2')

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
            k = $('.order_product'),
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




        $(document).ready(function () {
            $('.add_to_cart').on('click', function (event) {
                event.preventDefault();


                var productId = $(this).attr('data-product-id');


                console.log(productId);
                let e = $(this);


                if (productId) {
                    $.ajax({
                        type: 'POST',
                        url: '/cart/count/' + productId,
                        data: {
                            productId: productId


                        },


                        success: function (response) {

                            console.log(response);
                            console.log(response + "resond");
                            if (response.count) {

                                const count =$(".cart_badge")

                                console.log(count);

                                count[0].innerText=`${1+ +count[0].innerText}`


                              

                            } else {
                                console.log(`Error: ${response}`);
                            }
                        },
                        error: function (error) {
                            console.error('Error :', error);
                        }
                    });
                }
            });
        });






        $(".addreview").click(function () {
            $("#reviewBox").css("display", "block");
        });

        $("#review_close").click(function () {
            $("#reviewBox").css("display", "none");
        });
        



            /// <!--============== *Cart Add Section* ==============-->///

            $(document).ready(function () {
                $('.cart_add').on('click', function (event) {
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

                                    const subtotalAmount = $('#subtotal');
                                    subtotalAmount[0].innerText = `${+subtotalAmount[0].innerText + +productprice}`

                                    const totalMRPAmount = $('#totalMRP');
                                    totalMRPAmount[0].innerText = `${+totalMRPAmount[0].innerText + +productprice}`

                                    const totalAmount = $('#total');
                                    totalAmount[0].innerText = `${+totalAmount[0].innerText + +productprice}`

                                    // const subtotal = parseInt(totalAmount[0].innerText);

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
                                if (response.success) {
                                    const cartId = `#id${productId}`;
                                    const cartQuantity = $(cartId);
                                    const realPrice = `#price${productId}`;
                                    const TotPrice = $(`#totalprice${productId}`);

                                    if (cartQuantity[0].innerText == 1) {

                                        Swal.fire("Minimum Quantity Reached!");

                                        const productprice = parseInt($(realPrice)[0].innerText);
                                        TotPrice[0].innerText = `${productprice}`;
                                    } else if (cartQuantity[0].innerText > 1) {
                                        var quantity = parseInt(cartQuantity[0].innerText);
                                        cartQuantity[0].innerText = `${quantity - 1}`;  // Decrease quantity by 1
                                        const productprice = parseInt($(realPrice)[0].innerText);
                                        const newtotalprice = productprice * quantity;
                                        TotPrice[0].innerText = `${newtotalprice}`;
                                        console.log(newtotalprice);

                                        const subtotal = $('#subtotal');
                                        const subtotalamount = parseInt($(realPrice)[0].innerText);
                                        subtotal[0].innerText = `${parseInt(subtotal[0].innerText) - productprice}`;
                                        console.log(subtotal[0].innerText);


                                        const totalMRP = $('#totalMRP');
                                        const totalMRPamount = parseInt($(realPrice)[0].innerText);
                                        totalMRP[0].innerText = `${parseInt(totalMRP[0].innerText) - productprice}`;
                                        console.log(totalMRP[0].innerText);


                                        const totalAmount = $('#total');
                                        const productamount = parseInt($(realPrice)[0].innerText);
                                        totalAmount[0].innerText = `${parseInt(totalAmount[0].innerText) - productprice}`;
                                        console.log(totalAmount[0].innerText);


                                    }
                                } else {
                                    console.log(`Error: ${response.success}`);
                                }
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
            $('.cartDelete').on('click', function (event) {
                console.log('hoooooooooooooooooooooooooooo')
                event.preventDefault();

                const productId = $(this).attr('data-product-id');
                console.log(productId);
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
                                    e.attr("class", "bi-heart-fill")
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

        $(document).ready(function () {
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

                                $('#totalprice').text("₹" + discountedAmount.toFixed(2));
                                $('#discountedAmount').text("₹" + finalPrice.toFixed(2));

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





        //     /// <!--============== *Checkout Payment methodes* ==============-->///


        $(document).ready(function () {
            $('#checkout_form').submit(function (event) {
                event.preventDefault();
                console.log("hiiiii");
                const val = $('#checkout_form');
                const formData = val.serializeArray();
                const payload = {};

                formData.forEach(field => {
                    payload[field.name] = field.value
                });

                $.ajax({
                    type: 'POST',
                    url: '/checkout',
                    data: payload,

                    success: function (response) {
                        // console.log("data:  ", data);
                        console.log("Response received:", response); // Debugging statement
                        console.log("Response received:", response.status);
                        if (response.success) {
                            window.location.href = "/Order_Placed_Success";
                        } else {
                            // console.log(response.CreateOrder.amount); // Debugging statement
                            var amount = response.CreateOrder.amount;
                            var Porduct_Order = response.order._id
                            console.log("Order id  : " + Porduct_Order);

                            var options = {
                                "key": response.key_id,
                                "amount": amount * 100,
                                "currency": "INR",
                                "name": "Cam Cart",
                                "description": "Test Transaction",
                                "image": "https://example.com/your_logo",
                                "order_id": response.CreateOrder.id,
                                "handler": function (response) {
                                    console.log(response);
                                    $.ajax({
                                        type: 'POST',
                                        url: '/razorpay-payment-successful',
                                        data: JSON.stringify({
                                            razorpay_payment_id: response.razorpay_payment_id,
                                            razorpay_order_id: response.razorpay_order_id,
                                            orderId: Porduct_Order,
                                            Paid_Amount: amount * 100

                                        }),
                                        contentType: "application/json",
                                        success: function (response) {
                                            console.log('Payment Success');

                                            window.location.href = '/Order_Placed_Success';

                                        },
                                        error: function (xhr, status, error) {
                                            console.log('error');
                                        }
                                    });

                                    // alert(response.razorpay_payment_id);
                                    // alert(response.razorpay_order_id);
                                    // alert(response.razorpay_signature);
                                },
                                "prefill": {
                                    "name": "Gaurav Kumar",
                                    "email": "gaurav.kumar@example.com",
                                    "contact": "9000090000"
                                },
                                "notes": {
                                    "address": "Razorpay Corporate Office"
                                },
                                "theme": {
                                    "color": "#3399cc"
                                }
                            };
                            var rzp1 = new Razorpay(options);
                            rzp1.on('payment.failed', function (response) {
                                alert(response.error.code);
                                alert(response.error.description);
                                alert(response.error.source);
                                alert(response.error.step);
                                alert(response.error.reason);
                                alert(response.error.metadata.order_id);
                                alert(response.error.metadata.payment_id);
                            });
                            rzp1.open();
                        }
                    }
                });
            });
        });


        //     /// <!--============== *Checkout Payment methodes* ==============-->///












        
    //     $(document).ready(function () {
    //         $('.review_form').submit(function (event) {
    //             console.log("hiiiiiiiii");
    //             event.preventDefault();
    //             console.log("hiiiii");

    //             let productId = $(this).attr('data-product-id')
    //             console.log(productId);


                
              


    //             $.ajax({
    //                 type: 'POST',
    //                 url: '/addReview/' + productId,
    //                data:

    //                 success: function (response) {
    //                     // console.log("data:  ", data);
    //                     console.log("Response received:", response); // Debugging statement
    //                     console.log("Response received:", response.status);
    //                     if (response.success) {
    //                         window.location.href = "/review_product/"+productId;
    //                     } else {



    //                     }
    //                 }
    //             });
    //         });
    //     });


    });



