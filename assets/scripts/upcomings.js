const cards = document.querySelector(".cards-section");
const templateCard = document.querySelector("#template-card").content;

let fechaEsMayor = true;
const { currentDate } = data;

const dataFilter = {
  events: [],
};

dataPorFecha(data, fechaEsMayor, currentDate);

mostrarCards(cards, dataFilter, templateCard);

let newArrayCategory = []

crearArrayCategory(data);

crearElementoCheck(newArrayCategory);
