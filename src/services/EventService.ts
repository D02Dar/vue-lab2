import axios from 'axios';
import { type Event } from '@/types';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // 假设本地 json-server 端口为 3000
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  getEvents(perPage: number, page: number) {
    return apiClient.get<Event[]>(`/events?_limit=${perPage}&_page=${page}&_sort=id&_order=asc`);
  },
  getEvent(id: number) {
    return apiClient.get<Event>('/events/' + id);
  },
  getAllEventIds() {
    return apiClient.get<Event[]>('/events');
  },
}; 