<template>
  <h1>Student List</h1>
  <div class="students">
    <div v-for="student in students" :key="student.id" class="student-card">
      <img :src="student.image" alt="student image" class="student-img" />
      <div class="student-info">
        <h2>{{ student.name }} {{ student.surname }}</h2>
        <p>GPA: {{ student.gpa }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import StudentService from '../services/StudentService'
import type { Student } from '../types'

const students = ref<Student[]>([])

onMounted(() => {
  StudentService.getStudents()
    .then((response) => {
      students.value = response.data
    })
    .catch((error) => {
      console.error('Error loading students:', error)
    })
})
</script>

<style scoped>
.students {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
}
.student-card {
  border: 1px solid #39495c;
  border-radius: 8px;
  padding: 16px;
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.student-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 12px;
}
.student-info {
  text-align: center;
}
</style> 