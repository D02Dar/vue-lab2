<script setup lang="ts">
import { defineProps } from 'vue'
import { type Event } from '@/types'
import { useRouter } from 'vue-router'
const props = defineProps<{ event: Event, id: String }>()
const router = useRouter()
const register = () => {
  // If the registration API call successful
  // Push back to the event details view
  router.push({ name: 'event-detail-view' })
}
</script>
<template>
  <div>
    <p>Register event here</p>
    <button @click="register">Register</button>
  </div>
</template> 