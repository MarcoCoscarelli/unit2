class Product {
  constructor(_name, _description, _brand, _imgUrl, _price) {
    this.name = _name
    this.description = _description
    this.brand = _brand
    this.imageUrl = _imgUrl
    this.price = _price
  }
}



const prodID = new URLSearchParams(location.search).get('eventId')
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNjliNGYyNjBjYzAwMTVjYzBlMDgiLCJpYXQiOjE3MjE5ODU0NjEsImV4cCI6MTcyMzE5NTA2MX0.zC95Q7BdmpuMdetAEQIGHkRoz34ML2Kj2T_zgqfr4WQ'
const URL = "https://striveschool-api.herokuapp.com/api/product/"
let URLtoUse = ''
let method = ''
if (prodID) {
  method = 'PUT'
  URLtoUse = URL + prodID
}
else {
  method = 'POST'
  URLtoUse = URL
}

if (prodID) {
  fetch(URLtoUse + prodID, {
    headers: {
      "Authorization": "Bearer " + key
    }
  }).then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('errore')
    }
  })
    .then((prod) => {
      console.log('PROD', prod)
      document.getElementById('name').value = prod.name
      document.getElementById('description').value = prod.description
      document.getElementById('brand').value = prod.brand
      document.getElementById('imgUrl').value = prod.imgUrl
      document.getElementById('price').value = prod.price
    })
    .catch((err) => {
      console.log(err)
    })
}

const eventForm = document.getElementById('product-form')
console.log(eventForm)
eventForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const nameValue = document.getElementById('name').value
  const descriptionValue = document.getElementById('description').value
  const priceValue = document.getElementById('price').value
  const brandValueInput = document.getElementById('brand').value
  const imgUrlValueInput = document.getElementById('imgUrl').value

  console.log(nameValue, descriptionValue, priceValue, brandValueInput, imgUrlValueInput)

  const newProd = new Product(nameValue, descriptionValue, brandValueInput, imgUrlValueInput, priceValue)

  console.log(newProd)
  function post() {
    fetch(URLtoUse, {
      method: method,
      body: JSON.stringify(newProd),
      headers: {
        "Authorization": "Bearer " + key,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          alert('PRODOTTO SALVATO!')
          location.assign("./index.html");
        } else {
          alert('ERRORE NEL SALVATAGGIO!')
          throw new Error('Errore nel salvataggio del prodotto')
        }
      })
      .catch((err) => {
        console.log('ERRORE', err)
      })


  }

  post()

})