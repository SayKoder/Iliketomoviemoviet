<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

let recup =ref([]);
onMounted(async () => {
  try {
    const response = await axios.get('http://symfony.mmi-troyes.fr:8319/api/actors');
    recup.value = response.data["hydra:member"];
  } catch (error) {
    console.error("Erreur lors de la récupération des acteurs : ", error);
  }

});

</script>

<template>
  <div id="lit">
    <h1>Les derniers acteurs en liste</h1>
    <div v-if="recup.length > 0" class="actor-container">
        <div v-for="actor in recup.slice(-4)" :key="actor.id" class="actor-card">
        <h2>{{ actor.firstname }} {{ actor.lastname }}</h2>
        <img v-if="actor.media" :src="actor.media" alt="Photo de l'acteur" />
        </div>
    </div>

    <p v-else>Aucun acteurs</p>
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

.actor-container {
  display: flex;
  justify-content: space-between; /* Espacement égal entre les films */
  gap: 20px; /* Espacement entre les cartes de films */
  flex-wrap: wrap; /* Pour s'assurer que si l'écran est plus petit, les éléments vont à la ligne */
}

.actor-card {
  flex: 1;
  max-width: 22%; /* Chaque carte occupe environ 22% de la largeur pour 4 films */
  background-color: #f4f4f4; /* Fond légèrement gris pour différencier chaque carte */
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Ajout d'une ombre pour la profondeur */
  border-radius: 8px;
  text-align: center; /* Centrer les éléments à l'intérieur */
  transition: transform 0.3s;
}
.actor-card:hover {
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