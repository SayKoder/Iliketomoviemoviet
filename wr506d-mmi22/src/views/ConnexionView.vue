<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

// Variables réactives pour le formulaire
const email = ref('')
const password = ref('')
const message = ref('Bienvenue sur la page de connexion')
const conmsg = ref('Connexion')
const errorMessage = ref('')
const isLoggedIn = ref(false)
const storedEmail = ref('')

const router = useRouter()

onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    isLoggedIn.value = true
    storedEmail.value = localStorage.getItem('email') || ''
    message.value = 'Vous êtes déjà connecté !'
    conmsg.value = 'Déconnexion'
  }
})

const handleLogin = async () => {
  try {
    const response = await axios.post('http://symfony.mmi-troyes.fr:8319/api/login', {
      email: email.value,
      password: password.value
    })

    if (response.data.token) {
      console.log('Token reçu:', response.data.token)

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('email', email.value)

      isLoggedIn.value = true
      storedEmail.value = email.value
      message.value = 'Vous êtes connecté !'
      conmsg.value = 'déconnexion'

      router.push('/')
    }
  } catch (error) {
    errorMessage.value = 'Erreur lors de la connexion. Veuillez vérifier vos identifiants.'
    console.error('Erreur:', error)
  }
}

const handleLogout = () => {
  localStorage.removeItem('email')
  localStorage.removeItem('token')

  isLoggedIn.value = false
  storedEmail.value = ''
  message.value = 'Vous avez été déconnecté.'
  conmsg.value = 'Connexion'

  router.push('/connexion')
}
</script>

<template>
  <div class="connexion-container">
    <h1>{{ message }}</h1>

    <div v-if="isLoggedIn">
      <p>Vous êtes connecté en tant que {{ storedEmail }}.</p>
      <button @click="handleLogout" type="button">{{ conmsg }}</button>
    </div>

    <div v-else id="form-connexion">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Mot de passe" />
      <button @click="handleLogin" type="button">{{ conmsg }}</button>

      <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: #42b983;
}

.connexion-container {
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
  gap: 20px;
  max-width: 300px;
  margin: auto;
  margin-top: 50px;
}

#form-connexion {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin: auto;
}

#form-connexion input {
  padding: 10px;
  text-align: center;
}

button {
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #369c6e;
}
</style>
