<script setup lang="ts">
import 'flowbite'
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

onMounted(() => {
  initFlowbite()
})
</script>
<script lang="ts">
const baseURL = 'http://localhost:3000'

interface Route {
  id: number
  dept: string
  dest: string
  acft: string
  route: string
  notes: string
}

export default {
  props: {
    msg: String
  },
  data() {
    return {
      dept: '',
      dest: '',
      loading: true,
      routes: [] as Route[]
    }
  },
  methods: {
    fetchData() {
      fetch(`${baseURL}/routes?dept=${this.dept}&dest=${this.dest}`, {
        method: 'GET'
      })
        .then((response) => {
          response.json().then((data) => {
            this.routes = data.routes
            this.loading = false
          })
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }
}
</script>

<template>
  <div
    class="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <h1 href="#">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Route Finder
      </h5>
    </h1>

    <form class="flex flex-col">
      <div class="flex items-center">
        <div class="relative w-full">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            v-model="dept"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Departure"
          />
        </div>
        <div class="relative w-full ml-2">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            v-model="dest"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Destination"
          />
        </div>
        <button
          @click="fetchData"
          type="button"
          class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <span class="sr-only">Search</span>
        </button>
      </div>
      <ul class="my-4 space-y-3">
        <div class="row">

            <div class="flex items-center col-md p-3 mb-2 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group dark:text-white">
              <p class="flex-1 ml-2 whitespace-normal">Departure</p>
              <p class="flex-1 ml-4 whitespace-normal">Arrival</p>
              <p class="flex-1 ml-4 whitespace-normal">Aircraft Type</p>
              <p class="flex-1 ml-4 whitespace-normal">Route</p>
              <p class="flex-1 ml-4 whitespace-normal">Notes</p>
            </div>

          <li>
            <div
              v-if="!loading"
              v-for="route in routes"
              :key="route.id"
              class="flex items-center p-3 mb-2 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group dark:text-white"
            >
              <p class="flex-1 ml-3 whitespace-normal">{{ route.route }}</p>
            </div>
          </li>
        </div>
      </ul>
    </form>
  </div>
</template>
