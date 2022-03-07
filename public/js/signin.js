const formWrap = document.querySelector('.form-wrap');
const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
formWrap.addEventListener('submit', login);

function checkInputs() {
  const form = new FormData(formWrap);
  const errors = [];
  for (const [key, value] of form) {
    if (value === '') {
      errors.push(key);
    }
  }
  return errors;
}

function formClearClassError() {
  const allInputs = formWrap.querySelectorAll('input');
  allInputs.forEach((input) => input.classList.remove('error'));
}

async function login(event) {
  event.preventDefault();
  formClearClassError();
  const errors = checkInputs();
  if (errors.length === 0) {
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
      alert(result.error, 'danger');
    }
  } else {
    errors.forEach((error) => {
      const inputError = formWrap.querySelector(`input[name="${error}"]`);
      inputError.classList.add('error');
      inputError.value = '';
    });
  }
}

function alert(message, type) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `<div class="alert alert-${type} alert-dismissible" role="alert">${message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
  alertPlaceholder.append(wrapper);
}
