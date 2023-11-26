import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import SongsList from './components/SongsList.vue';
import SongDetails from './components/SongDetails.vue';
import store from './store';

const routes = [
    { path: '/', name: 'SongsList', component: SongsList, props: true },
    { path: '/songDetail/:id', name: 'SongDetails', component: SongDetails, props: true,  params: true },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
