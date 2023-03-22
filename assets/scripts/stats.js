let dataEvents;

const obtenerEventos = async () => {
  try {
    let response = await fetch ("https://mindhub-xj03.onrender.com/api/amazing")
    if (response.status !== 200) {
      response = await fetch ("http://127.0.0.1:5500/assets/api/amazing.json")
    }
    dataEvents = await response.json()

    console.log(dataEvents);

    const { currentDate, events } = dataEvents;
    const { category } = events;

    let upcommingsStats = []
    let pastStats = []
    let arrayPorFecha = []

    let esFuturo = false

    const arrayUpcommings = events
              .filter((event) => event.date > currentDate)
              .map(event => {
                let nuevoArray = {}
                nuevoArray.name = event.name;
                nuevoArray.category = event.category;
                nuevoArray.capacity = event.capacity;
                nuevoArray.price = event.price;
                nuevoArray.estimate = event.estimate;
                nuevoArray.ganancia = parseInt(event.price * event.estimate);
                nuevoArray.porcentajeAsistencia = parseFloat(((event.estimate / event.capacity)*100).toFixed(2))
                return nuevoArray;
              });
    console.log(arrayUpcommings)

    const arrayPast = events
              .filter((event) => event.date < currentDate)
              .map(event => {
                let nuevoArray = {}
                nuevoArray.name = event.name;
                nuevoArray.category = event.category;
                nuevoArray.capacity = event.capacity;
                nuevoArray.price = event.price;
                nuevoArray.assistance = event.assistance;
                nuevoArray.ganancia = parseInt(event.price * event.assistance);
                nuevoArray.porcentajeAsistencia = parseFloat(((event.assistance / event.capacity)*100).toFixed(2))
                return nuevoArray
              });
    console.log(arrayPast);

    const calcularGananciaTotal = (array, categoria) => {
      let gananciaTotaL = 0
      array.forEach((event) => {        
        if (categoria == event.category) {
          gananciaTotaL += event.ganancia
        }
      })
      return gananciaTotaL
    }

    const calcularPorcentajeAsistencia = (array, categoria) => {
      let sumaDePorcentajes = 0
      let numEventosDeCategoria = 0
      array.forEach((event) => {
        if (categoria == event.category) {
          sumaDePorcentajes += event.porcentajeAsistencia
          numEventosDeCategoria ++
        }
      })
      let porcentajeCategoria = parseFloat((sumaDePorcentajes/numEventosDeCategoria).toFixed(2))
      return porcentajeCategoria
    }

    const generarEstadisticas = (arrayEventos, arrayCategorias, nuevoArray) => {      
      arrayCategorias.forEach(categoria => {
        let gananciaTotal = calcularGananciaTotal(arrayEventos, categoria)
        let porcentajeAsistencia = calcularPorcentajeAsistencia(arrayEventos, categoria)        
        let categoriaStats = {}
        categoriaStats.nombre = categoria
        categoriaStats.ganancias = gananciaTotal
        categoriaStats.porcentajeAsistencia = porcentajeAsistencia
        nuevoArray.push(categoriaStats)
      })      
    }

    let categoriasUpcommings = filtrarCategorias(arrayUpcommings);
    let categoriasPast = filtrarCategorias(arrayPast)

    generarEstadisticas(arrayUpcommings, categoriasUpcommings, upcommingsStats)
    generarEstadisticas(arrayPast, categoriasPast, pastStats)
    
    const ordenarPorPorcentajeMayor = structuredClone(arrayPast).sort((a,b) => {
      if (a.porcentajeAsistencia < b.porcentajeAsistencia) {
        return 1;
      }
      if (a.porcentajeAsistencia > b.porcentajeAsistencia) {
        return -1;
      }
      return 0;
    })

    const ordenarPorPorcentajeMenor = structuredClone(arrayPast).sort((a,b) => {
      if (a.porcentajeAsistencia < b.porcentajeAsistencia) {
        return -1;
      }
      if (a.porcentajeAsistencia > b.porcentajeAsistencia) {
        return 1;
      }
      return 0;
    })

    console.log(ordenarPorPorcentajeMenor)

    const ordenarPorCapacidadMayor = structuredClone(arrayPast).sort((a,b) => {
      if (a.capacity < b.capacity) {
        return 1;
      }
      if (a.capacity > b.capacity) {
        return -1;
      }
      return 0;
    })

    let contenedorTabla, templateTabla, fragmentTabla

    const capturarElementosHtml = (selctorContendor, selectorTemplate) => {
      contenedorTabla = document.getElementById(selctorContendor)
      templateTabla = document.getElementById(selectorTemplate).content
      fragmentTabla = document.createDocumentFragment()
    }

    //Estadisticas primera tabla (despliegue en html)
    capturarElementosHtml("tbody-tabla-uno", "template-tabla-uno")
        
    const eventoMayorAsistencia = ordenarPorPorcentajeMayor.find(event => event.porcentajeAsistencia > 0)
    templateTabla.getElementById("mayor-porcentaje").textContent = `${eventoMayorAsistencia.name} (${eventoMayorAsistencia.porcentajeAsistencia}%)`
    const eventoMenorAsistencia = ordenarPorPorcentajeMenor.find(event => event.porcentajeAsistencia > 0)
    templateTabla.getElementById("menor-porcentaje").textContent = `${eventoMenorAsistencia.name} (${eventoMenorAsistencia.porcentajeAsistencia}%)`
    const eventoMayorCapacidad = ordenarPorCapacidadMayor.find(event => event.capacity > 0)
    templateTabla.getElementById("mayor-capacidad").textContent = `${eventoMayorCapacidad.name} (${eventoMayorCapacidad.capacity.toLocaleString()})`

    let clonarRegistro = templateTabla.cloneNode(true)

    fragmentTabla.appendChild(clonarRegistro)

    contenedorTabla.appendChild(fragmentTabla)

    //Estadisticas segunda Tabla (despliegue en html)

    const mostrarPorcentajesStats = (array, selectorCategoria, selectorGanancias, selectorPorcentajes) => {
      array.forEach(event => {
        templateTabla.getElementById(selectorCategoria).textContent = event.nombre
        templateTabla.getElementById(selectorGanancias).textContent = `${event.ganancias.toLocaleString()} USD` 
        templateTabla.getElementById(selectorPorcentajes).textContent = `${event.porcentajeAsistencia}%` 

        let clonarRegistro = templateTabla.cloneNode(true)
        fragmentTabla.appendChild(clonarRegistro)
      })
      contenedorTabla.appendChild(fragmentTabla)
    }

    capturarElementosHtml("tbody-tabla-dos", "template-tabla-dos")
    mostrarPorcentajesStats(upcommingsStats, "categoria-upcommings", "ganancias-upcommings", "porcentaje-upcommings")
    
    //Estadisticas tercera Tabla (despliegue en html)

    capturarElementosHtml("tbody-tabla-tres", "template-tabla-tres")
    mostrarPorcentajesStats(pastStats, "categoria-past", "ganancias-past", "porcentaje-past")
            
  } catch (error) {
    console.log(error);
  }
};

obtenerEventos();
