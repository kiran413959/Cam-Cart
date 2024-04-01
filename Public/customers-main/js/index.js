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
