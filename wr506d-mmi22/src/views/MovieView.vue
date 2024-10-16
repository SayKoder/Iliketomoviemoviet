<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import MovieCard from '../components/MovieCard.vue'

const message = 'Bienvenue sur la page des films'
const searchQuery = ref('')

const recup = ref([])
const router = useRouter()

const goToDetails2 = (movieId) => {
  router.push(`/movies/${movieId}`)
}
const filteredMovies = computed(() => {
  return recup.value.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
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

    <MovieCard v-slot="{ movies }">
      <div v-if="movies.length > 0" class="movies-container">
        <div
          v-for="movie in movies"
          :key="movie.id"
          class="movie-card"
          @click="goToDetails2(movie.id)"
        >
          <h3>{{ movie.title }}</h3>
          <img v-if="movie.media" :src="movie.media" alt="Affiche du film" />
          <p>{{ movie.description }}</p>
        </div>
      </div>
      <p v-else>Aucun film trouvé</p>
    </MovieCard>
  </div>
</template>

<style scoped>
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

ul {
  display: flex;
  list-style: none;
  padding: 0;
}

li {
  margin: 5px 0;
  padding: 5px;
  color: black;
}

img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
}
</style>
