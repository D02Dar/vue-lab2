<script setup lang="ts">
import { defineProps } from 'vue'
import { type Event } from '@/types'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
const props = defineProps<{ event: Event, id: string }>()
const router = useRouter()
const store = useMessageStore()
const register = () => {
  store.updateMessage('You are successfully registered for ' + props.event.title)
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({ name: 'event-detail-view', params: { id: props.id } })
}
</script>
<template>
  <div>
    <p>Register event here</p>
    <button @click="register">Register</button>
  </div>
</template> 