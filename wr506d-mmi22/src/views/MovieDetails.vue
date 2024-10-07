<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import ActorCard from '../components/ActorCard.vue'

const route = useRoute()
const movieId = ref(route.params.id)
const movieDetails = ref(null)

let selectedActor = ref(null)
const message = 'Bienvenue sur la page des détails des films'

onMounted(async () => {
  try {
    const response = await axios.get(
      `http://symfony.mmi-troyes.fr:8319/api/movies/${movieId.value}`
    )
    movieDetails.value = response.data //Stockage des détails du film
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du film : ', error)
  }
})
</script>

<template>
  <div>
    <button @click="$router.go(-1)">Retour</button>
    <h1>{{ message }}</h1>
    <div class="detailMovie" v-if="movieDetails">
      <h2>{{ movieDetails.title }}</h2>
      <img v-if="movieDetails.media" :src="movieDetails.media" alt="Affiche du film" />
      <p>{{ movieDetails.description }}</p>
      <ActorCard />
    </div>
    <p v-else>Chargement des détails...</p>
  </div>
</template>

<style scoped>
h1 {
  color: #42b983;
}

h2 {
  color: #710f0f;
  font-size: 50px;
}

button {
  background-color: #42b983;
  color: white;
  padding: 15px 25px;
  font-size: 25px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Animation de transition */
  margin-top: 6%;
}

button:hover {
  background-color: red; /* Couleur de fond rouge au survol */
}

.detailMovie {
  flex: 1;
  max-width: 22%;
  background-color: #f4f4f4;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s;
}

.detailMovie:hover {
  transform: scale(1.05);
  transition: transform 0.3s;
}

img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
}
</style>
