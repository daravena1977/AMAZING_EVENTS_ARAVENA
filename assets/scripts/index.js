const cards = document.querySelector(".cards-section");
const template = document.querySelector("#template-card").content;
const fragment = document.createDocumentFragment();
const { events } = data; 


for (let event of events) {  
  crearCardsFragment(event, template, fragment)
};

cards.appendChild(fragment);
