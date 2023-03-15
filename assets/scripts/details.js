const querySearch = document.location.search

const id = new URLSearchParams(querySearch).get("id")
Number.parseInt(id)

console.log(typeof id)

const {events} = data;

const eventos = events.map(event => {
    let aux = {}
    aux._id = event._id
    aux.image = event.image
    aux.name = event.name
    aux.date = event.date
    aux.description = event.description
    aux.category = event.category
    aux.place = event.place
    aux.capacity = event.capacity
    aux.assistance = event.assistance
    aux.price = event.price
    aux.estimate = event.estimate
    return aux
})
console.log(eventos)

const evento = eventos.find(evento => evento._id == id)
console.log(typeof evento.date)



const content = document.querySelector(".details")
content.innerHTML = `<img src=${evento.image} alt="">
<section class="card-details">
  <h2 class="color">${evento.name}</h2>
  <h5>Category</h5>
  <p id="category">${evento.category}</p>
  <h5>Description</h5>
  <p id="description">
    ${evento.description}
  </p>
  <h5>Place</h5>
  <p id="place">
    ${evento.place}
  </p>  
  <h5>Date:</h5>
  <p id="date">${evento.date}</p>
  <div id="precio-details">
    <h5>Price:</h5>
    <p id="price">$${evento.price}</p>
  </div>
</section>`;
console.log("data mayor")














