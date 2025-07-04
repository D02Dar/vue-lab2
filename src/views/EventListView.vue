<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <CategoryOrganizer v-for="event in events" :key="'catorg-' + event.id" :event="event" />
  </div>
</template>

<script setup lang="ts">
import EventCard from '../components/EventCard.vue'
import CategoryOrganizer from '../components/CategoryOrganizer.vue'
import type { Event } from '../types'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const events = ref<Event[]>([])

onMounted(async () => {
  try {
    const response = await axios.get('https://my-json-server.typicode.com/D02Dar/vue-lab2db/events')
    events.value = response.data
    console.log('Events loaded from mock server:', response.data)
  } catch (error) {
    console.error('Error loading events:', error)
  }
})
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style> 