export interface Status {
    id: number;
    name: string;
  }
  
  export interface Species {
    id: number;
    name: string;
  }
  
  export interface Address {
    id: number;
    name: string;
    street: string;
    zip: string;
    city: string;
    longitude: number;
    latitude: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Guard {
    id: number;
    email: string;
    pseudo: string;
  }
  
  export interface Plant {
    id: number;
    name: string;
    image: string | null;
    status: Status;
    species: Species;
    address: Address;
    guard: Guard;
  }
  
  export interface ApiResponse {
    data: Plant[];
  }