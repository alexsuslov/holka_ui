import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MyItemsView from '@/views/MyItemsView.vue'
import ProfileView from '@/views/ProfileView.vue'
import ItemView from '@/views/ItemView.vue'
import ChatView from '@/views/ChatView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/my_items',
      name: 'my_items',
      component: MyItemsView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/items/:id',
      name: 'item',
      component: ItemView
    },
    {
      path: '/chats',
      name: 'chats',
      component: ChatView
    }
  ]
})

export default router
