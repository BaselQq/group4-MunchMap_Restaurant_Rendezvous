export type Restaurant = {
    id: string,
    name: string,
    description: string,
    favourite: boolean,
    rating: number,
    type: string,
    location: string,
    heroImageUrl: string
    image: ImageObject[]
}

export type ImageObject = {
    detailImageUrl: string,
    heroImageUrl: string,
    id: string,
    name: string,
}