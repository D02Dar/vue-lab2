<script setup lang="ts">
import type { Event } from '../types'
defineProps<{ event: Event }>()
</script>

<template>
  <div class="cat-org">
    <span class="category">{{ event.category }}</span>
    <span class="organizer">{{ event.organizer }}</span>
  </div>
</template>

<style scoped>
.cat-org {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 12px;
}
.category, .organizer {
  font-size: 16px;
  text-align: right;
}
</style> 