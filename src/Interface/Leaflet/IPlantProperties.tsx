export interface IPlantProperties {
    id: number;
    type: string;
    specie: string;
    status: string;
    address: {
        city: string;
        street: string;
        zip: string;
    };
}