import "./SpecificAddress.style.css";
import { useEffect, useState } from "react";
import { usePlants } from "../../../utils/API/Plants/fetchPlantUser";
import { useParams } from 'react-router-dom';
import { Plant } from "../../../Interface/Plants/PlantsList.interface";
import { useUsersGuardingPlant } from "../../../utils/API/PlantGuardians/fetchPlantGuardian";
import { guardPlant, getUsersGuardingPlant } from "../../../utils/API/PlantGuardians/APIPlantGuardians.service";
import { getFromLocalStorage } from "../../../utils/localStorage/localStorage.service";
import { AuthContext } from "../../../Interface/User/user.interface";
import { getPlantById } from "../../../utils/API/Plants/APIPlants.service";

export const SpecificAddressList = () => {
  const authContext: AuthContext = getFromLocalStorage('authContext');
  const { ids } = useParams();
  const { plants, loading } = usePlants();
  const { guardians, loadingGuardian } = useUsersGuardingPlant(String(authContext.userID));
  const [plantFetch, setPlantFetch] = useState<Plant[]>([]);

  useEffect(() => {
    const fetchPlants = async () => {
      const plantIds = ids ? ids.split(',') : [];
      const promises = plantIds.map((id) => getPlantById(Number(id)));
      const results = await Promise.all(promises);
      const fetchedPlants = results.map((result) => result.data);
      setPlantFetch(fetchedPlants);
    };
    fetchPlants();
  }, [ids]);

  if (loading || loadingGuardian || plantFetch.length === 0) {
    return <div><span>Récupération des données en cours</span></div>;
  }

  if (!plants || !guardians) {
    return <div><span>Aucune données</span></div>;
  }

  return (
    <>
      <div className="flex flex-col gap-2 h-full text-center text-sm">
        <h4 className="text-2xl mb-2">Liste des plantes</h4>
        <div className="flex flex-col h-[80%] p-2 gap-4 overflow-y-auto plantBox">
          {plantFetch.map((plant: Plant) => (
            <article className="plantDetails flex" key={plant.id}>
              <div className="grow">
                <h4>{plant.name}</h4>
                <p>Espèce : <span>{plant.species.name}</span></p>
                <p>Status : <span>{plant.status.name}</span></p>
                <p>Adresse : <span>{plant.address.street}</span></p>
              </div>
            </article>
          ))}

        </div>
        <button
          className="btn-secondary p-4 mx-2 text-center"
          onClick={async () => {
            const guardPromises = plantFetch.map(async (plant: Plant) => {
              await getUsersGuardingPlant((authContext.userID)).then((data) => {
                data = data.data

                if (data == undefined) {
                  return
                }
                console.log(data);

                plantFetch.forEach((element: any) => {
                  if (element.id == plant.id) {
                    if (element.guard == null) {
                      
                      guardPlant((plant.id));
                      const fetchPlants = async () => {
                        const plantIds = ids ? ids.split(',') : [];
                        const promises = plantIds.map((id) => getPlantById(Number(id)));
                        const results = await Promise.all(promises);
                        const fetchedPlants = results.map((result) => result.data);
                        setPlantFetch(fetchedPlants);
                      };
                      fetchPlants();
                      console.log("La plante " + plant.id + " est désormais gardée.");
                    } else {
                      console.log("La plante " + plant.id + " est déjà gardée.");
                    }
                  }
                });
              })
            });

            try {
              await Promise.all(guardPromises);
            } catch (error) {
              console.error("Erreur lors de la garde des plantes :", error);
            }
          }}
        >
          Garder ces plantes
        </button>
      </div>
    </>
  );
};
