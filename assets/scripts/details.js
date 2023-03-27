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
        let response = await axios.get(
          "https://mindhub-xj03.onrender.com/api/amazing"
        )        
        if (response.request.status !== 200) {
          response = await axios.get("http://127.0.0.1:5500/assets/api/amazing.json")
        }
        this.dataEvents = response.data;
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