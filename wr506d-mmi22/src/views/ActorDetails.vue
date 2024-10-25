<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const actorId = ref(route.params.id)
const actorDetails = ref(null)
const movies = ref([])

const formatDate = (dateString: string, format: string = 'iso') => {
  const date = new Date(dateString)

  if (format === 'long') {
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) // Ex: 3 juillet 2023
  } else {
    return date.toLocaleDateString('fr-CA') // Ex: 2023-07-03 (format ISO court)
  }
}

let selectedMovie = ref(null)
const message = 'Bienvenue sur la page des détails des acteurs'

onMounted(async () => {
  try {
    const response = await axios.get(
      `http://symfony.mmi-troyes.fr:8319/api/actors/${actorId.value}`
    )
    actorDetails.value = response.data //Stockage des détails acteurs
    const movieDetails = actorDetails.value.movies.map(async (movieUrl: string) => {
      const movieResponse = await axios.get(`http://symfony.mmi-troyes.fr:8319${movieUrl}`)
      return movieResponse.data
    })

    movies.value = await Promise.all(movieDetails) //Stockage des détails des films
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
        <p><strong>Date de naissance :</strong> {{ formatDate(actorDetails.dob, 'long') }}</p>
        <p><strong>Nationalité :</strong> {{ actorDetails.nationality }}</p>
        <p><strong>Genre :</strong> {{ actorDetails.gender }}</p>
        <p><strong>Récompenses :</strong> {{ actorDetails.awards }}</p>
        <p><strong>Films :</strong></p>
        <ul v-if="movies.length > 0">
          <li v-for="movie in movies" :key="movie.id">
            <h3 class="titre-movie">{{ movie.title }}</h3>
            <img class="img-movie" v-if="movie.media" :src="movie.media" alt="Affiche du film" />
          </li>
        </ul>
        <p v-else>Dans aucun film</p>
      </div>
    </div>
    <p v-else>Chargement des détails...</p>
  </div>
</template>

<style scoped>
h1 {
  background: linear-gradient(rgb(236, 192, 59), 45%, rgb(255, 95, 15));
  padding: 10px 15px;
  border-radius: 30px;
  color:black;
}

h2 {
  color: #ffffff;
  font-size: 50px;
}

button {
  background: linear-gradient(rgb(59, 215, 156), 45%, rgb(0, 173, 110));
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
  background-color: #0d3914;
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
  display: flex;
  list-style: none;
  padding: 0;
}

li {
  margin: 5px 0;
  padding: 5px;
  color: black;
}

.img-movie {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
}

.titre-movie {
  font-size: 20px;
  color: #ffffff;
}
</style>
