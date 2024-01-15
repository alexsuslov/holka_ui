import { defineStore } from 'pinia'
import type { IState, Item } from './interfaces'

export const useStore = defineStore('state', {
  state: (): IState => ({
    items: {
      count: 0,
      items: []
    }
  }),
  getters: {},
  actions: {
    async fetchItems() {
      try {
        const items = await fetch('/api/v1/items', {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": "9satcJiGS/w7k5SUyamPCQxVexumtj5CGpILkNiRNXdmJzmSfMF7c6LKp9otRBeRaA+EGE6QuzLRrFdCgWwrCEB/AwEBCVVzZXJUb2tlbgH/gAABBAEEVVVJRAH/ggABBFVzZXIBDAABBVJvbGVzAf+EAAEGRXhwaXJlAf+GAAAAGP+BAQEBCE9iamVjdElEAf+CAAEGARgAABb/gwIBAQhbXXN0cmluZwH/hAABDAAAEP+FBQEBBFRpbWUB/4YAAAAu/4ABDGX/pP/1Uv/iLCsxZ/+MZDkCAQVhZG1pbgEPAQAAAA7dQGX+KrD0gAC0AA==%"
          }
        })
        this.items = await items.json()
      } catch (err) {
        console.error(err)
      }
    },
    async addItem(itemData: Omit<Item, "views" | "id | images">) {
      try {
        fetch('/api/v1/items', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(itemData)
        })
      } catch (err) {
        console.error(err)
      }
    }
  }
})
