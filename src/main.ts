
import './assets/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import home from './views/home.vue'
import weather from './views/weather.vue'

import routeCard from './components/routeCard.vue'
import { createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'


const routes: Array<RouteRecordRaw> = [
    {path: '/', component: home},
    { path: '/weather', component: weather },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App)

app.use(router)

app.mount('#app')
