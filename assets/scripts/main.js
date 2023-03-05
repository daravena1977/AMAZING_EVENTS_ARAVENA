/* const cards = document.querySelectorAll('.card .card-title');

const { events } = data;

for (let event of events) { 
  let {name} = event;    
  console.log(name);  
}

console.log(cards.textcontent); */

/* CREA ELEMENTO HTML PARA CARDS */

/* class Card extends HTMLElement {
  
  connectedCallback() {
    const container = document.createElement('div');
    container.classList.add('cards-section col d-flex flex-wrap justify-content-center gap-3');
  }
  
} */

const cards = document.querySelector(".cards-section"),
  template = document.querySelector("#template-card").content,
  fragment = document.createDocumentFragment(),
  { events } = data;

  

events.forEach((element) => {
  template.querySelector("div").setAttribute("class","card");
  template.querySelector("div").setAttribute("style", "width: 18rem");
  template.querySelector("img").setAttribute("src", element.image);
  template.querySelector("img").setAttribute("class", "card-img-top");
  template.querySelector("img").setAttribute("alt", "...");
  template.querySelector(".card div").setAttribute("class", "card-body");
  template.querySelector(".card-body h5").setAttribute("class","card-title");
  template.querySelector(".card-title").textContent = element.name;
  template.querySelector(".card-body section p").textContent = element.description;
  template.querySelector(".card-body div").setAttribute("class","price-section");
  template.querySelector(".price-section section").setAttribute("class", "price");
  template.querySelector(".price p").textContent = element.price;
  template.querySelector(".price-section a").setAttribute("href", "./details.html"); 
  template.querySelector(".price-section a").setAttribute("class", "btn btn-primary");
  template.querySelector(".price-section a").textContent = 'Details';




  let clone = document.importNode(template, true);
  fragment.appendChild(clone);
});

console.log(template);

cards.appendChild(fragment);
