<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const recup = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('http://symfony.mmi-troyes.fr:8319/api/actors')
    recup.value = response.data['hydra:member']
  } catch (error) {
    console.error('Erreur lors de la récupération des acteurs : ', error)
  }
})
</script>

<template>
  <slot :actors="recup"></slot>
</template>
