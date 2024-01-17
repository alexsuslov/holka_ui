import { defineStore } from 'pinia'
import type { IState, Item } from './interfaces'
import router from '@/router'

export const useStore = defineStore('state', {
  state: (): IState => ({
    items: {
      count: 0,
      items: []
    },
    ownerItems: {
      count: 0,
      items: []
    },
    user: {
      isLoggedIn: Boolean(sessionStorage.getItem('token')),
      token: sessionStorage.getItem('token') ?? '',
      userId: '',
    }
  }),
  getters: {
    isLoggedIn: (state) => { return state.user.isLoggedIn },
    getItemsLength: (state) => { return state.items.count },
    getOwnerItemsLength: (state) => { return state.ownerItems.count }
  },
  actions: {
    async login({ username, password }: { username: string, password: string }) {
      try {
        const response = await fetch('http://192.168.31.100:3000/auth', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: 'POST',
          body: new URLSearchParams({ user: username, pass: password })
        })
        const res = await response.json();
        this.user.isLoggedIn = true
        this.user.userId = res.user_id
        this.user.token = res.token
        sessionStorage.setItem('token', res.token)
        sessionStorage.setItem('owner', res.user_id)
      } catch (err) {
        console.error(err)
      }
    },
    logout() {
      this.user = { isLoggedIn: false, token: "" }
      sessionStorage.clear()
      router.push('/')
    },
    async fetchItems() {
      try {
        const items = await fetch('/api/v1/items', {
          headers: {
            "X-Auth-Token": this.user.token ?? sessionStorage.getItem('token')
          }
        })
        this.items = await items.json()
      } catch (err) {
        console.error(err)
      }
    },
    async fetchMyItems() {
      try {
        const items = await fetch(`/api/v1/items?owner=${sessionStorage.getItem('owner') ?? this.user.userId}`, {
          headers: {
            "X-Auth-Token": this.user.token ?? sessionStorage.getItem('token')
          }
        })
        this.ownerItems = await items.json()
      } catch (err) {
        console.error(err)
      }
    },
    addItem(itemData: Omit<Item, "views" | "id" | "images">) {
      try {
        fetch('/api/v1/items', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": this.user.token
          },
          body: JSON.stringify(itemData)
        })
      } catch (err) {
        console.error(err)
      }
    },
    addImagesToItem(id: string, images: string[]) {
      try {
        fetch(`/api/v1/items/${id}`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": this.user.token
          },
          body: JSON.stringify({ images })
        })
      } catch (err) {
        console.error(err)
      }
    },
    uploadImages(id: string, files: FileList) {
      try {
        const formData = new FormData();
        Array.from(files).forEach((file) => {
          formData.append("file", file)
        })
        fetch('/api/v1/upload', {
          method: 'POST',
          headers: {
            "X-Auth-Token": this.user.token
          },
          body: formData
        }).then(res => this.addImagesToItem(id, res.key))
      } catch (err) {
        console.error(err)
      }
    }
  }
})