const mostrarCards = (arrayData) => {
  const contenedor = document.querySelector(".cards-section");
  const template = document.querySelector("#template-card").content;
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
  return contenedor;
};

const dataPorFecha = (arrayData, EsMayor, fecha) => {
  const { events } = arrayData;
  if (EsMayor == true) {
    dataFilter.events = events.filter((event) => event.date > fecha);
  } else {
    dataFilter.events = events.filter((event) => event.date < fecha);
  }
};

const crearArrayCategory = (arrayData, newArray) => {
  const { events } = arrayData;

  events.forEach((event) => {
    const { category } = event;
    if (newArray.includes(category) == false) {
      newArray.push(category);
    }
  });
};

const crearElementoCheck = (newArray) => {
  const contenedor = document.getElementById("check-category");
  const templateCheck = document.getElementById("template-category").content;
  const fragmentCategory = document.createDocumentFragment();

  newArray.forEach((category) => {
    templateCheck.querySelector("input").setAttribute("value", category);
    templateCheck.querySelector("input").setAttribute("id", category);
    templateCheck.querySelector("label").setAttribute("for", category);
    templateCheck.querySelector("label").textContent = category;
    let cloneCategory = templateCheck.cloneNode(true);
    fragmentCategory.appendChild(cloneCategory);
  });

  contenedor.appendChild(fragmentCategory);
};

