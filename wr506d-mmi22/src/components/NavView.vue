<script lang="ts" setup>
import { useAuthStore } from '../stores/auth'
import { watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
  router.push('/')
}

watchEffect(() => {
  authStore.checkAuth()
})
</script>

<template>
  <div class="wrapper">
    <nav>
      <div class="logo-container">
        <router-link to="/">
          <img src="@/assets/logo_iltmm.png" alt="Logo ILTMM" class="logo-img" />
        </router-link>
      </div>
      <div class="nav-links"></div>
      <ul>
        <li class="cyan"><router-link to="/" exact>Accueil</router-link></li>
        <li class="yellow"><router-link to="/movies">Movies</router-link></li>
        <li class="yellow"><router-link to="/actors">Actor</router-link></li>
        <li class="yellow"><router-link to="/categories">Catégories</router-link></li>
        <li v-if="authStore.isAuthenticated" class="cyan">
          <router-link to="/" @click.prevent="logout">Déconnexion</router-link>
        </li>
        <li class="cyan" v-else>
          <router-link to="/connexion">Connexion</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Baloo&display=swap');

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav {
  display: flex;
  align-items: center;
}

.logo-container {
  margin-right: 20px;
}

.logo-container img.logo-img {
  height: 130px;
}

nav ul {
  display: flex;
  flex-direction: row;
  gap: 20px;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.yellow {
  background: linear-gradient(rgb(236, 192, 59), 45%, rgb(255, 95, 15));
}

.cyan {
  background: rgb(59, 215, 156);
  background: linear-gradient(rgb(59, 215, 156), 45%, rgb(0, 173, 110));
}
nav ul li {
  display: inline;
  margin: 10px 0;
  padding: 10px;
  border-radius: 25px;
  text-align: center;
}

nav ul li a {
  font-size: 23px;
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-family: 'Fredoka One', cursive;
}

nav ul li a:hover {
  color: white;
}

nav ul li:last-child {
  margin-left: 30px;
}

.wrapper .logo {
  margin-right: 20px;
}
</style>
