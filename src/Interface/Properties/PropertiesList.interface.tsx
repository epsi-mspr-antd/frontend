export interface Property {
    id: number,
    name: string,
    street: string,
    zip: string,
    city: string,
    longitude: string,
    latitude: string
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
