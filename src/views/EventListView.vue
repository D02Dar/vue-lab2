<template>
  <h1>Events For Good</h1>
  <div class="page-size-select">
    <label>Page size:
      <select v-model.number="perPageLocal">
        <option :value="2">2</option>
        <option :value="3">3</option>
        <option :value="5">5</option>
        <option :value="10">10</option>
      </select>
      events per page
    </label>
  </div>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <CategoryOrganizer v-for="event in events" :key="'catorg-' + event.id" :event="event" />
  </div>
  <RouterLink :to="{ name: 'event-list-view', query: { page: page - 1, perPage: perPageLocal } }" rel="prev" v-if="page != 1">&lt;&lt; Prev Page</RouterLink>
  <RouterLink :to="{ name: 'event-list-view', query: { page: page + 1, perPage: perPageLocal } }" rel="next" v-if="hasNextPage">Next Page &gt;&gt;</RouterLink>
</template>

<script setup lang="ts">
import EventCard from '../components/EventCard.vue'
import CategoryOrganizer from '../components/CategoryOrganizer.vue'
import { type Event } from '@/types'
import { ref, watchEffect, computed, watch } from 'vue'
import EventService from '../services/EventService'
import { useRouter, useRoute } from 'vue-router'

interface Props {
  page?: number
}

const props = withDefaults(defineProps<Props>(), {
  page: 1
})

const router = useRouter()
const route = useRoute()
const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const perPageLocal = ref(Number(route.query.perPage) || 2)
const page = computed(() => props.page || Number(route.query.page) || 1)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / perPageLocal.value)
  return page.value < totalPages
})

watchEffect(() => {
  EventService.getEvents(perPageLocal.value, page.value)
    .then((response) => {
      events.value = response.data
      totalEvents.value = parseInt(response.headers['x-total-count'] || '0')
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})

watch(perPageLocal, (newVal) => {
  router.push({ name: 'event-list-view', query: { page: 1, perPage: newVal } })
})
</script>

<style scoped>
.page-size-select {
  margin-bottom: 12px;
}
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
  margin-top: 16px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2e3e50;
  padding: 8px 0;
  border-radius: 4px;
  transition: background 0.2s;
}
.pagination a:hover {
  background: #f0f0f0;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style> 