const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#close-btn');
const themeToggler = document.querySelector('.theme-toggler');


// Show sidebar
menuBtn.addEventListener('click', () => {
  sideMenu.style.display = 'block';
});

// Close sidebar
closeBtn.addEventListener('click', () => {
  sideMenu.style.display = 'none';
});

// Change theme
themeToggler.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme-variables');

  themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
  themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
});



document.addEventListener('DOMContentLoaded', function() {
  const eyeBtns = document.querySelectorAll(".eye_btn");
  const closeBtns = document.querySelectorAll(".close_btn");

  // Show modal when eye button is clicked
  eyeBtns.forEach(function(eyeBtn) {
    eyeBtn.addEventListener('click', function() {
      const productId = this.getAttribute('data-product-id');
      const orderProduct = document.querySelector(`.order_product[data-product-id="${productId}"]`);
      if (orderProduct) {
        orderProduct.style.visibility = 'visible';
        console.log("content visible");
      } else {
        console.error(`Product modal not found for product ID: ${productId}`);
      }
    });
  });

  // Hide modal when close button is clicked
  closeBtns.forEach(function(closeBtn) {
    closeBtn.addEventListener('click', function() {
      const orderProduct = this.closest('.order_product');
      orderProduct.style.visibility = 'hidden';
      console.log("content hidden");
    });
  });
});





// document.addEventListener('DOMContentLoaded', function() {
//   const eyeBtn = document.getElementById("eye_btn");
//   const orderproduct = document.querySelector('.order_product');
//   const closeBtn = document.querySelector(".close_btn");

//   // Show modal when eye button is clicked
//   eyeBtn.addEventListener('click', function() {
//     orderproduct.style.visibility = 'visible';

//     console.log("content visible");
//   });

//   // Hide modal when close button is clicked
//   closeBtn.addEventListener('click', function() {

//     orderproduct.style.visibility = 'hidden';
//     console.log("content hidden");

//   });
// });




// // Fill orders in table
// Orders.forEach(order => {
//   const tr = document.createElement('tr');

//   const trContent = `
//   <td>${order.productName}</td>
//   <td>${order.productNumber}</td>
//   <td>${order.paymentStatus}</td>
//   <td class="${
//     order.shipping === 'Declined'
//       ? 'danger'
//       : order.shipping === 'Pending'
//       ? 'warning'
//       : 'primary'
//   }">${order.shipping}</td>
//   <td class="primary">Details</td>
//   `;

//   tr.innerHTML = trContent;
//   document.querySelector('table tbody').appendChild(tr);
// });

// Date setup
document.getElementById('date-picker').valueAsDate = new Date();






