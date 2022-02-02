const formWrap = document.querySelector('.form-wrap');

formWrap.addEventListener('submit', login);

async function login(event) {
  event.preventDefault();
  const response = await fetch('http://localhost:3000/user/signin', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(Object.fromEntries(new FormData(formWrap))),
  });
  const result = await response.json();
  console.log(result);
  if (result.message) {
    window.location.href = 'http://localhost:3000/main';
  }
  console.log(result);
}
