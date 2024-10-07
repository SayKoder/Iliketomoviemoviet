<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import ActorCard from '../components/ActorCard.vue'

const route = useRoute()
const movieId = ref(route.params.id)
const movieDetails = ref(null)
const message = 'Bienvenue sur la page des détails'

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
    <div v-if="movieDetails">
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
</style>
