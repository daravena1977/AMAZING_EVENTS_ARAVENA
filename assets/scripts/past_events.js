const cards = document.querySelector(".cards-section");
const template = document.querySelector("#template-card").content;
const fragment = document.createDocumentFragment();
const { events } = data;
const { currentDate } = data;
const [{image, name, price, description}] = events;

for (let event of events) {
  const {date} = event; 
  if (date < currentDate) {
    crearCardsFragment(event, template, fragment);
  }
  
};

cards.appendChild(fragment);
