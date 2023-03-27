console.log(Vue);

const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      dataEvents: {},
      events: [],
      checkChecked: [],
      categorias: [],
      texto: "",
      noEncontrado: false,
      eventosMostrar : [],
      filtradosPorNombre: [],
      filtradosPorCategoria: [],
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
        let response = await axios.get(
          "https://mindhub-xj03.onrender.com/api/amazing"
        )
        console.log(response);
        if (response.request.status !== 200) {
          response = await axios.get("http://127.0.0.1:5500/assets/api/amazing.json")
        }
        this.dataEvents = response.data;
        const { events, currentDate } = this.dataEvents;
        this.events = events.filter(event => event.date > currentDate)
        this.currentDate = currentDate
        this.eventosMostrar = this.events
        /* this.filtradosPorNombre = this.events */
        console.log(this.events);        
        this.categorias = new Set(events.map(event => event.category))
        console.log(this.categorias);
      } catch (e) {
        console.error(e);
      }
    },
    filtrarCombinado() {
      this.filtrarPorNombre()
      this.filtrarPorCategorias()      
    },
    filtrarPorNombre() {
      if (this.texto == "") {        
        this.filtradosPorNombre = this.events;        
      }
      if (this.texto !== "") {
        this.inputIsActivo = true
      }
      this.filtradosPorNombre = this.events.filter((event) =>
        event.name.toLowerCase().includes(this.texto.toLowerCase())); 

      if (this.filtradosPorNombre.length == 0) {        
        this.noEncontrado = true
      } else {
        
        this.noEncontrado = false
      }      
      return this.filtradosPorNombre
    },
    filtrarPorCategorias() {
      if (this.checkChecked.length == 0) {               
        return this.eventosMostrar = this.filtradosPorNombre;        
      }
      this.filtradosPorCategoria = this.filtradosPorNombre.filter((event) =>
        this.checkChecked.includes(event.category)
      );

      this.eventosMostrar = this.filtradosPorCategoria
      console.log(this.eventosMostrar.length);

      if (this.eventosMostrar.length == 0) {
        this.noEncontrado = true
      } else {
        this.noEncontrado = false
      }       
    },    
  },
  computed: {    
    /* filtrarCombinado: function() {
      this.filtrarPorNombre
      this.filtrarPorCategorias      
    },
    filtrarPorNombre: function() {
      if (this.texto == "") {        
        this.filtradosPorNombre = this.events;        
      }
      this.filtradosPorNombre = this.events.filter((event) =>
        event.name.toLowerCase().includes(this.texto.toLowerCase()));
      console.log("hice esto otro")

      if (this.filtradosPorNombre.length == 0) {
        console.log("pase por aqui")
        this.noEncontrado = true
      }

      
      return this.filtradosPorNombre
    },
    filtrarPorCategorias: function() {
      if (this.checkChecked.length == 0) {
        console.log("check blanco");        
        return this.eventosMostrar = this.filtradosPorNombre;        
      }
      this.filtradosPorCategoria = this.filtradosPorNombre.filter((event) =>
        this.checkChecked.includes(event.category)
      );
      console.log("hice esto")
      
      
      this.eventosMostrar = this.filtradosPorCategoria
      console.log(this.eventosMostrar.length);

      if (this.eventosMostrar.length == 0) {
        this.noEncontrado = true
      } 
       
    }, */
  },
}).mount("#app");