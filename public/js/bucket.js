const bucketWrap = document.querySelector('.bucket-wrap');
const total = document.querySelector('.total-price');

function createCard({
  id, image, title, price, count,
}) {
  console.log(id);
  return `
    <div class="bucket-card" data-id="${id}">
    <div class="form-check">
      <input class="form-check-input"
             id="flexCheckDefault"
             type="checkbox"
             value="">
    </div>
    <div class="wrap-image">
      <img src="${image}">
    </div>
    <div class="bucket-card__info">
      <div class="descr">${title}</div>
      <div class="price">${price}</div>
      <div class="quantity">${count} шт</div>
    </div>
  </div>
  `;
}

document.addEventListener('DOMContentLoaded', (event) => {
  const bucket = JSON.parse(localStorage.getItem('bucket'));
  if (!bucket || bucket.length === 0) return;
  const bucketCards = bucket.map((card) => createCard(card));
  bucketWrap.innerHTML = bucketCards.join(' ');

  const allCheckInput = Array.from(bucketWrap.querySelectorAll('.form-check-input'));
  allCheckInput.forEach((card) => card.checked = true);
  updateTotal();
  bucketWrap.addEventListener('click', handleCheckBoxClick);

  // const orderBtn = document.querySelector('.bucket-info btn');
  // orderBtn.addEventListener('click', createOrder);
});

function handleCheckBoxClick(event) {
  if (event.target.classList.contains('form-check-input')) {
    updateTotal();
  }
}

function createOrder() {

}

function updateTotal() {
  const allCard = Array.from(bucketWrap.querySelectorAll('.bucket-card'));
  const choicedCard = allCard.filter((card) => card.querySelector('.form-check-input').checked === true);
  console.log(allCard, choicedCard);
  if (choicedCard.length === 0) {
    total.textContent = 'Итого: 0 Р';
  } else {
    const totalSum = choicedCard
      .map((card) => {
        const price = +card.querySelector('.price').textContent.trim();
        const quantity = +card.querySelector('.quantity').textContent.trim().replace(/\D/gi, '');
        console.log(quantity);
        return price * quantity;
      })
      .reduce((acc, cur) => acc + cur);
    total.textContent = `Итого: ${totalSum} Р`;
  }
}
