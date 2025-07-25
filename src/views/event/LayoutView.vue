<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useEventStore } from '@/stores/event'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import EventService from '@/services/EventService'
import { ref, onMounted, watch } from 'vue'
const route = useRoute()
const router = useRouter()
const store = useEventStore()
const { event } = storeToRefs(store)
const allIds = ref<number[]>([])
const prevId = ref<number|null>(null)
const nextId = ref<number|null>(null)

async function updatePrevNext(id: number) {
  const res = await EventService.getAllEventIds()
  allIds.value = res.data.map((e: any) => Number(e.id)).sort((a, b) => a - b)
  const idx = allIds.value.indexOf(id)
  prevId.value = idx > 0 ? allIds.value[idx - 1] : null
  nextId.value = idx >= 0 && idx < allIds.value.length - 1 ? allIds.value[idx + 1] : null
}

onMounted(() => {
  if (event.value) updatePrevNext(Number(route.params.id))
})
watch(() => route.params.id, (newId) => {
  if (event.value) updatePrevNext(Number(newId))
})
function goTo(id: number|null) {
  if (id) router.push({ name: 'event-detail-view', params: { id: String(id) } })
}

onBeforeRouteUpdate((to, from, next) => {
  const id = Number(to.params.id)
  EventService.getEvent(id)
    .then((response) => {
      store.setEvent(response.data)
      updatePrevNext(id)
      next()
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        next({ name: '404-resource-view', params: { resource: 'event' } })
      } else {
        next({ name: 'network-error-view' })
      }
    })
})
</script>
<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div class="detail-pagination">
      <button v-if="prevId" @click="goTo(prevId)">&lt;&lt; Prev</button>
      <button v-if="nextId" @click="goTo(nextId)">Next &gt;&gt;</button>
    </div>
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
<style scoped>
.detail-pagination {
  margin-bottom: 16px;
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