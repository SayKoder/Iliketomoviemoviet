<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const movieId = ref(route.params.id)
const movieDetails = ref(null)
const actors = ref([])

let selectedActor = ref(null)
const message = 'Bienvenue sur la page des détails des films'

const formatDate = (dateString: string, format: string = 'iso') => {
  const date = new Date(dateString)

  if (format === 'long') {
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) // Ex: 3 juillet 2023
  } else {
    return date.toLocaleDateString('fr-CA') // Ex: 2023-07-03 (format ISO court)
  }
}

onMounted(async () => {
  try {
    const response = await axios.get(
      `http://symfony.mmi-troyes.fr:8319/api/movies/${movieId.value}`
    )
    console.log(response.data)
    movieDetails.value = response.data //Stockage des détails du film
    const actorDetails = movieDetails.value.actors.map(async (actorUrl: string) => {
      const actorResponse = await axios.get(`http://symfony.mmi-troyes.fr:8319${actorUrl}`)
      return actorResponse.data
    })

    actors.value = await Promise.all(actorDetails) //Stockage des détails des acteurs
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
      <div class="left-column">
        <h2>{{ movieDetails.title }}</h2>
        <img v-if="movieDetails.media" :src="movieDetails.media" alt="Affiche du film" />
        <p>{{ movieDetails.description }}</p>
        <p><strong>Date de sortie :</strong> {{ formatDate(movieDetails.releaseDate, 'long') }}</p>
        <p><strong>Genre :</strong> {{ movieDetails.genre }}</p>
      </div>
      <div class="right-column">
        <p><strong>Acteurs du film :</strong></p>
        <ul v-if="actors.length > 0">
          <li v-for="actor in actors" :key="actor.id">
            <h3 class="titre-actor">{{ actor.firstname }} {{ actor.lastname }}</h3>
            <img
              class="img-actor"
              v-if="actor.media"
              :src="actor.media"
              alt="Affiche de l'acteur"
            />
          </li>
        </ul>
        <p v-else>Aucun acteur</p>
      </div>
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

.detailMovie:hover {
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

.img-actor {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
}

.titre-actor {
  font-size: 20px;
  color: #4b2109;
}
</style>
