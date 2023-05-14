<script setup lang="ts">
import 'flowbite'
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import navbar from '../components/navbar.vue'
import type { WindType, WxType } from '../types'
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
      metar: '',
      taf: '',
      icao: '',
      wind: {} as WindType,
      temp: '',
      dewpoint: '',
      wx: {} as WxType,
      qnh: '',
      loading: true,
      selected: 'Metar'
    }
  },
  methods: {
    fetchData() {
      fetch(`${baseURL}/weather/${this.icao}`, {
        method: 'GET'
      })
        .then((response) => {
          response.json().then((data) => {
            console.log(data)
            this.metar = data.metar
            this.taf = data.taf
            this.wind = data.weather.wind
            this.temp = data.weather.temp
            this.dewpoint = data.weather.dewpoint
            this.wx = data.weather.wx
            this.qnh = data.weather.qnh
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
        <h5 class="mb-2 text-4xl font-bold">Weather Finder</h5>
        <div class="h-1 w-64 bg-blue-300 rounded"></div>
      </h1>

      <form class="flex flex-col mt-12" @submit.enter.prevent>
        <div class="flex items-center">
          <div class="bg-white shadow mr-2">
            <select v-model="selected" class="py-2 text-sm text-gray-700 rounded-md">
              <option>Metar</option>
              <option>TAF</option>
            </select>
          </div>

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
              @keyup.enter="fetchData"
              type="text"
              v-model="icao"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
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
        <ul v-if="!loading && selected == 'Metar'" class="my-4 space-y-3">
          <li>
            <div class="flex-grow border border-blue-300 overflow-hidden shadow-md rounded-lg">
              <div class="px-4 py-5 sm:p-6 mx-auto">
                <h3 class="text-sm font-medium text-gray-500 truncate">Raw Metar</h3>
                <p class="mt-1 text-xl font-semibold text-gray-900">{{ metar }}</p>
              </div>
            </div>
          </li>

          <div class="grid grid-cols-2 gap-4">
            <li
              v-if="wind.direction"
              class="flex-grow border border-blue-300 overflow-hidden shadow-md rounded-lg"
            >
              <div class="px-4 py-5 sm:p-6 mx-auto">
                <h3 class="text-sm font-medium text-gray-500 truncate">Wind Direction</h3>
                <p class="mt-1 text-xl font-semibold text-gray-900">{{ wind.direction }}°</p>
              </div>
            </li>
            <li
              v-if="wind.speed"
              class="flex-grow border border-blue-300 overflow-hidden shadow-md rounded-lg"
            >
              <div class="px-4 py-5 sm:p-6 mx-auto">
                <h3 class="text-sm font-medium text-gray-500 truncate">Wind Speed</h3>
                <p class="mt-1 text-xl font-semibold text-gray-900">{{ wind.speed }}</p>
              </div>
            </li>
            <li
              v-if="temp"
              class="flex-grow border border-blue-300 overflow-hidden shadow-md rounded-lg"
            >
              <div class="px-4 py-5 sm:p-6 mx-auto">
                <h3 class="text-sm font-medium text-gray-500 truncate">Temperature</h3>
                <p class="mt-1 text-xl font-semibold text-gray-900">{{ temp }}</p>
              </div>
            </li>
            <li
              v-if="dewpoint"
              class="flex-grow border border-blue-300 overflow-hidden shadow-md rounded-lg"
            >
              <div class="px-4 py-5 sm:p-6 mx-auto">
                <h3 class="text-sm font-medium text-gray-500 truncate">Dewpoint</h3>
                <p class="mt-1 text-xl font-semibold text-gray-900">{{ dewpoint }}</p>
              </div>
            </li>

            <li
              v-if="wx.wx !== null"
              class="flex-grow border border-blue-300 overflow-hidden shadow-md rounded-lg"
            >
              <div class="px-4 py-5 sm:p-6 mx-auto">
                <h3 class="text-sm font-medium text-gray-500 truncate">Weather</h3>
                <p class="mt-1 text-xl font-semibold text-gray-900" v-for="weather in wx.wx">
                  {{ weather }}
                </p>
              </div>
            </li>
            <li
              v-if="wx.cld"
              class="flex-grow border border-blue-300 overflow-hidden shadow-md rounded-lg"
            >
              <div class="px-4 py-5 sm:p-6 mx-auto">
                <h3 class="text-sm font-medium text-gray-500 truncate">Cloud</h3>
                <div class="flex justify-start">
                  <p class="mt-1 text-xl font-semibold text-gray-900 mr-3" v-for="cld in wx.cld">
                    {{ cld }}
                  </p>
                </div>
              </div>
            </li>
            <li
              v-if="wx.vis"
              class="flex-grow border border-blue-300 overflow-hidden shadow-md rounded-lg"
            >
              <div class="px-4 py-5 sm:p-6 mx-auto">
                <h3 class="text-sm font-medium text-gray-500 truncate">Visibility</h3>
                <p class="mt-1 text-xl font-semibold text-gray-900">{{ wx.vis }}</p>
              </div>
            </li>
            <li
              v-if="qnh"
              class="flex-grow border border-blue-300 overflow-hidden shadow-md rounded-lg"
            >
              <div class="px-4 py-5 sm:p-6 mx-auto">
                <h3 class="text-sm font-medium text-gray-500 truncate">QNH</h3>
                <p class="mt-1 text-xl font-semibold text-gray-900">{{ qnh }}</p>
              </div>
            </li>
          </div>
        </ul>
        <ul v-if="!loading && selected == 'TAF'" class="my-4 space-y-3">
          <li>
            <div class="flex-grow border border-blue-300 overflow-hidden shadow-md rounded-lg">
              <div class="px-4 py-5 sm:p-6 mx-auto">
                <h3 class="text-sm font-medium text-gray-500 truncate">TAF</h3>
                <p class="mt-1 text-xl font-semibold text-gray-900">{{ taf }}</p>
              </div>
            </div>
          </li>
        </ul>
      </form>
    </div>
  </main>
</template>
