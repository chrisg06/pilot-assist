<script setup lang="ts">
import navbar from './components/navbar.vue'
import weatherCard from './components/WeatherCard.vue'
import routeCard from './components/routeCard.vue'
</script>

<template>
  <main class="bg-white px-10">
    <navbar />
    <div class="flex justify-center mx-36">
      <router-view></router-view>
    </div>


  </main>

</template>
