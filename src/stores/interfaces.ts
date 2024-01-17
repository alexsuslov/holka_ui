export interface Item {
    id: string
    title: string,
    images: string[] | [] | null,
    info: string
    price: number
    tags: string[]
    views: number
    created_on: string
    updated_on: string
    owner: string | null
}

export interface IState {
    items: {
        count: number
        items: Item[]
    },
    ownerItems: {
        count: number
        items: Item[]
    },
    user: {
        isLoggedIn: boolean,
        token: string,
        userId?: string
    }
}