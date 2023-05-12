<script setup lang="ts">
import 'flowbite'
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import navbar from '../components/navbar.vue'
import type { WindType, WxType, RouteType } from '../types'
onMounted(() => {
  initFlowbite()
})
</script>
<script lang="ts">
const baseURL = 'http://localhost:3000'

export default {
  props: {
    msg: String
  },
  data() {
    return {
      routes: {} as RouteType,
      dept_icao: '',
      dest_icao: '',
      loading: true
    }
  },
  methods: {
    fetchData() {
      fetch(`${baseURL}/routes?dept=${this.dept_icao}&dest=${this.dest_icao}`, {
        method: 'GET'
      })
        .then((response) => {
          response.json().then((data) => {
            console.log(data)
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
    <navbar></navbar>
    <main>
      <div class="px-6 pb-6 pt-4 mt-6 bg-white">
        <h1>
          <h5 class="mb-2 text-4xl font-bold">Route Finder</h5>
          <div class="h-1 w-64 bg-blue-300 rounded"></div>
        </h1>
  
        <form class="flex flex-col mt-12" @submit.enter.prevent>
          <div class="flex items-center">
            <div class="relative w-full mr-2">
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
                v-model="dept_icao"
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
                v-model="dest_icao"
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
          <ul v-if="!loading" class="my-4 space-y-3">
            <li v-for="route in routes">
              <div class="flex-grow border border-blue-300 overflow-hidden shadow-md rounded-lg">
                <div class="px-4 py-5 sm:p-6 mx-auto">
                  <h3 class="text-sm font-medium text-gray-500 truncate">Route</h3>
                  <p class="mt-1 text-xl font-semibold text-gray-900">{{  }}</p>
                </div>
              </div>
            </li>
          </ul>
        </form>
      </div>
    </main>
  </template>
  