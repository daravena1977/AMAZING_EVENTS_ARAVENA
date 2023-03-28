const mostrarCards = (arrayData) => {
  const contenedor = document.querySelector(".cards-section");
  contenedor.innerHTML = `<template id="template-card">
  <div class="card" style="width: 18rem">
    <img src="" class="card-img-top" alt="...">
    <div class="card-body">
      <section>
        <span></span>
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

  const fragment = document.createDocumentFragment();
  arrayData.forEach((event) => {
    const { image, name, price, description, _id, category } = event;
    template.querySelector("span").textContent = category
    template.querySelector("img").setAttribute("src", image);
    template.querySelector(".card-title").textContent = name;
    template.querySelector(".card-body section p").textContent = description;
    template.querySelector(".price p").textContent = `${price} USD`;
    template
      .querySelector("a")
      .setAttribute("href", `./details.html?id=${_id}`);

    let cloneCard = template.cloneNode(true);

    fragment.appendChild(cloneCard);
  });
  contenedor.appendChild(fragment);
  return contenedor;
};

const filtrarCategorias = (arrayData) => {
  const categorias = new Set(arrayData.map((event) => event.category));
  return categorias;
};

const mostrarCategorias = (filtrarCategorias, array) => {
  let arrayCategorias = filtrarCategorias(array);
  const contenedorCategorias = document.getElementById("check-category");
  const templateCheck = document.getElementById("template-category").content;
  const fragmentCategorias = document.createDocumentFragment();
  arrayCategorias.forEach((categoria) => {
    templateCheck.querySelector("input").setAttribute("value", categoria);
    templateCheck.querySelector("input").setAttribute("id", categoria);
    templateCheck.querySelector("label").setAttribute("for", categoria);
    templateCheck.querySelector("label").textContent = categoria;
    let clonarCategoria = templateCheck.cloneNode(true);
    fragmentCategorias.appendChild(clonarCategoria);
  });

  contenedorCategorias.appendChild(fragmentCategorias);
};

const categoriasChecked = () => {
  const allCheckbox = document.querySelectorAll(".valores-check");
  let arrayCheckbox = Array.from(allCheckbox);  
  let checkeados = arrayCheckbox.filter((chek) => chek.checked);
  let categoriasCheckeadas = checkeados.map((check) => check.value);  
  return categoriasCheckeadas;
};

const filtrarPorNombre = (arrayData, texto) => {
  if (texto == "") {
    return arrayData;
  }
  let filtroPoNombre = arrayData.filter((event) =>
    event.name.toLowerCase().includes(texto.toLowerCase())
  );  
  return filtroPoNombre;
};

const filtrarPorCategorias = (arrayData, categorias) => {
  if (categorias.length === 0) {
    return arrayData;
  }
  let arrayPorCategoria = arrayData.filter((event) =>
    categorias.includes(event.category)
  );
  return arrayPorCategoria;
};

const noEncontrado = () => {  
  const cont = document.querySelector(".cards-section");
  cont.innerHTML = `<div id="container-warning">
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-x-octagon-fill" viewBox="0 0 16 16">
  <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
</svg>
    <h2>This event not found</h2>
</div>`;
};
