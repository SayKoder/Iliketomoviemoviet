<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'
import ActorCard from '../components/ActorCard.vue'

const message = 'Bienvenue sur la page des acteurs'
const searchQuery = ref('')

const router = useRouter()
const newActorFirstname = ref('')
const newActorLastname = ref('')

const selectedActor = ref(null)
const recup = ref([])

// Modals pour CRUD
const showDeleteModal = ref(false)
const showEditModal = ref(false)
const showAddModal = ref(false)

//Fonction redirection détails acteurs
const goToDetails = (actorId) => {
  router.push(`/actors/${actorId}`)
}

async function addActor() {
  try {
    const response = await axios.post('http://symfony.mmi-troyes.fr:8319/api/actors', {
      firstname: newActorFirstname.value,
      lastname: newActorLastname.value
    })
    recup.value.push(response.data)
    newActorFirstname.value = ''
    newActorLastname.value = ''
    showAddModal.value = false
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'acteur : ", error)
  }
}

async function updateActor() {
  try {
    const response = await axios.put(
      `http://symfony.mmi-troyes.fr:8319/api/actors/${selectedActor.value.id}`,
      {
        firstname: newActorFirstname.value,
        lastname: newActorLastname.value
      }
    )
    const index = actorsList.value.findIndex((actor) => actor.id === selectedActor.value.id)
    actorsList.value[index] = response.data
    selectedActor.value = null
    newActorFirstname.value = ''
    newActorLastname.value = ''
    showEditModal.value = false
  } catch (error) {
    console.error("Erreur lors de la modification de l'acteur : ", error)
  }
}

async function deleteActor() {
  try {
    await axios.delete(`http://symfony.mmi-troyes.fr:8319/api/actors/${selectedActor.value.id}`)
    recup.value = recup.value.filter((actor) => actor.id !== selectedActor.value.id)
    showDeleteModal.value = false
    selectedActor.value = null
  } catch (error) {
    console.error("Erreur lors de la suppression de l'acteur : ", error)
  }
}

function openEditModal(actor) {
  selectedActor.value = { ...actor }
  newActorFirstname.value = actor.firstname
  newActorLastname.value = actor.lastname
  showEditModal.value = true

  // Vérifiez la présence de `createdAt`
  console.log(
    "Valeur de la catégorie sélectionnée lors de l'ouverture du modal :",
    selectedActor.value
  )

  // Si `createdAt` est manquant, émettre un avertissement
  if (!selectedActor.value.createdAt) {
    console.warn('createdAt est manquant ou non défini')
  }
}

function openDeleteModal(actor) {
  selectedActor.value = actor
  showDeleteModal.value = true
}
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

    <ActorCard v-slot="{ actors }">
      <div v-if="actors.length > 0" class="actors-container">
        <div
          v-for="actor in actors.filter(
            (actor) =>
              actor.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
              actor.lastname.toLowerCase().includes(searchQuery.toLowerCase())
          )"
          :key="actor.id"
          class="actor-card"
        >
          <h3>{{ actor.firstname }} {{ actor.lastname }}</h3>
          <img
            v-if="actor.media"
            :src="actor.media"
            @click="goToDetails(actor.id)"
            alt="Photo de l'acteur"
          />
          <button class="green-button" @click.stop="openEditModal(actor)">Modifier</button>
          <button class="red-button" @click.stop="openDeleteModal(actor)">Supprimer</button>
        </div>
      </div>

      <p v-else>Aucun acteur trouvé</p>
    </ActorCard>

    <button class="green-button" @click="showAddModal = true">Ajouter un acteur</button>

    <div v-if="showDeleteModal" class="modal">
      <div class="modal-content">
        <p>Êtes-vous sûr de vouloir supprimer cette catégorie ?</p>
        <button class="red-button" @click="deleteActor">Supprimer</button>
        <button class="green-button" @click="showDeleteModal = false">Retour</button>
      </div>
    </div>

    <div v-if="showAddModal" class="modal">
      <div class="modal-content">
        <p>Ajouter un nouvel acteur :</p>
        <input v-model="newActorFirstname" placeholder="Prénom" />
        <input v-model="newActorLastname" placeholder="Nom" />
        <button class="green-button" @click="addActor">Ajouter</button>
        <button class="red-button" @click="showAddModal = false">Annuler</button>
      </div>
    </div>

    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <p>Modifier l'acteur :</p>
        <input v-model="newActorFirstname" placeholder="Prénom" />
        <input v-model="newActorLastname" placeholder="Nom" />
        <button class="green-button" @click="updateActor">Modifier</button>
        <button class="red-button" @click="showEditModal = false">Annuler</button>
      </div>
    </div>
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

.red-button,
.green-button {
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.red-button {
  background: #ff4d4d;
}

.green-button {
  background: #42b983;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
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
