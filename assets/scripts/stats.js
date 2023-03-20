let dataEvents;

const obtenerEventos = async () => {
  try {
    const response = await fetch(
      "https://mindhub-xj03.onrender.com/api/amazing"
    );
    if (response.status === 404) {
      const response = await fetch(
        "http://127.0.0.1:5500/assets/api/amazing.json"
      );
      dataEvents = await response.json();
    }
    if (response.status === 200) {
      dataEvents = await response.json();
    }

    console.log(dataEvents);

    const { currentDate, events } = dataEvents;
    const { category } = events;

    let upcommingsStats = []
    let pastStats = []    

    const eventosFuturos = events.filter((event) => event.date > currentDate);

    const eventosPasados = events.filter((event) => event.date < currentDate);

    const arrayUpcommings = eventosFuturos.map((event) => {
      let nuevoArray = {};
      nuevoArray.name = event.name;
      nuevoArray.category = event.category;
      nuevoArray.estimate = event.estimate;
      nuevoArray.capacity = event.capacity;
      nuevoArray.price = event.price;
      nuevoArray.ganancia = parseInt(event.price * event.estimate);
      nuevoArray.porcentajeAsistencia = parseFloat(((event.estimate / event.capacity)*100).toFixed(2))
      return nuevoArray;
    });

    console.log(arrayUpcommings)

    const arrayPast = eventosPasados.map((event) => {
      let nuevoArray = {};
      nuevoArray.name = event.name;
      nuevoArray.category = event.category;
      nuevoArray.assistance = event.assistance;
      nuevoArray.capacity = event.capacity;
      nuevoArray.price = event.price;
      nuevoArray.ganancia = parseInt((event.price * event.assistance));
      nuevoArray.porcentajeAsistencia = parseFloat(
        ((event.assistance / event.capacity) * 100).toFixed(2)
      );

      return nuevoArray;
    });

    console.log(arrayPast)
    
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
    
    console.log(upcommingsStats)

    console.log("--------------------------")

    console.log(pastStats)

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

    const ordenarPorCapacidadMayor = structuredClone(arrayPast).sort((a,b) => {
      if (a.capacity < b.capacity) {
        return 1;
      }
      if (a.capacity > b.capacity) {
        return -1;
      }
      return 0;
    })

    //Estadisticas primera tabla (despliegue en html)
    const contenedorTablaUno = document.getElementById("tbody-tabla-uno")
    const templateTablaUno = document.getElementById("template-tabla-uno").content
    const fragmentTablaUno = document.createDocumentFragment()

    const eventoMayorAsistencia = ordenarPorPorcentajeMayor.find(event => event.porcentajeAsistencia > 0)
    templateTablaUno.getElementById("mayor-porcentaje").textContent = `${eventoMayorAsistencia.name} (${eventoMayorAsistencia.porcentajeAsistencia}%)`
    const eventoMenorAsistencia = ordenarPorPorcentajeMenor.find(event => event.porcentajeAsistencia > 0)
    templateTablaUno.getElementById("menor-porcentaje").textContent = `${eventoMenorAsistencia.name} (${eventoMenorAsistencia.porcentajeAsistencia}%)`
    const eventoMayorCapacidad = ordenarPorCapacidadMayor.find(event => event.capacity > 0)
    templateTablaUno.getElementById("mayor-capacidad").textContent = `${eventoMayorCapacidad.name} (${eventoMayorCapacidad.capacity})`

    let clonarRegistro = templateTablaUno.cloneNode(true)

    fragmentTablaUno.appendChild(clonarRegistro)

    contenedorTablaUno.appendChild(fragmentTablaUno)

    //Estadisticas segunda Tabla (despliegue en html)

    const contenedorTablaDos = document.getElementById("tbody-tabla-dos")
    const templateTablaDos = document.getElementById("template-tabla-dos").content
    const fragmentTablaDos = document.createDocumentFragment()
    
    upcommingsStats.forEach(event => {
      templateTablaDos.getElementById("categoria-upcommings").textContent = event.nombre
      templateTablaDos.getElementById("ganancias-upcommings").textContent = `$${event.ganancias}` 
      templateTablaDos.getElementById("porcentaje-upcommings").textContent = `${event.porcentajeAsistencia}%` 

      let clonarRegistro = templateTablaDos.cloneNode(true)
      fragmentTablaDos.appendChild(clonarRegistro)
    })

    contenedorTablaDos.appendChild(fragmentTablaDos)

    //Estadisticas tercera Tabla (despliegue en html)

    const contenedorTablaTres = document.getElementById("tbody-tabla-tres")
    const templateTablaTres = document.getElementById("template-tabla-tres").content
    const fragmentTablaTres = document.createDocumentFragment()
    
    pastStats.forEach(event => {
      templateTablaTres.getElementById("categoria-past").textContent = event.nombre
      templateTablaTres.getElementById("ganancias-past").textContent = `$${event.ganancias}` 
      templateTablaTres.getElementById("porcentaje-past").textContent = `${event.porcentajeAsistencia}%` 

      let clonarRegistro = templateTablaTres.cloneNode(true)
      fragmentTablaTres.appendChild(clonarRegistro)
    })

    contenedorTablaTres.appendChild(fragmentTablaTres)

    console.log(ordenarPorPorcentajeMayor)
    console.log(ordenarPorPorcentajeMenor)
    console.log(ordenarPorCapacidadMayor)

    console.log(contenedorTablaUno)

    /* let categoriasPast = filtrarCategorias(arrayPast);
    categoriasPast.forEach((categoria) => calcularStats(arrayPast, categoria)
    )  */   
  } catch (error) {
    console.log(error);
  }
};

obtenerEventos();
