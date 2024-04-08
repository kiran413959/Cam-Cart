const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#close-btn');
const themeToggler = document.querySelector('.theme-toggler');


document.addEventListener("DOMContentLoaded", function () {
  const profileButtons = document.querySelectorAll(".profile_view");
  const closeButtons = document.querySelectorAll(".profile_close");

  profileButtons.forEach(function (profile) {
      profile.addEventListener("click", function () {
          const profileId = this.getAttribute("data-profile-id");
          const show = document.querySelector(
              `.coustomers[data-profile-id="${profileId}"]`
          );

          if (show) {
              show.style.display = "block";
          } else {
              console.error(`Profile modal not found for profile ID: ${profileId}`);
          }
      });
  });

  closeButtons.forEach(function (closeBtn) {
      closeBtn.addEventListener("click", function () {
          const profile = this.closest(".coustomers");
          if (profile) {
              profile.style.display = "none";
          } else {
              console.error("Profile section not found to hide.");
          }
      });
  });
});

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



// Date setup
document.getElementById('date-picker').valueAsDate = new Date();




// block user

document.addEventListener("DOMContentLoaded", function () {

    const block_user = document.querySelectorAll( ".block");

    block_user.forEach(function (user) {
       user.addEventListener('click',async function(event){
           event.preventDefault();

           const userId = this.getAttribute('data-profile-id')
           console.log(userId);

        const response= await fetch ('/block_user/'+ userId,{
            method:"POST",
        })

        console.log(response);

        if(response.status==401){
            Swal.fire("User already Blocked!");
        }


        else if(response.status == 200){
            Swal.fire({
                title: "Are you sure?",
                text: "You can Unblock  the User!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "block user !"
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: "Blocked!",
                    text: "User has been Blocked.",
                    icon: "success"
                  });
                }
              });

              console.log(response);
              
        }else{
            console.log('erreur');
        }


       })
    })





} );












// Unblock user

document.addEventListener("DOMContentLoaded", function () {

    const Unblock_user = document.querySelectorAll( ".unblock");
    

    Unblock_user.forEach(function (user) {
       user.addEventListener('click',async function(event){
           event.preventDefault();

           const userId = this.getAttribute('data-profile-id')
           console.log(userId);

        const response= await fetch ('/unblock_user/'+userId,{
            method:"POST",
        })

        if(response.status==401){
            Swal.fire("User already Unblocked!");
        }


        else if(response.status==200){
            Swal.fire({
                title: "Are you sure?",
                text: "You can block  the User!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "block user !"
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: "Unblocked!",
                    text: "User has been Unblocked.",
                    icon: "success"
                  });
                }
              });

              console.log(response);
              
        }else{
            console.log('erreur');
        }


       })
    })





} );