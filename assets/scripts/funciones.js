const mostrarCards = (arrayData) => {
  const contenedor = document.querySelector(".cards-section");
  contenedor.innerHTML = `<template id="template-card">
  <div class="card" style="width: 18rem">
    <img src="" class="card-img-top" alt="...">
    <div class="card-body">
      <section>
        <h5 class="card-title"></h5>
        <p class="card-text">
            
        </p>
      </section>
      <div class="price-section">
        <section class="price">
          <h6>Price:</h6>
          <p></p>
        </section>
          <a href="./details.html" class="btn btn-primary">Details</a>
      </div>
    </div>
  </div>
</template>`;
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



const noEncontrado = () => {
  console.log("pinte no encontrado");
  const cont = document.querySelector(".cards-section");
  cont.innerHTML = `<div id="container-warning">
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-x-octagon-fill" viewBox="0 0 16 16">
  <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
</svg>
    <h2>This event not found</h2>
</div>`;
};
