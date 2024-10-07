<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import MovieCard from '../components/MovieCard.vue'

const route = useRoute()
const actorId = ref(route.params.id)
const actorDetails = ref(null)

let selectedMovie = ref(null)
const message = 'Bienvenue sur la page des détails des acteurs'

onMounted(async () => {
  try {
    const response = await axios.get(
      `http://symfony.mmi-troyes.fr:8319/api/actors/${actorId.value}`
    )
    actorDetails.value = response.data //Stockage des détails du film
  } catch (error) {
    console.error('Erreur lors de la récupération des détails des acteurs : ', error)
  }
})
</script>

<template>
  <div>
    <button @click="$router.go(-1)">Retour</button>
    <h1>{{ message }}</h1>
    <div class="detailActor" v-if="actorDetails">
      <div class="left-column">
        <h2>{{ actorDetails.firstname }} {{ actorDetails.lastname }}</h2>
        <img v-if="actorDetails.media" :src="actorDetails.media" alt="Affiche des acteurs" />
        <p>{{ actorDetails.bio }}</p>
      </div>
      <div class="right-column">
        <p><strong>Date de naissance :</strong> {{ actorDetails.dob }}</p>
        <p><strong>Nationalité :</strong> {{ actorDetails.nationality }}</p>
        <p><strong>Genre :</strong> {{ actorDetails.gender }}</p>
        <p><strong>Récompenses :</strong> {{ actorDetails.awards }}</p>
        <p><strong>Films :</strong></p>
        <ul>
          <li v-for="movie in actorDetails.movies" :key="movie.id">
            <h2>{{ movie.title }}</h2>
            <img v-if="movie.media" :src="movie.media" alt="Affiche du film" />
            <p>{{ movie.description }}</p>
          </li>
        </ul>
      </div>
    </div>
    <p v-else>Chargement des détails...</p>
  </div>
</template>

<style scoped>
h1 {
  color: #42b983;
  margin-bottom: 20px;
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
  transition: background-color 0.3s ease;
  margin-top: 6%;
}

button:hover {
  background-color: red;
}

.detailActor {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 70%; /* 70% de la largeur de la page */
  background-color: #f4f4f4;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: transform 0.3s;
  margin: auto;
}

.detailActor:hover {
  transform: scale(1.05);
  transition: transform 0.3s;
}

.left-column,
.right-column {
  flex: 1;
  padding: 20px;
}

.left-column {
  max-width: 45%; /* Colonne gauche prend environ 45% de la div */
}

.right-column {
  max-width: 45%; /* Colonne droite prend environ 45% de la div */
}

img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background-color: #ddd;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
}
</style>
