const {createApp} = Vue

const app = createApp({
  data() {
    return {
      dataEvents: {},
      events: [],      
      evento: "",         
    }
  },
  created() {
    this.obtenerDatos()
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
        const { events } = this.dataEvents;
        this.events = events        
        const querySearch = document.location.search        
        const id = new URLSearchParams(querySearch).get("id")        
        this.evento = this.events.find(event => event._id == id)        
      } catch (e) {
        console.error(e)
      }
    },    
  }
}).mount("#app")