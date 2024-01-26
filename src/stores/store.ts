import { defineStore } from 'pinia'
import type { IComment, IState, Item } from './interfaces'
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
      isLoggedIn: Boolean(sessionStorage.getItem('token')) ?? false,
      token: sessionStorage.getItem('token') ?? '',
      userId: sessionStorage.getItem('owner') ?? '',
    },
    selectedItem: {}
  }),
  getters: {
    isLoggedIn: (state) => state.user.isLoggedIn,
    getItemsLength: (state) => state.items.count,
    getOwnerItemsLength: (state) => state.ownerItems.count,
    getItemComments: (state) => state.selectedItem
  },
  actions: {
    selectItem(item: Item) {
      this.selectedItem = item;
    },
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
    async fetchItems(limit: number = 30) {
      try {
        const items = await fetch(`/api/v1/items?limit=${limit}&skip=${0}`, {
          headers: {
            "X-Auth-Token": this.user.token
          }
        })
        this.items = await items.json()
      } catch (err) {
        console.error(err)
      }
    },
    async fetchMyItems(limit: number = 30) {
      try {
        const items = await fetch(`/api/v1/items?limit=${limit}&skip=${0}&owner=${this.user.userId}`, {
          headers: {
            "X-Auth-Token": this.user.token
          }
        })
        this.ownerItems = await items.json()
      } catch (err) {
        console.error(err)
      }
    },
    async fetchItemById(id: string) {
      try {
        const response = await fetch(`/api/v1/items/${id}`, {
          headers: {
            "X-Auth-Token": this.user.token
          }
        })
        const result: Item = await response.json()
        if (!this.items.items.find((v: Item) => v.id === result.id)) {
          //@ts-ignore
          this.items.items.push(result)
          this.selectItem(result)
        }

      } catch (err) {
        console.error(err)
      }
    },
    async addItem(itemData: Omit<Item, "views" | "id" | "images">) {
      try {
        await fetch('/api/v1/items', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": this.user.token
          },
          body: JSON.stringify(itemData)
        })
        await this.fetchMyItems()
      } catch (err) {
        console.error(err)
      }
    },
    async editItem(itemData: Item) {
      try {
        const response = await fetch(`/api/v1/items/${itemData.id}`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": this.user.token
          },
          body: JSON.stringify(itemData)
        })
        const result = await response.json()
        this.selectItem(result)
      } catch (err) {
        console.error(err)
      }
    },
    async deleteItem(id: string) {
      try {
        await fetch(`/api/v1/items/${id}`, {
          method: 'DELETE',
          headers: {
            "X-Auth-Token": this.user.token
          },
        })
        await this.fetchItems()
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
    uploadImage(file: File): Promise<Response> {
      const formData = new FormData();
      const blob = new Blob([file], { type: file?.type })
      formData.append("file", blob)
      return fetch('/api/v1/upload', {
        method: 'POST',
        headers: {
          "X-Auth-Token": this.user.token
        },
        body: formData
      })
    },
    async fetchItemComments(itemId: string) {
      try {
        const response = await fetch(`/api/v1/comments?item=${itemId}`, {
          method: 'GET',
          headers: {
            "X-Auth-Token": this.user.token
          },
        })
        const result: { count: number, items: IComment[] } = await response.json()
        this.selectItem({ ...this.selectedItem, comments: result } as Item)
      } catch (err) {
        console.error(err)
      }
    }
  }
})
