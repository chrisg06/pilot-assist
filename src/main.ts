
import './assets/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import home from './views/home.vue'

const weatherCard = () => import('./components/WeatherCard.vue')
import routeCard from './components/routeCard.vue'
import { createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'

const Weather = {template: weatherCard }
const routeTool = {template: routeCard }

const routes: Array<RouteRecordRaw> = [
    {path: '/', component: home},
    { path: '/weather', component: Weather },
    { path: '/routes', component: routeTool }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App)

app.use(router)

app.mount('#app')
