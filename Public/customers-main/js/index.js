const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#close-btn');
const themeToggler = document.querySelector('.theme-toggler');



document.addEventListener("DOMContentLoaded", function () {
  const profileButton = document.querySelectorAll(".profile_view");
  const closeBtns = document.querySelectorAll(".profile_close");

  // Show modal when eye button is clicked
  profileButton.forEach(function (profile) {
    profile.addEventListener("click", function () {
      const profileId = this.getAttribute("data-profile-id");
      console.log(profileId);

      const show = document.querySelector(
        `.coustomers[data-profile-id="${profileId}"]`
      );
      console.log(show, "show is here in the loop");

      if (show) {
        show.style.display = "block";
        console.log("content visible");
      } else {
        console.error(`profile modal not found for profile ID: ${profileId}`);
      }
    });
  });

  closeBtns.forEach(function (closeBtn) {
    closeBtn.addEventListener("click", function () {
      const profile = this.closest(".coustomers");
      profile.style.display = "none";
      console.log("content hidden");
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
