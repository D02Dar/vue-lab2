<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
const store = useMessageStore()
const { message } = storeToRefs(store)
</script>

<template>
  <div id="layout" class="text-center font-sans text-gray-700 antialias">
    <header>
      <div id="flashMessage" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <div class="wrapper">
        <nav class="bg-white shadow-lg rounded-lg p-4">
          <RouterLink to="/" class="text-green-600 hover:text-green-800 font-medium px-4 py-2 rounded-md hover:bg-green-50 transition-colors">Home</RouterLink>
          <RouterLink :to="{ name: 'about' }" class="text-gray-600 hover:text-gray-800 font-medium px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">About</RouterLink>
          <RouterLink to="/students" class="text-gray-600 hover:text-gray-800 font-medium px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">Student</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style>
#layout {
  margin-top: 2rem;
}
nav {
  width: 100%;
  font-size: 12px;
  padding: 30px;
}
nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  font-weight: bold;
}
nav a:first-of-type {
  border: 0;
}
nav a.router-link-exact-active {
  color: #42b983;
  }
h2 {
  font-size: 20px;
}
@keyframes yellofade {
  from { background-color: yellow; }
  to { background-color: transparent; }
}
#flashMessage {
  animation: yellofade 3s ease-in-out;
}
</style>
