const inputSearch = document.getElementById('search');
const buttonClear = document.querySelector('i.clear');
const buttonSearch = document.querySelector('i.search');
const gridLayout = document.querySelector('.grid-layout');
const spanCount = document.querySelector('span.count');
const searchWrap = document.querySelector('.search-wrap');
const logo = document.querySelector('.logo');
const ulNav = document.querySelector('ul.nav');
const citySelect = searchWrap.querySelector('.form-select');
buttonClear.addEventListener('click', () => {
  inputSearch.value = '';
});

document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('/main', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ title: '', city: '' }),
  });
  const result = await response.json();
  gridLayout.classList.add('appear');
  gridLayout.innerHTML = createHTML(result.allCards);
  gridLayout.addEventListener('click', (event) => {
    console.log(event.target);
    if (event.target.classList.contains('buy')) {
      addToBucket(event);
      updateBucket();
      createControl(event);
    } else if (event.target.classList.contains('plus') || event.target.classList.contains('minus')) {
      controlBucket(event);
    }
  });
  updateBucket();
  createCityOption();
  citySelect.addEventListener('change', (event) => {
    console.log(event.target.value);
  });
});

async function createCityOption() {
  citySelect.innerHTML = '';
  const response = await fetch('/main/city');
  const allCities = await response.json();
  citySelect.innerHTML = '<option selected value ="">Все города</option>';
  citySelect.innerHTML += allCities.map((city) => `<option value ="${city.title}">${city.title}</option>`).join(' ');
}

// inputSearch.addEventListener('input', async () => {
//   const response = await fetch('/main', {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json',
//     },
//     body: JSON.stringify({ query: inputSearch.value }),
//   });
//   const result = await response.json();
//   gridLayout.classList.add('disappear');
//   setTimeout(() => {
//     gridLayout.classList.remove('disappear');
//     gridLayout.classList.add('appear');
//     gridLayout.innerHTML = createHTML(result.allCards);
//   }, 500);
// });
buttonSearch.addEventListener('click', async () => {
  const response = await fetch('/main', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ title: inputSearch.value, city: citySelect.value }),
  });
  const result = await response.json();
  gridLayout.classList.add('disappear');
  setTimeout(() => {
    gridLayout.classList.remove('disappear');
    gridLayout.classList.add('appear');
    gridLayout.innerHTML = createHTML(result.allCards);
  }, 500);
});

function addToBucket(event) {
  const cardWrap = event.target.closest('.card-wrap');
  const { id } = cardWrap.dataset;
  const bucket = JSON.parse(localStorage.getItem('bucket'));
  const image = cardWrap.querySelector('.card-image').src;
  const title = cardWrap.querySelector('a.title > span').innerText.trim();
  const price = +cardWrap.querySelector('.price').textContent.replace(/[\D]/gi, '');
  if (bucket) {
    const index = bucket.findIndex((card) => +card.id === +id);
    if (index > -1) {
      bucket[index].count = bucket[index].count ? bucket[index].count + 1 : 1;
    } else {
      const newCard = {
        id,
        count: 1,
        image,
        title,
        price,
      };
      bucket.push(newCard);
    }
    localStorage.setItem('bucket', JSON.stringify(bucket));
  } else {
    const bucket = [{
      id,
      count: 1,
      image,
      title,
      price,
    }];
    localStorage.setItem('bucket', JSON.stringify(bucket));
  }
}

function createControl(event) {
  const { target } = event;
  const buyWrap = event.target.closest('.buy-wrap');
  const { id } = event.target.closest('.card-wrap').dataset;
  const bucket = localStorage.getItem('bucket');
  target.classList.add('disappear', 'events-none');
  setTimeout(() => {
    target.remove();
  });
  buyWrap.innerHTML = '<div class = "control-wrap"><button class = "btn btn-success minus">-</button><span class="card-count">1 шт</span></span><button class = "btn btn-success plus">+</button></div>';
}

function updateCount(parent, newValue) {
  const span = parent.querySelector('span.card-count');
  span.innerHTML = `${newValue} шт`;
}

function controlBucket(event) {
  const buyWrap = event.target.closest('.buy-wrap');
  const { id } = event.target.closest('.card-wrap').dataset;
  const bucket = JSON.parse(localStorage.getItem('bucket'));
  const indexCard = bucket.findIndex((card) => card.id === id);
  const controlWrap = event.target.closest('.control-wrap');
  if (event.target.classList.contains('minus')) {
    bucket[indexCard].count--;
    updateCount(buyWrap, bucket[indexCard].count);
    if (bucket[indexCard].count === 0) {
      bucket.splice(indexCard, 1);
      controlWrap.classList.add('disappear', 'events-none');
      setTimeout(() => {
        controlWrap.remove();
        buyWrap.classList.add('appear');
        buyWrap.innerHTML = '<button class = "btn btn-success buy">В корзину</button>';
      });
    }
  } else if (event.target.classList.contains('plus')) {
    bucket[indexCard].count++;
    updateCount(buyWrap, bucket[indexCard].count);
  }
  localStorage.setItem('bucket', JSON.stringify(bucket));
  updateBucket();
}

function createHTML(arr) {
  const options = {
    month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric',
  };
  const bucket = JSON.parse(localStorage.getItem('bucket')) ?? [];
  const allCards = arr.map((card) => {
    const data = new Date(card.createdAt);
    const storageIndex = bucket.findIndex((item) => +item.id === +card.id);
    let buyBtnHTML = '';
    if (storageIndex > -1) {
      buyBtnHTML = `<div class = "control-wrap"><button class = "btn btn-success minus">-</button><span class="card-count">${bucket[storageIndex].count} шт</span></span><button class = "btn btn-success plus">+</button></div>`;
    } else {
      buyBtnHTML = `<button class="btn btn-success buy"
                           type="button">В корзину
                                </button>`;
    }

    return `
    <div class="card-wrap" data-id="${card.id}">
      <a class="link-card"
         href="/card/${card.id}">
        <div class="image-wrap">
          <img alt="Card"
               class="card-image"
               src="${card.image}">
        </div>
      </a>
      <div class="info">
        <a class="title"
           href="/card/${card.id}">
          <span>${card.title}</span>
        </a>
        <span class="price">${card.price} Р</span>
        <span>${card.City.title}</span>
        <span>${data.toLocaleDateString('ru', options)}</span>
      </div>
      <div class="buy-wrap">
            ${buyBtnHTML}
      </div>
      <div class="buyer"><a href="/user/profile/{{this.User.id}}">${card.User.name}</a></div>
    </div>
  `;
  });

  return allCards.join(' ');
}

function updateBucket() {
  const bucket = JSON.parse(localStorage.getItem('bucket'));
  if (bucket) {
    if (bucket.length === 0) {
      spanCount.textContent = 0;
    } else spanCount.textContent = bucket.map((card) => +card.count).reduce((acc, cur) => acc + cur);
  }
}
