let dataEvents;

const obtenerEventos = async () => {
  try {
    const response = await fetch(
      "https://mindhub-xj03.onrender.com/api/amazin"
    );
    if (response.status === 404) {
      const response = await fetch("http://127.0.0.1:5500/assets/api/amazing.json")
      dataEvents = await response.json()
    }
    if (response.status === 200) {
      dataEvents = await response.json();
    }
    
    console.log(response);
    console.log(dataEvents);

    const { events } = dataEvents;

    const contentCheckbox = document.getElementById("check-category");
    const inputSearch = document.getElementById("input-search");
    const botonSearch = document.querySelector(".search-category input");

    mostrarCards(events);

    filtrarCategorias(events);

    mostrarCategorias(filtrarCategorias, events);

    inputSearch.addEventListener("input", () => {
      if (inputSearch.value !== "") {
        botonSearch.style.width = "300px";
      }
    });

    const filtrarCombinado = () => {
      let filtradosPorNombre = filtrarPorNombre(events, inputSearch.value);
      let checkeados = categoriasChecked();
      let filtradosPorCategoria = filtrarPorCategorias(
        filtradosPorNombre,
        checkeados
      );
      if (filtradosPorCategoria.length == 0) {
        return noEncontrado();
      }
      if (filtradosPorCategoria.length > 0) {
        mostrarCards(filtradosPorCategoria);
      }
    };

    inputSearch.addEventListener("input", filtrarCombinado);

    contentCheckbox.addEventListener("change", filtrarCombinado);
  } catch (error) {
    console.log(error);
  }
};

obtenerEventos();
