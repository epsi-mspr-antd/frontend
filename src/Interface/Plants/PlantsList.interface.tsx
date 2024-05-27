interface Status {
    id: number;
    name: string;
}

interface Species {
    id: number;
    name: string;
}

interface Address {
    id: number;
    street: string;
    zip: string;
    city: string;
    longitude: number;
    latitude: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
}

export interface Plant {
    id: number;
    name: string;
    status: Status;
    species: Species;
    address: Address;
}

export interface PlantResponse {
    data: Plant[];
}
