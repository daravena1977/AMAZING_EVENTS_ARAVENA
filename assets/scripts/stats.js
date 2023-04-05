const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      dataEvents: {},
      events: [],      
      arrayUpcommings: [],
      arrayPast: [],
      eventoMayorPorcentaje: "",
      eventoMenorPorcentaje: "",
      eventoMayorCapacidad: "",      
      categorias: [],
      statsUpcommings: [],
      statsPast: [],
      arrayPorCategoria: [],
      arrayEstadisticasPorEventos: [],
      isActive: false,
    };
  },
  created() {
    this.obtenerDatos();

  },
  methods: {
    async obtenerDatos() {
      try {
        let response = await axios.get(
          "https://mindhub-xj03.onrender.com/api/amazing"
        );
        if (response.request.status !== 200) {
          response = await axios.get(
            "http://127.0.0.1:5500/assets/api/amazing.json"
          );
        }
        this.dataEvents = response.data;
        const { events, currentDate } = this.dataEvents;
        this.events = events;

        this.arrayUpcommings = this.events
          .filter(event => event.date > currentDate)
          .map(event => {
            let nuevoArray = []
            nuevoArray.name = event.name
            nuevoArray.category = event.category;
            nuevoArray.capacity = event.capacity;
            nuevoArray.date = event.date
            nuevoArray.price = event.price;
            nuevoArray.estimate = event.estimate;
            nuevoArray.ganancia = parseInt(event.price * event.estimate);
            nuevoArray.porcentajeAsistencia = parseFloat(
              ((event.estimate / event.capacity) * 100).toFixed(2))

            return nuevoArray;
          })

        console.log(this.arrayUpcommings)

        this.arrayPast = this.events
          .filter(event => event.date < currentDate)
          .map(event => {
            let nuevoArray = []
            nuevoArray.name = event.name
            nuevoArray.category = event.category
            nuevoArray.capacity = event.capacity
            nuevoArray.date = event.date
            nuevoArray.price = event.price
            nuevoArray.assistance = event.assistance
            nuevoArray.ganancia = parseInt(event.price * event.assistance);
            nuevoArray.porcentajeAsistencia = parseFloat(((event.assistance / event.capacity) * 100).toFixed(2))

            return nuevoArray;
          })
        this.filtrarMayorPorcentaje()
        this.filtrarMenorPorcentaje()
        this.filtrarMayorCapacidad()        

        this.categorias = new Set(this.events.map(event => event.category))
        console.log(this.categorias);

        this.statsPorCategoria(this.arrayUpcommings, this.statsUpcommings)        
        this.statsPorCategoria(this.arrayPast, this.statsPast)        
        
      } catch (e) {
        console.error(e);
      }
    },
    
    generarEstadisticasPorEventos (arrayFuente, categoria){
      this.arrayEstadisticasPorEventos = arrayFuente.filter(evento => evento.category.includes(categoria)).sort((a, b) => b.porcentajeAsistencia - a.porcentajeAsistencia)
      this.isActive = true;
      console.log(this.arrayEstadisticasPorEventos)
      console.log(categoria)      
    },

    filtrarMayorPorcentaje() {
      let arrayParaOrdenar = this.arrayPast
      this.eventoMayorPorcentaje = arrayParaOrdenar.sort(
        (a, b) => {
          return b.porcentajeAsistencia - a.porcentajeAsistencia;
        }
      ).find(event => event.porcentajeAsistencia)
    },

    filtrarMenorPorcentaje() {
      let arrayParaOrdenar = this.arrayPast
      this.eventoMenorPorcentaje = arrayParaOrdenar.sort((a, b) => {
        return a.porcentajeAsistencia - b.porcentajeAsistencia
      }).find(event => event.porcentajeAsistencia)
    },

    filtrarMayorCapacidad() {
      let arrayParaOrdenar = this.arrayPast
      this.eventoMayorCapacidad = arrayParaOrdenar.sort(
        (a, b) => {
          return b.capacity - a.capacity;
        }
      ).find(event => event.capacity)
    },

    statsPorCategoria(arrayData, arrayMostrar) {
      this.categorias.forEach(categoria => {        
        this.arrayPorCategoria = arrayData.filter(event => event.category == categoria)
        if (this.arrayPorCategoria.length !== 0) {
          let totalGanancias = this.arrayPorCategoria
              .map(event => event.ganancia)
              .reduce((a, b) => a + b, 0)
          let porcentajeAsistenciaTotal = this.arrayPorCategoria
              .map(event => event.porcentajeAsistencia)
              .reduce((a, b) => a + b, 0) / this.arrayPorCategoria.length         
          let resumenCategoria = {}
          resumenCategoria.nombre = categoria
          resumenCategoria.ganancias = totalGanancias.toLocaleString()
          resumenCategoria.asistencia = porcentajeAsistenciaTotal.toFixed(2)
          arrayMostrar.push(resumenCategoria)
        }
      });
    }
  },
  computed: {

  }
}).mount("#app");