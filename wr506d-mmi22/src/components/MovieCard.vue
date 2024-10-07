<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ActorCard from './ActorCard.vue'

let recup = ref([])
let selectedActor = ref(null)
const router = useRouter()

onMounted(async () => {
  try {
    const response = await axios.get('http://symfony.mmi-troyes.fr:8319/api/movies')
    console.log(response.data)
    recup.value = response.data['hydra:member']
  } catch (error) {
    console.error('Erreur lors de la récupération des films : ', error)
  }
})

const goToDetails = (movieId) => {
  router.push(`/movies/${movieId}`)
}
</script>

<template>
  <div id="lit">
    <h1>Les derniers films</h1>
    <div v-if="recup.length > 0" class="movies-container">
      "
      <div
        v-for="movie in recup.slice(-4)"
        :key="movie.id"
        class="movie-card"
        @click="goToDetails(movie.id)"
      >
        <h2>{{ movie.title }}</h2>
        <img v-if="movie.media" :src="movie.media" alt="Affiche du film" />
        <p>{{ movie.description }}</p>
      </div>
    </div>

    <p v-else>Aucun film à afficher</p>
    <ActorCard v-if="selectedActor" :actor="selectedActor" />
  </div>
</template>

<style scoped>
#lit {
  padding: 20px;
  text-align: center;
}

h1 {
  color: #e78d26;
  margin-bottom: 30px;
}

.movies-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.movie-card {
  flex: 1;
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

h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
}

p {
  font-size: 12px;
  color: #666;
}
</style>
