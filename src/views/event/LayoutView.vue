<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type Event } from '@/types'
import EventService from '@/services/EventService'
import { useRoute } from 'vue-router'
const event = ref<Event | null>(null)
const route = useRoute()
onMounted(() => {
  EventService.getEvent(parseInt(route.params.id as string))
    .then((response) => {
      event.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
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