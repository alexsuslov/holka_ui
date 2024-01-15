export interface Item {
    id: string
    title: string,
    images: any[] | null,
    info: string
    price: number
    tags: string[]
    views: number
}

export interface IState {
    items: {
        count: number
        items: Item[]
    }
}