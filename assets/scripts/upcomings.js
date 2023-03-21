let dataEvents;

const obtenerEventos = async () => {
  try {
    let response = await fetch ("https://mindhub-xj03.onrender.com/api/amazing")
    if (response.status !== 200) {
      response = await fetch ("http://127.0.0.1:5500/assets/api/amazing.json")
    }
    dataEvents = await response.json()
    
    const { currentDate, events } = dataEvents

    const eventosPorFecha = events.filter((event) => event.date > currentDate)    

    const contentCheckbox = document.getElementById("check-category")
    const inputSearch = document.getElementById("input-search")
    const botonSearch = document.querySelector(".search-category input")

    mostrarCards(eventosPorFecha)

    filtrarCategorias(eventosPorFecha)

    mostrarCategorias(filtrarCategorias, eventosPorFecha)

    inputSearch.addEventListener("input", () => {
      if (inputSearch.value !== "") {
        botonSearch.style.width = "300px"
      }
    })

    const filtrarCombinado = () => {
      let filtradosPorNombre = filtrarPorNombre(eventosPorFecha, inputSearch.value)
      let checkeados = categoriasChecked();
      let filtradosPorCategoria = filtrarPorCategorias(
        filtradosPorNombre,
        checkeados
      )
      if (filtradosPorCategoria.length == 0) {
        return noEncontrado()
      }
      mostrarCards(filtradosPorCategoria)      
    }

    inputSearch.addEventListener("input", filtrarCombinado);

    contentCheckbox.addEventListener("change", filtrarCombinado);
  } catch (error) {
    console.log(error)
  }
}

obtenerEventos();
