<script setup>
import ActorCard from './ActorCard.vue'
import { useRouter } from 'vue-router'
import MovieCard from './MovieCard.vue'

const router = useRouter()

const goToDetails = (actorId) => {
  router.push(`/actors/${actorId}`)
}

const goToDetails2 = (movieId) => {
  router.push(`/movies/${movieId}`)
}
</script>

<template>
  <div id="homepage">
    <h1>Page d'accueil</h1>
    <MovieCard v-slot="{ movies }">
      <div v-if="movies.length > 0" class="movies-container">
        <div
          v-for="movie in movies.slice(-4)"
          :key="movie.id"
          class="movie-card"
          @click="goToDetails2(movie.id)"
        >
          <h2>{{ movie.title }}</h2>
          <img v-if="movie.media" :src="movie.media" alt="Affiche du film" />
          <p>{{ movie.description }}</p>
        </div>
      </div>

      <p v-else>Aucun acteur trouvé</p>
    </MovieCard>

    <h1>Les derniers Acteurs</h1>
    <ActorCard v-slot="{ actors }">
      <div v-if="actors.length > 0" class="actor-container">
        <div
          v-for="actor in actors.slice(-4)"
          :key="actor.id"
          class="actor-card"
          @click="goToDetails(actor.id)"
        >
          <h2>{{ actor.firstname }} {{ actor.lastname }}</h2>
          <img v-if="actor.media" :src="actor.media" alt="Photo de l'acteur" />
        </div>
      </div>

      <p v-else>Aucun acteur trouvé</p>
    </ActorCard>
    <MovieCard v-if="selectedActor" :actor="selectedActor" />
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
  text-align: center;
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

.actor-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.actor-card {
  flex: 1;
  max-width: 22%;
  background-color: #f4f4f4;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
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
  border-radius: 5px;
  margin-bottom: 10px;
}

p {
  font-size: 12px;
  color: #666;
}
</style>
