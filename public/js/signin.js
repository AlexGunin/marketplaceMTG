const formWrap = document.querySelector('.form-wrap');

formWrap.addEventListener('submit', login);

async function login(event) {
  event.preventDefault();
  const response = await fetch(`${window.location.origin}/user/signin`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(Object.fromEntries(new FormData(formWrap))),
  });
  const result = await response.json();
  if (result.message) {
    window.location.href = `${window.location.origin}/main`;
    console.log(result);
  } else {
    console.log(result.error);
  }
}
