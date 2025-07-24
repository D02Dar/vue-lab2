<script setup lang="ts">
import { defineProps } from 'vue'
import { type Event } from '@/types'
const props = defineProps<{ event: Event, id: String }>()
</script>
<template>
  <div>
    <p>Edit event here</p>
  </div>
</template> 