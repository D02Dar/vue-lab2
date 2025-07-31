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
.event-card {
  padding: 20px;
  width: 320px;
  margin-bottom: 18px;
  border: 1px solid #39495c;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
}
.event-card:hover {
  box-shadow: 0 6px 24px 0 rgba(0,0,0,0.15);
  transform: translateY(-2px) scale(1.01);
}
</style>
