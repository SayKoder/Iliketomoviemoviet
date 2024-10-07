import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import MovieView from '../views/MovieView.vue';
import ActorView from '../views/ActorView.vue';
import CategoriesView from '../views/CategoriesView.vue';
import ProfilView from '../views/ProfilView.vue';
import MovieCard from '@/components/MovieCard.vue';
import MovieDetails from '@/views/MovieDetails.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/movies',
      name: 'movies',
      component: MovieView
    },
    {
      path: '/actors',
      name: 'actors',
      component: ActorView
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesView
    },
    {
      path: '/profil',
      name: 'profil',
      component: ProfilView
    },
    {
      path: '/',
      component: MovieCard,
    },
    {
      path: '/movies/:id',
      component: MovieDetails,
      props: true, // Pour passer l'id comme prop
    },
  ]
  })

export default router;
