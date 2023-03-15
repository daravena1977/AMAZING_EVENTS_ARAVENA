let fechaEsMayor = true;
const { currentDate } = data;

const dataFilter = {
  events: [],
};

dataPorFecha(data, fechaEsMayor, currentDate);

mostrarCards(dataFilter);

let dataFiltrada = {
  events: [],
};

let guardarData = {
  events: [],
};

const { events } = dataFiltrada;

let newArrayCategory = []

crearArrayCategory(data, newArrayCategory);

crearElementoCheck(newArrayCategory);

let checkeados = [];

const allCheckbox = document.querySelectorAll(".valores-check");

allCheckbox.forEach((check) => {
  check.addEventListener("click", () => {
    if (check.checked == true) {
      checkeados.push(check.value);
    } else {
      checkeados = checkeados.filter((element) => element !== check.value);
    }
  });  
});


const contentCheckbox = document.getElementById("check-category");
const inputSearch = document.getElementById("input-search");
const botonSearh = document.querySelector(".search-category input")

let filtroPorTexto = false;
let filtroPorCheckbox = false;

contentCheckbox.addEventListener("change", () => {
  filtroPorCheckbox = true;
  if (filtroPorTexto == false) {
    filtrarPorCategorias(dataFilter);
    if (dataFiltrada.events.length == 0) {
      noEncontrado();
      dataFiltrada.events = guardarData.events;
    } else {
      mostrarCards(dataFiltrada);
    }
  } else {
    filtrarPorCategorias(dataFiltrada);
    if (dataFiltrada.events.length == 0) {
      noEncontrado();
      dataFiltrada.events = guardarData.events;
    } else {
      mostrarCards(dataFiltrada);
    }
  }
});

inputSearch.addEventListener("keyup", () => {
  if (inputSearch.value !== "") {
    botonSearh.style.width = "350px";    
  }
  filtroPorTexto = true;
  if (filtroPorCheckbox == false) {
    filtrarSearch(dataFilter);
    if (dataFiltrada.events.length < 1) {
      noEncontrado();
    } else {
      mostrarCards(dataFiltrada);
    }
  } else {
    filtrarSearch(dataFiltrada);
    if (dataFiltrada.events.length < 1) {
      noEncontrado();
      dataFiltrada.events = guardarData.events;
    } else {
      mostrarCards(dataFiltrada);
    }
  }
});

const filtrarPorCategorias = (array) => {
  const contenedor = document.querySelector(".cards-section");
  if (checkeados.length !== 0 && inputSearch.value !== "") {
    array.events = dataFilter.events;
    filtrarSearch(array);
  }
  const { events } = array;
  let nuevoArray = {
    events: [],
  };
  if (
    (checkeados.length == 0 && inputSearch.value !== "") ||
    (checkeados.length == 0 && inputSearch.value == "")
  ) {
    filtrarSearch(dataFilter);    
  } else {
    events.forEach((event) => {
      const { category } = event;
      const { _id } = event;
      if (
        checkeados.includes(category) &&
        nuevoArray.events.includes(event) == false
      ) {
        nuevoArray.events.push(event);
        console.log(nuevoArray.events);
      }
    });
    if (nuevoArray.events.length < 1) {
      dataFiltrada.events = array.events;
      guardarData.events = dataFiltrada.events;
      dataFiltrada.events = [];
    }
    if (nuevoArray.events.length !== 0) {
      dataFiltrada.events = nuevoArray.events;      
    }
  }
};

const filtrarSearch = (array) => {
  let nuevoArray = {
    events: [],
  };
  const { events } = array;
  if (inputSearch.value == "" && checkeados.length == 0) {
    /* mostrarCards(data); */
    filtroPorTexto = false;
    filtroPorCheckbox = false;
    dataFiltrada.events = data.events;
  }
  if (inputSearch.value == "" && checkeados.length !== 0) {
    filtrarPorCategorias(dataFilter);
    mostrarCards(dataFiltrada);    
    filtroPorTexto = false;
  }
  if (
    inputSearch.value == "" &&
    dataFiltrada.events.length > 0 &&
    checkeados.length < 1
  ) {
    dataFiltrada.events = dataFilter.events;
  } else {
    events.forEach((event) => {
      if (inputSearch.value !== "") {
        nuevoArray.events = events.filter((event) =>
          event.name.toLowerCase().includes(inputSearch.value.toLowerCase())
        );
      }
    });
    console.log(nuevoArray.events);
    if (inputSearch.value !== "" && nuevoArray.events.length == 0) {
      if (dataFiltrada.length == 0) {
        guardarData.events = dataFilter.events;
      } else {
        guardarData.events = dataFiltrada.events;
        dataFiltrada.events = [];
      }
    }
    if (nuevoArray.events.length !== 0) {
      dataFiltrada.events = nuevoArray.events;
    }
  }
};