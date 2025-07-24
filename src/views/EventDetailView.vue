<script setup lang="ts">
import { ref, onMounted, defineProps, watch } from 'vue'
import { type Event } from '@/types'
import EventService from '../services/EventService'
import { useRouter } from 'vue-router'
const event = ref<Event|null>(null)
const allIds = ref<number[]>([])
const prevId = ref<number|null>(null)
const nextId = ref<number|null>(null)
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const router = useRouter()

async function loadEventAndIds(curId: number) {
  await EventService.getEvent(curId)
    .then((response) => {
      event.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
  await EventService.getAllEventIds()
    .then((response) => {
      allIds.value = response.data.map((e: Event) => Number(e.id)).sort((a, b) => a - b)
      const idx = allIds.value.indexOf(curId)
      prevId.value = idx > 0 ? allIds.value[idx - 1] : null
      nextId.value = idx >= 0 && idx < allIds.value.length - 1 ? allIds.value[idx + 1] : null
    })
    .catch((error) => {
      console.error('Error loading all event ids', error)
    })
}

onMounted(() => {
  loadEventAndIds(Number(props.id))
})

watch(() => props.id, (newId) => {
  loadEventAndIds(Number(newId))
})

function goTo(id: number|null) {
  if (id) router.push({ name: 'event-detail-view', params: { id: String(id) } })
}
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
    <div class="detail-pagination">
      <button v-if="prevId" @click="goTo(prevId)">&lt;&lt; Prev</button>
      <button v-if="nextId" @click="goTo(nextId)">Next &gt;&gt;</button>
    </div>
  </div>
</template>

<style scoped>
.detail-pagination {
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 16px;
}
.detail-pagination button {
  padding: 6px 18px;
  border-radius: 4px;
  border: 1px solid #2e3e50;
  background: #fff;
  color: #2e3e50;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}
.detail-pagination button:hover {
  background: #f0f0f0;
}
</style> 