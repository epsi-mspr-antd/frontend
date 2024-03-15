import { PlantsList } from "../../../Interface/Plants/PlantsList.interface";

export class PlantsService {
    url: string
    state: {
        status: boolean,
        plantsList: [PlantsList] | any | null
        error: Error | null | unknown
    }
  
    constructor() {
        this.url = 'http://localhost:3000/exemple';
        this.state = {
            status: false,
            plantsList: null,
            error: null
        }
    }

    getPlants = async () => {
        try {
            const response = await fetch(this.url, {mode:'no-cors'});
            console.log(response)
            this.state.plantsList = response
        } catch (error) {
            console.log("Error :", error)
            this.state.error = error
        }
    }
}