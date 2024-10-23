<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import MovieCard from '../components/MovieCard.vue'

const message = 'Bienvenue sur la page des films'
const searchQuery = ref('')

const currentPage = ref(1)
const itemsPerPage = 10
const totalPages = ref(1)
const allMovies = ref([])

const router = useRouter()

// Fonction pour aller aux détails d'un film
const goToDetails = (movieId) => {
  router.push(`/movies/${movieId}`)
}

// Filtrer les films en fonction de la recherche
const filteredMovies = computed(() => {
  return allMovies.value.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Paginer les films filtrés
const paginatedMovies = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredMovies.value.slice(start, end)
})

// Mettre à jour le nombre de pages
watch(filteredMovies, (newFilteredMovies) => {
  totalPages.value = Math.ceil(newFilteredMovies.length / itemsPerPage)
})

// Changer de page
const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>

<template>
  <div>
    <h1>{{ message }}</h1>

    <input
      type="text"
      v-model="searchQuery"
      placeholder="Rechercher un film..."
      class="search-bar"
    />
    <p>Liste des films :</p>

    <MovieCard v-slot="{ movies: paginatedMovies }">
      <div v-if="paginatedMovies.length > 0" class="movies-container">
        <div
          v-for="movie in paginatedMovies"
          :key="movie.id"
          class="movie-card"
          @click="goToDetails(movie.id)"
        >
          <h3>{{ movie.title }}</h3>
          <img v-if="movie.media" :src="movie.media" alt="Affiche du film" />
          <p>{{ movie.description }}</p>
        </div>
      </div>
      <p v-else>Aucun film trouvé</p>

      <div class="pagination">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
          Précédent
        </button>
        <span>Page {{ currentPage }} sur {{ totalPages }}</span>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
          Suivant
        </button>
      </div>
    </MovieCard>
  </div>
</template>

<style scoped>
/* Styles inchangés */
h1 {
  color: #42b983;
}

.search-bar {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.movies-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.movie-card {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 22%;
  background-color: #f4f4f4;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s;
}
.movie-card:hover {
  transform: scale(1.05);
  transition: transform 0.3s;
}

.movie-card p {
  font-size: 16px;
}
img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
}

p {
  font-size: 30px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  margin: 0 10px;
}
</style>
