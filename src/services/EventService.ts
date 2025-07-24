import axios from 'axios';
import type Event from '@/types/Event';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // 假设本地 json-server 端口为 3000
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  getEvents() {
    return apiClient.get<Event[]>('/events');
  },
  getEvent(id: number) {
    return apiClient.get<Event>('/events/' + id);
  },
}; 