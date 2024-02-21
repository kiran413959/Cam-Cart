// async function toggleWishlist(event) {
//     event.preventDefault();
//     const heart = event.currentTarget.querySelector('.bi-heart');
//     const productId = event.currentTarget.getAttribute('data-product-id');
//     const active = heart.classList.contains('.bi-heart-fill');
//     if (productId) {
//         try {
//             const response = await fetch(`/Whishlist/add/${productId}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ active: active.toString() }),
//             });
//             if (response.status === 401) {
//                 window.location.href = '/login';
//                 return;
//             }
//             if (response.ok) {
//                 heart.classList.toggle('active');
//                 // updateWishlistCount();
//             } else {
//                 console.log(Error `toggling wishlist: ${response.statusText}`);
//             }
//         } catch (error) {
//             console.error('Error toggling wishlist:', error);
//         }
//     }
// }








// // document.addEventListener("DOMContentLoaded", function() {
// //     document.querySelector('.bi-heart').on('click', function(event) {
// //         event.preventDefault();
        
        
// //         var productId = document.querySelector(this).attr('data-product-id');
        
// //         console.log(productId);
// //         let e = document.querySelector(this);

// //         var active = e.hasClass("bi-heart"); 
// //         console.log(active);
        
// //         if (productId) {
// //             document.querySelector.ajax({
// //                 type: 'POST',
// //                 url: '/Whishlist/add/'+productId,
// //                 data: {
// //                     productId: productId,
// //                     active: active,
// //                 },

// //                 success: function(response) {
// //                     console.log(response);
// //                     if (response.ok) {
// //                         e.attr("class", "bi-heart-fill")
                    
// //                         // updateWishlistCount();
// //                     } else {
// //                         console.log(`Error toggling wishlist: document.querySelector{response.statusText}`);
// //                     }
// //                 },
// //                 error: function(error) {
// //                     console.error('Error toggling wishlist:', error);
// //                 }
// //             });
// //         }
// //     });
// // });





document.addEventListener("DOMContentLoaded", async() => {
    try{
        const response = await fetch ( "/wishlist/get" );
        const data = await response.json ();

        const wishlist = data.products

        
    }
})