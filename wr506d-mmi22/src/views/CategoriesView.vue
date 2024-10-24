<script lang="js" setup>
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'

const message = 'Bienvenue sur la page des catégories'
const searchQuery = ref('')

const recup = ref([])
const selectedCategory = ref(null)
const newCategoryTitle = ref('')

// Modals pour CRUD
const showDeleteModal = ref(false)
const showEditModal = ref(false)
const showAddModal = ref(false)

onMounted(async () => {
  try {
    const response = await axios.get('http://symfony.mmi-troyes.fr:8319/api/categories')
    recup.value = response.data['hydra:member']
    console.log('Data retrieved from API:', recup.value) // Add this log
  } catch (error) {
    console.error('Error retrieving categories: ', error)
  }
})

const filteredCategories = computed(() => {
  return recup.value.filter((category) =>
    category.titre.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

async function addCategory() {
  try {
    const response = await axios.post('http://symfony.mmi-troyes.fr:8319/api/categories', {
      titre: newCategoryTitle.value
    })
    recup.value.push(response.data)
    newCategoryTitle.value = ''
    showAddModal.value = false
  } catch (error) {
    console.error('Error adding category: ', error)
  }
}

async function updateCategory() {
  try {
    console.log('selectedCategory.value avant la mise à jour:', selectedCategory.value)
    if (!selectedCategory.value.createdAt) {
      console.error('Valeur indefinie ou manquante (CreatedAt)')
      return
    }

    const updatedAt = new Date().toISOString()

    const response = await axios.patch(
      `http://symfony.mmi-troyes.fr:8319/api/categories/${selectedCategory.value.id}`,
      {
        titre: newCategoryTitle.value
      },
      {
        headers: {
          'Content-Type': 'application/merge-patch+json'
        }
      }
    )

    const index = recup.value.findIndex((cat) => cat.id === selectedCategory.value.id)
    recup.value[index] = response.data

    selectedCategory.value = null
    newCategoryTitle.value = ''
    showEditModal.value = false
  } catch (error) {
    if (error.response) {
      console.error(`Error during modification: ${error.response.status}`, error.response.data)
    } else {
      console.error('Unknown error during modification', error)
    }
  }
}

async function deleteCategory() {
  try {
    await axios.delete(
      `http://symfony.mmi-troyes.fr:8319/api/categories/${selectedCategory.value.id}`
    )
    recup.value = recup.value.filter((category) => category.id !== selectedCategory.value.id)
    showDeleteModal.value = false
    selectedCategory.value = null
  } catch (error) {
    console.error('Error deleting category: ', error)
  }
}

function openEditModal(category) {
  selectedCategory.value = { ...category }
  newCategoryTitle.value = category.titre
  showEditModal.value = true

  // Vérifiez la présence de `createdAt`
  console.log(
    "Valeur de la catégorie sélectionnée lors de l'ouverture du modal :",
    selectedCategory.value
  )

  // Si `createdAt` est manquant, émettre un avertissement
  if (!selectedCategory.value.createdAt) {
    console.warn('createdAt est manquant ou non défini')
  }
}

function openDeleteModal(category) {
  selectedCategory.value = category
  showDeleteModal.value = true
}
</script>

<template>
  <div>
    <h1>{{ message }}</h1>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Rechercher d'une catégorie..."
      class="search-bar"
    />

    <p>Liste des catégories :</p>

    <div v-if="filteredCategories.length > 0" class="category-container">
      <div v-for="category in filteredCategories" :key="category.id" class="category-card">
        <h3>{{ category.titre }}</h3>
        <button class="green-button" @click="openEditModal(category)">Modifier</button>
        <button class="red-button" @click="openDeleteModal(category)">Supprimer</button>
      </div>
    </div>

    <p v-else>Aucune catégorie trouvée</p>
    <button class="green-button" @click="showAddModal = true">Ajouter une catégorie</button>

    <div v-if="showDeleteModal" class="modal">
      <div class="modal-content">
        <p>Êtes-vous sûr de vouloir supprimer cette catégorie ?</p>
        <button class="red-button" @click="deleteCategory">Supprimer</button>
        <button class="green-button" @click="showDeleteModal = false">Retour</button>
      </div>
    </div>

    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <p>Modifier la catégorie :</p>
        <input v-model="newCategoryTitle" placeholder="Titre de la catégorie" />
        <button class="green-button" @click="updateCategory">Modifier</button>
        <button class="red-button" @click="showEditModal = false">Annuler</button>
      </div>
    </div>

    <div v-if="showAddModal" class="modal">
      <div class="modal-content">
        <p>Ajouter une nouvelle catégorie :</p>
        <input v-model="newCategoryTitle" placeholder="Titre de la catégorie" />
        <button class="green-button" @click="addCategory">Ajouter</button>
        <button class="red-button" @click="showAddModal = false">Annuler</button>
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

.category-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.category-card {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  flex-direction: column;
  max-width: 22%;
  background-color: #f4f4f4;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: transform 0.3s;
}
.category-card:hover {
  transform: scale(1.05);
  transition: transform 0.3s;
}

.red-button {
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 5px 0;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.red-button:hover {
  background: #ff3333;
}

.green-button {
  background: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 5px 0;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.green-button:hover {
  background: #ff3333;
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
  background: #ff4d4d;
  padding: 20px;
  border-radius: 8px;
  color: white;
  text-align: center;
}

.modal-content button {
  background: white;
  color: #ff4d4d;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.modal-content button:hover {
  background: #ffcccc;
}

p {
  font-size: 30px;
}
</style>
