const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

// let productId = editButton.getAttribute('data-product-id')

// console.log(productId," productId is here");

document.addEventListener("DOMContentLoaded", function () {
  const editButton = document.querySelectorAll(".edit");
  const closeBtns = document.querySelectorAll(".product_close");

  // Show modal when eye button is clicked
  editButton.forEach(function (eyeBtn) {
    eyeBtn.addEventListener("click", function () {
      const productId = this.getAttribute("data-product-id");
      console.log(productId);

      const show = document.querySelector(
        `.update_view[data-product-id="${productId}"]`
      );
      console.log(show, "show is here in the loop");

      if (show) {
        show.style.display = "block";
        console.log("content visible");
      } else {
        console.error(`Product modal not found for product ID: ${productId}`);
      }
    });
  });

  closeBtns.forEach(function (closeBtn) {
    closeBtn.addEventListener("click", function () {
      const product = this.closest(".update_view");
      product.style.display = "none";
      console.log("content hidden");
    });
  });
});

// Show sidebar
menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
});

// Close sidebar
closeBtn.addEventListener("click", () => {
  sideMenu.style.display = "none";
});

// Change theme
themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme-variables");

  themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
  themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
});

/// product delete////

document.addEventListener("DOMContentLoaded", function () {
  const delete_Button = document.querySelectorAll(`.delete`);
  delete_Button.forEach(function (delete_Product) {
    delete_Product.addEventListener("click", async function (event) {
      console.log(delete_Button);
      event.preventDefault();
      const productId = this.getAttribute("data-product-id");
      console.log(productId);
      const response = await fetch("/delete_Product/" + productId, {
        method: "POST",
      });

      if (response) {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Product has been deleted.",
              icon: "success",
            }).then(() => window.location.reload());
          }
        });
        console.log(response.message);
      } else {
        alert("Failed to Delete");
      }

      console.log(response);
    });
  });
});



/// category delete ////

document.addEventListener('DOMContentLoaded', function() {
  const delete_Button = document.querySelectorAll(`.delete_category`);
  delete_Button.forEach(function(delete_category){
  delete_category.addEventListener( 'click', async function(event) {
    console.log(delete_Button);
    event.preventDefault(); 
    const categoryId = this.getAttribute('data-category-id');
    console.log(categoryId);
    const response = await fetch( `/delete_Category/${categoryId}`,{
      method:'POST'
    }) 

    if(response){
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Category has been deleted.",
            icon: "success",
          }).then(()=> window.location.reload())
        }
      });
      console.log(response.message);
    }else{
      alert("Failed to Delete");

    }


    console.log(response);
  
    })
  })

  
  })



  //// Brand Delete //////


  document.addEventListener('DOMContentLoaded', function() {
    const delete_Button = document.querySelectorAll(`.delete_brand`);
    delete_Button.forEach(function(delete_brand){
    delete_brand.addEventListener( 'click', async function(event) {
      console.log(delete_Button);
      event.preventDefault(); 
      const brandId = this.getAttribute('data-Brand-id');
      console.log(brandId);
      const response = await fetch( `/delete_Brand/${brandId}`,{
        method:'POST'
      }) 
  
      if(response){
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Brand has been deleted.",
              icon: "success",
            }).then(()=> window.location.reload())
          }
        });
        console.log(response.message);
      }else{
        alert("Failed to Delete");
  
      }
  
  
      console.log(response);
    
      })
    })
  
    
    })
  