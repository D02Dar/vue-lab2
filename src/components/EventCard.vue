<script setup lang="ts">
import { type Event } from '@/types'
defineProps<{ event: Event }>()
</script>

<template>
  <RouterLink class="event-link" :to="{ name: 'event-detail-view', params: { id: String(event.id) } }">
    <div class="cursor-pointer border border-gray-600 p-4 w-64 mb-6 hover:scale-101 hover:shadow-sp bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg">
      <h2 class="text-xl font-bold mb-2">{{ event.title }}</h2>
      <span class="text-purple-100">@{{ event.time }} on {{ event.date }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.event-link {
  text-decoration: none;
  color: #2e3e50;
}
</style>
