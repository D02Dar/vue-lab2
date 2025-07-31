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
      <div id="flashMessage" v-if="message" class="animate-fade">
        <h4>{{ message }}</h4>
      </div>
      <h1>Deploy with Vercel</h1>
      <div class="wrapper">
        <nav class="bg-white shadow-lg rounded-lg p-4">
          <RouterLink to="/" class="font-bold text-gray-700" exact-active-class="text-green-500">Home</RouterLink>
          <RouterLink :to="{ name: 'about' }" class="font-bold text-gray-700" exact-active-class="text-green-500">About</RouterLink>
          <RouterLink to="/students" class="font-bold text-gray-700" exact-active-class="text-green-500">Student</RouterLink>
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

</style>
