
import './assets/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import home from './views/home.vue'
import weather from './views/weather.vue'
import notam from './views/notam.vue'
import routesPage from './views/routes.vue'

import { createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'


const routes: Array<RouteRecordRaw> = [
    {path: '/', component: home},
    { path: '/weather', component: weather },
    { path: '/notams', component: notam},
    { path: '/routes', component: routesPage}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App)

app.use(router)

app.mount('#app')
