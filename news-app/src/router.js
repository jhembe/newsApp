import { createRouter, createWebHistory } from 'vue-router';
import NewsList from './components/NewsList.vue';
import LikedNews from './components/LikedNews.vue';

const routes = [
  { path: '/', component: NewsList },
  { path: '/liked-news', component: LikedNews },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;


// import { createRouter, createWebHistory } from 'vue-router';
// import NewsList from '../components/NewsList.vue';
// import LikedNews from '../components/LikedNews.vue';

// const routes = [
//   { path: '/', component: NewsList },
//   { path: '/liked-news', component: LikedNews

