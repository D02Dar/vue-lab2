<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
const store = useMessageStore()
const { message } = storeToRefs(store)
</script>

<template>
  <div id="layout">
    <header>
      <div id="flashMessage" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink> |
          <RouterLink :to="{ name: 'about' }">About</RouterLink> |
          <RouterLink to="/students">Student</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style>
#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 2rem;
  color: #2c3e50;
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
  color: #2c3e50;
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
