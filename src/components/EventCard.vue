<script setup lang="ts">
import { type Event } from '@/types'
defineProps<{ event: Event }>()
</script>

<template>
  <RouterLink class="event-link" :to="{ name: 'event-detail-view', params: { id: String(event.id) } }">
    <div class="event-card">
      <h2>{{ event.title }}</h2>
      <span>{{ event.time }} on {{ event.date }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.event-link {
  text-decoration: none;
  color: #2e3e50;
}
</style>
