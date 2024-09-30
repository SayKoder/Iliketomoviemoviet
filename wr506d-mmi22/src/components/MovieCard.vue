<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import ActorCard from './ActorCard.vue';

let recup =ref([]);
let selectedActor = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get('http://symfony.mmi-troyes.fr:8319/api/movies');
    recup.value = response.data["hydra:member"];
  } catch (error) {
    console.error("Erreur lors de la récupération des films : ", error);
  }
});


</script>

<template>
  <div id="lit">
    <h1>Les derniers films</h1>
    <div v-if="recup.length > 0" class="movies-container">
        <div v-for="movie in recup.slice(-4)" :key="movie.id" class="movie-card">
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
  justify-content: space-between; /* Espacement égal entre les films */
  gap: 20px; /* Espacement entre les cartes de films */
  flex-wrap: wrap; /* Pour s'assurer que si l'écran est plus petit, les éléments vont à la ligne */
}

.movie-card {
  flex: 1;
  max-width: 22%; /* Chaque carte occupe environ 22% de la largeur pour 4 films */
  background-color: #f4f4f4; /* Fond légèrement gris pour différencier chaque carte */
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Ajout d'une ombre pour la profondeur */
  border-radius: 8px;
  text-align: center; /* Centrer les éléments à l'intérieur */
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
  border-radius: 5px; /* Bords arrondis pour l'image */
  margin-bottom: 10px;
}

p {
  font-size: 12px;
  color: #666;
}
</style>