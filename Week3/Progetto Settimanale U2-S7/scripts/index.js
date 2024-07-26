const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNjliNGYyNjBjYzAwMTVjYzBlMDgiLCJpYXQiOjE3MjE5ODU0NjEsImV4cCI6MTcyMzE5NTA2MX0.zC95Q7BdmpuMdetAEQIGHkRoz34ML2Kj2T_zgqfr4WQ'

const getProd = function(){
    fetch("https://striveschool-api.herokuapp.com/api/product", {
    headers: {
    "Authorization": "Bearer " + key
    }
    })
    .then((resp) => {
        console.log(resp)
        if(resp.ok)
            return resp.json()
        else 
            throw new Error("errore nella chiamata della api")
      })
      .then((data) => {
        creatCard(data)

      })
      .catch((err) => {
        console.log("Error", err)
      })
}
const creatCard = function(prods){
    console.log('Products',prods)
    prods.forEach(prod => {
        console.log('Prod',prod)
        const Card = `<div class="card my-2">
        <img src="${prod.imageUrl}" class="card-img-top" alt="Product Image">
        <div class="card-body">
        <h5 class="card-title">${prod.name}</h5>
        <p class="card-text"><small class="text-body-secondary">${singleProd.brand}</small></p>
        <p class="card-text">${prod.description}</p>
        <p class="card-text">${singleProd.description}</p>
          
        <a href="./details.html?eventId=${prod._id}" class="btn text-decoration-none w-100 btn-outline-dark">View More</a>
        </div>
        </div>
        </div>`
        
        const HTMLrow = document.getElementById('events-row')
        console.log(HTMLrow)
        HTMLrow.innerHTML = HTMLrow.innerHTML + Card
    });
}

const init = function(){
    getProd()
}

window.addEventListener('load', function () {
    init();
});