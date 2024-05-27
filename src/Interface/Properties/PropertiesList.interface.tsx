export interface Property {
    id: number,
    street: string,
    zip: string,
    city: string,
    longitude: number,
    latitude: number
}

export interface PropertiesList{
    data: Property[]
}
