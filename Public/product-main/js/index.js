const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#close-btn');
const themeToggler = document.querySelector('.theme-toggler');




let productId = editButton.getAttribute('data-product-id')

console.log(productId," productId is here");

let show = document.querySelector('.');
console.log(show, "   is here");

document.addEventListener('DOMContentLoaded', function() {
  const editButton = document.querySelectorAll(".edit");
  const closeBtns = document.querySelectorAll(".product_close");

  // Show modal when eye button is clicked
  editButton.forEach(function(eyeBtn) {
    eyeBtn.addEventListener('click', function() {
      const productId = this.getAttribute('data-product-id');
      const show = document.querySelector(`.update_view[data-product-id="${productId}"]`);
      if (show) {
        show.style.display = 'block';
        console.log("content visible");
      } else {
        console.error(`Product modal not found for product ID: ${productId}`);
      }
    });
  });
})




close.addEventListener('click', () => {
  show.style.display = 'none';
})


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




