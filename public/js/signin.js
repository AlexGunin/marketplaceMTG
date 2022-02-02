const formWrap = document.querySelector('.form-wrap')
const loginBtn = document.querySelector('.btn-success')


formWrap.addEventListener('submit', login)

async function login(event) {
  event.preventDefault()
  const response = fetch('http://localhost:3000/user/signin', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(Object.fromEntries(new FormData(formWrap)))
  })
  const result = await response.json()
  console.log(result)
}


