<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useEventStore } from '@/stores/event'
import { useRoute } from 'vue-router'
const route = useRoute()
const store = useEventStore()
const { event } = storeToRefs(store)
</script>
<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <nav>
      <router-link :to="{ name: 'event-detail-view' }">Details</router-link>
      |
      <router-link :to="{ name: 'event-register-view' }">Register</router-link>
      |
      <router-link :to="{ name: 'event-edit-view' }">Edit</router-link>
    </nav>
    <RouterView :event="event" :id="route.params.id" />
  </div>
</template> 