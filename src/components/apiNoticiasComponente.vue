<template>
  <div class="container">


    <div class="header-noticias">
      <h1>
        Noticias Ambientales
        <img src="@/assets/icons/plant-icon.gif" alt="icono planta" class="icono-planta" />
      </h1>
      <hr />
      <p>
        Entérate de lo que está pasando en el mundo ambiental. En esta sección
        encontrarás noticias locales y globales que afectan nuestro planeta y cómo
        podemos ayudar a cambiar la situación.
      </p>
    </div>

    <div v-if="loading" class="loading">Cargando noticias...</div>

    <div v-else>
    <!-- Contenedor que da el fondo verde detrás de las cards -->
    <div class="noticias-wrapper">
      <div class="grid">
      <div v-for="noticia in noticiasPaginadas" :key="noticia.url" class="card">
        <img :src="noticia.image" alt="Noticia" class="card-img">
        <div class="card-content">
          <h2>{{ noticia.title }}</h2>
          <p>{{ noticia.description }}</p>
          <small>{{ new Date(noticia.publishedAt).toLocaleDateString() }}</small>
          <a :href="noticia.url" target="_blank" class="btn-link">Leer más</a>
        </div>
      </div>
      </div>
    </div>

    <div class="pagination">
  <button @click="prevPage" :disabled="paginaActual === 1">
    ◀
  </button>

  <span class="page-number">{{ paginaActual }}</span>

  <button @click="nextPage" :disabled="paginaActual === totalPaginas">
    ▶
  </button>
</div>

  </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'NoticiasApi',
  data() {
    return {
      noticias: [],
      loading: true,
      paginaActual: 1,
      noticiasPorPagina: 3
    }
  },
  computed: {
    noticiasPaginadas() {
      const inicio = (this.paginaActual - 1) * this.noticiasPorPagina
      return this.noticias.slice(inicio, inicio + this.noticiasPorPagina)
    },
    totalPaginas() {
      return Math.ceil(this.noticias.length / this.noticiasPorPagina)
    }
  },
  methods: {
    async fetchNoticias() {
      const API_KEY = '321bcd82eb1c22d5413cd2fc506fe018' // 👈 Coloca tu nueva API key aquí
      const URL = `https://gnews.io/api/v4/search?q=medio ambiente OR clima OR sostenibilidad&lang=es&max=10&apikey=${API_KEY}`
      
      try {
        const response = await axios.get(URL)
        // GNews usa "articles" igual que NewsAPI
        this.noticias = response.data.articles.filter(n => n.image)
      } catch (error) {
        console.error('Error al cargar noticias:', error)
        this.noticias = [] // Asegurar que no quede undefined
      } finally {
        this.loading = false
      }
    },
    nextPage() {
      if (this.paginaActual < this.totalPaginas) {
        this.paginaActual++
      }
    },
    prevPage() {
      if (this.paginaActual > 1) {
        this.paginaActual--
      }
    }
  },
  mounted() {
    this.fetchNoticias()
  }
}
</script>

<style>
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.header-noticias {
  text-align: center;
  margin-bottom: 30px;
}

.header-noticias h1 {
  font-size: 2.3rem;
  font-weight: bold;
  color: #0b6d11;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.header-noticias .icono-planta {
  width: 90px;
  height: auto;
}

.header-noticias hr {
  width: 60%;
  margin: 10px auto;
  border: none;
  border-top: 1px solid #aaa;
}

.header-noticias p {
  max-width: 700px;
  margin: 0 auto;
  color: #444;
  font-size: 1rem;
  line-height: 1.6;
}

.loading {
  text-align: center;
  color: #555;
}

.noticias-wrapper {
  background-color:#6ebb6b; /* ✅ color de fondo (ajústalo al verde que prefieras) */
  padding: 30px;            /* espacio alrededor de las tarjetas */
  border-radius: 15px;      /* bordes redondeados */
  margin-bottom: 20px;      /* separación con la paginación */
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 20px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.card-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-content {
  padding: 15px;
}

.card-content h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

.card-content p {
  font-size: 14px;
  margin-bottom: 10px;
  color: #333;
}

.card-content small {
  display: block;
  margin-bottom: 10px;
  color: #777;
}

.btn-link {
  color: #2c7b33;
  text-decoration: none;
  font-weight: bold;
}

.btn-link:hover {
  text-decoration: underline;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

.pagination button {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: none;
  background-color: #307b2c;
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination button:hover:not(:disabled) {
  background-color: #256d39;
}

.pagination button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-number {
  padding: 8px 14px;
  border-radius: 6px;
  background: #e5e5e5;
  font-weight: bold;
  color: #333;
}


/* Responsive */
@media (max-width: 900px) {
  .grid {
    grid-template-columns: 2fr; /* 2 en tablets */
  }
}
@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr; /* 1 en móviles */
  }
}
</style>
