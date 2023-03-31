console.log(Vue);

const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      dataEvents: {},
      eventosOriginal: [],
      checkChecked: [],
      categorias: [],
      texto: "",
      noEncontrado: false,
      eventosMostrar : [],
      filtradosPorNombre: [],      
      inputIsActivo: false,      
    };
  },
  created() {
    this.obtenerDatos()   
  },
  mounted() {
    
  },
  methods: {
    async obtenerDatos() {
      try {
        let response = await fetch (
          "https://mindhub-xj03.onrender.com/api/amazing"
        );
        console.log(response);
        if (response.status !== 200) {
          response = await fetch(
            "http://127.0.0.1:5500/assets/api/amazing.json"
          );
        }
        this.dataEvents = await response.json()
        const { events, currentDate } = this.dataEvents;
        this.eventosOriginal = events.filter(event => event.date > currentDate)
        this.currentDate = currentDate
        this.eventosMostrar = this.eventosOriginal              
        this.categorias = new Set(events.map(event => event.category))
        
      } catch (e) {
        console.error(e);
      }
    },
     
  },
  computed: {    
    filtrarCombinado (){
      let filtradosPorTexto = this.eventosOriginal.filter((event) => event.name.toLowerCase().includes(this.texto.toLowerCase()))
      if (this.checkChecked.length == 0) {
        this.eventosMostrar = filtradosPorTexto
      } else {
        this.eventosMostrar = filtradosPorTexto.filter((event) => this.checkChecked.includes(event.category))
      }      
    },
  },
}).mount("#app");