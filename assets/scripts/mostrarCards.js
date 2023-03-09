const mostrarCards = (contenedor, arrayData, template) => {
  const { events } = arrayData;
  const fragment = document.createDocumentFragment();
  events.forEach((event) => {
    const { image, name, price, description } = event;
    template.querySelector("img").setAttribute("src", image);
    template.querySelector(".card-title").textContent = name;
    template.querySelector(".card-body section p").textContent = description;
    template.querySelector(".price p").textContent = `$${price}`;

    let cloneCard = template.cloneNode(true);

    fragment.appendChild(cloneCard);
  });
  contenedor.appendChild(fragment);
};

const dataPorFecha = (arrayData, EsMayor, fecha) => {
  const { events } = arrayData;
  if (EsMayor == true) {
    dataFilter.events = events.filter((event) => event.date > fecha);
  } else {
    dataFilter.events = events.filter((event) => event.date < fecha);
  }
};
