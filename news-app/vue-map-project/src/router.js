// router.js
import { createRouter, createWebHistory } from 'vue-router';
import MapComponent from './components/MapComponent.vue';
import CountryDetail from './components/CountryDetail.vue';

const routes = [
  { path: '/', name: 'MapComponent', component: MapComponent },
  { path: '/country/:countryName', name: 'CountryDetail', component: CountryDetail, props: true }, // Ensure props: true is set
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
