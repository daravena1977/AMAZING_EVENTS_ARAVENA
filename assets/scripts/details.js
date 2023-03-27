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
        const { events } = this.dataEvents;
        this.events = events
        console.log(events);
        const querySearch = document.location.search
        console.log(querySearch);
        const id = new URLSearchParams(querySearch).get("id")
        console.log(id);
        this.evento = this.events.find(event => event._id == id)
        console.log(this.evento);
      } catch (e) {
        console.error(e)
      }
    },
    
  }
}).mount("#app")


/* const querySearch = document.location.search;

const id = new URLSearchParams(querySearch).get("id");

const obtenerEventos = async () => {
  try {
    let response = await fetch ("https://mindhub-xj03.onrender.com/api/amazing")
    if (response.status !== 200) {
      response = await fetch ("http://127.0.0.1:5500/assets/api/amazing.json")
    }
    dataEvents = await response.json()

    const { events } = dataEvents;

    const querySearch = document.location.search;

    const id = new URLSearchParams(querySearch).get("id");

    const formatearFecha = (fecha) => {
      return fecha.split("-").reverse().join("/")
    }

    const eventos = events.map((event) => {
      let aux = {};
      aux._id = event._id;
      aux.image = event.image;
      aux.name = event.name;
      aux.date = formatearFecha(event.date);
      aux.description = event.description;
      aux.category = event.category;
      aux.place = event.place;
      aux.capacity = event.capacity;
      aux.assistance = event.assistance;
      aux.price = event.price;
      aux.estimate = event.estimate;
      return aux;
    });
    
    const evento = eventos.find((evento) => evento._id == id);
    

    const content = document.querySelector(".details");
    content.innerHTML = `<img src=${evento.image} alt="">
  <section class="card-details">
    <h2 class="color">${evento.name}</h2>
    <h5>Category</h5>
    <p id="category">${evento.category}</p>
    <h5>Description</h5>
    <p id="description">
      ${evento.description}
    </p>
    <h5>Place</h5>
    <p id="place">
      ${evento.place}
    </p>  
    <h5>Date:</h5>
    <p id="date">${evento.date}</p>
    <div id="precio-details">
      <h5>Price:</h5>
      <p id="price">${evento.price.toLocaleString()} USD</p>
    </div>
  </section>`;    
  } catch (error) {
    console.log(error);
  }
};

obtenerEventos(); */
