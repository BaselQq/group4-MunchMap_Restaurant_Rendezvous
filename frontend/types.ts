export type Restaurant = {
    id: string,
    name: string,
    description: string,
    favourite: boolean,
    rating: number,
    type: string,
    location: string,
    image: [
        {
            id: string,
            name: string,
            heroImageUrl: string,
            detailImageUrl: string
        }
    ]
}