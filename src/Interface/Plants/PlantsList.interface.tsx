export interface PlantsList {
    id: number,
    name: string,
    status: {
        id: number,
        name: string
    },
    species: {
        id: number,
        name: string
    }
}