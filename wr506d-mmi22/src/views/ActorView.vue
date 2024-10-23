<script setup>
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import ActorCard from '../components/ActorCard.vue'

const message = 'Bienvenue sur la page des acteurs'
const searchQuery = ref('')

const recup = ref([])
const router = useRouter()

const goToDetails = (actorId) => {
  router.push(`/actors/${actorId}`)
}

const filteredActors = computed(() => {
  return recup.value.filter((actor) =>
    actor.firstname.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<template>
  <div>
    <h1>{{ message }}</h1>

    <input
      type="text"
      v-model="searchQuery"
      placeholder="Rechercher un acteur..."
      class="search-bar"
    />
    <p>Liste des acteurs :</p>

    <ActorCard v-slot="{ actors: filteredActors }">
      <div v-if="filteredActors.length > 0" class="actors-container">
        <div
          v-for="actor in filteredActors"
          :key="actor.id"
          class="actor-card"
          @click="goToDetails(actor.id)"
        >
          <h3>{{ actor.firstname }} {{ actor.lastname }}</h3>
          <img v-if="actor.media" :src="actor.media" alt="Photo de l'acteur" />
        </div>
      </div>
      <p v-else>Aucun acteur trouvé</p>
    </ActorCard>
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

.actors-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.actor-card {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 22%;
  background-color: #f4f4f4;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: transform 0.3s;
}
.actor-card:hover {
  transform: scale(1.05);
  transition: transform 0.3s;
}

img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
}

p {
  font-size: 30px;
}
</style>
