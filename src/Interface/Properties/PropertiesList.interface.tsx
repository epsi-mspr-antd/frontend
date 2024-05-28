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

export interface CreateAdress {
    street: string,
    zip: string,
    city: string,
    latitude: number,
    longitude: number
}
