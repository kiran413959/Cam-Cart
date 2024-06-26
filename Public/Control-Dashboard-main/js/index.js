
const { Chart } = await import('chart.js');



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

// Fill orders in table
Orders.forEach(order => {
  const tr = document.createElement('tr');

  const trContent = `
  <td>${order.productName}</td>
  <td>${order.productNumber}</td>
  <td>${order.paymentStatus}</td>
  <td class="${
    order.shipping === 'Declined'
      ? 'danger'
      : order.shipping === 'Pending'
      ? 'warning'
      : 'primary'
  }">${order.shipping}</td>
  <td class="primary">Details</td>
  `;

  tr.innerHTML = trContent;
  document.querySelector('table tbody').appendChild(tr);
});

// Date setup
document.getElementById('date-picker').valueAsDate = new Date();




// let monthSale= document.getElementById("salesChart");


// let saleChart=new Chart(monthSale,{
// type:'bar',
// data:{
// labels:['1st Week','2nd Week','3rd Week','4th Week'],
// datasets:[{
// label:"Monthly Sale",
// data:[
//   5000000,
//   4000000,
//   3000000,
//   2500000,

// ],
// backgroundColor:'rgba(75,192,192,0.4)',
// borderColor:['rgb(75,192,192)'],
// }]},
// options:{

// }
// })



