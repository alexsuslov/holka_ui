export interface Item {
    id: string
    title: string
    images: string[] | [] | null
    info: string
    price: number
    tags: string[]
    views: number
    created_on?: string
    updated_on?: string
    owner: string | null
    comments?: { count: number, items: IComment[] }
}

export interface IComment {
    id: string
    images: [] | null
    item: string
    owner: string
    text: string
    to: string
    updated_on: string
    created_on: string
}

export interface IState {
    items: {
        count: number
        items: Item[] | []
    },
    ownerItems: {
        count: number
        items: Item[] | []
    },
    user: {
        isLoggedIn: boolean
        token: string
        userId?: string
    },
    selectedItem: Item | Record<string, any>
}