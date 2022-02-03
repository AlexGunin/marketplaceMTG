const formWrap = document.querySelector('.form-wrap')

formWrap.addEventListener('submit', registration)


async function registration(event) {
  event.preventDefault()
  const response = await fetch('http://localhost:3000/user/signup', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(Object.fromEntries(new FormData(formWrap)))
  })
  const result = await response.json()
  console.log(result)
}


