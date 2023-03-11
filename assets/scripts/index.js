

mostrarCards(data);

let newArrayCategory = [];

crearArrayCategory(data, newArrayCategory);

crearElementoCheck(newArrayCategory);

let checkeados = [];

const checkCategory = document.querySelectorAll(".valores-check");
checkCategory.forEach((check) => {
  check.addEventListener("click", () => {
    if (check.checked == true) {
      checkeados.push(check.value);
    } else {
      checkeados = checkeados.filter((element) => element !== check.value);
    }
  });
});

const contentCheckbox = document.getElementById("check-category");
contentCheckbox.addEventListener("change", () => {
  filtrarCategorias(data);
});

const filtrarCategorias = (array) => {
  const contenedor = document.querySelector(".cards-section");
  const { events } = array;
  let dataFiltrada = {
    events: [],
  };
  events.forEach((event) => {
    const { category } = event;
    const { _id } = event;
    if (
      checkeados.includes(category) &&
      dataFiltrada.events.includes(_id) == false
    ) {
      dataFiltrada.events.push(event);
    }
  });
  if (checkeados.every((check) => check.checked == false)) {
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
    mostrarCards(data);
  } else {
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
    mostrarCards(dataFiltrada);
  }
};
