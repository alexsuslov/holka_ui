import { defineStore } from 'pinia'
import type { IState, Item } from './interfaces'

export const useStore = defineStore('state', {
  state: (): IState => ({
    items: {
      count: 0,
      items: []
    },
    user: {
      isLoggedIn: Boolean(sessionStorage.getItem('token')),
      token: sessionStorage.getItem('token') ?? ''
    }
  }),
  getters: {
    isLoggedIn: (state) => { return state.user.isLoggedIn },
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
        const res = await response.text();
        console.log({ res });
        this.user.isLoggedIn = true
        sessionStorage.setItem('token', res)
      } catch (err) {
        console.error(err)
      }
    },
    async fetchItems() {
      try {
        const items = await fetch('/api/v1/items', {
          headers: {
            "X-Auth-Token": this.user.token
          }
        })
        this.items = await items.json()
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