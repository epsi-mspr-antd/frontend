import { Guard } from "../PlantGuardians/PlantGuardian.interface";
import { User } from "../User/user.interface";

interface Status {
  id: number;
  name: string;
}
interface Species {
  id: number;
  name: string;
}

export interface Address {
  id: number;
  street: string;
  zip: string;
  city: string;
  name: string;
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
  image: string | null;
  guard: Guard[];
  user: User;
}

export interface PlantResponse {
  data: Plant[];
}
export interface CreatePlant {
  name: string;
  statusId: number;
  speciesId: number;
  addressId: number;
  pic: null | File;
}