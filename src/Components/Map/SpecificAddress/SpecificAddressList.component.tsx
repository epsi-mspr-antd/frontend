import "./SpecificAddress.style.css";
import { useEffect, useState } from "react";
import { usePlants } from "../../../utils/API/Plants/fetchPlantUser";
import { useParams } from 'react-router-dom';
import { Plant } from "../../../Interface/Plants/PlantsList.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { useUsersGuardingPlant } from "../../../utils/API/PlantGuardians/fetchPlantGuardian";
import { guardPlant, unguardPlant } from "../../../utils/API/PlantGuardians/APIPlantGuardians.service";
import { getFromLocalStorage } from "../../../utils/localStorage/localStorage.service";
import { AuthContext } from "../../../Interface/User/user.interface";

export const SpecificAddressList = () => {
  const authContext: AuthContext = getFromLocalStorage('authContext');
  const [modalState, setModalState] = useState(false);
  const { ids } = useParams();
  const { plants, loading } = usePlants();
  const { guardians, loadingGuardian } = useUsersGuardingPlant(String(authContext.userID));

  const plantIds = ids ? ids.split(',') : [];
  const filteredPlants = plants.filter(plant => plantIds.includes(plant.id.toString()));
  const plantGuard: number[] = guardians.map((plant) => plant.id);
  const [plantGuardedIds, setPlantGuardedIds] = useState<number[]>(plantGuard);

  const handleGuardPlant = (id: number) => {
    guardPlant(id.toString()).then(() => {
      console.log([...plantGuardedIds, id])
      setPlantGuardedIds([...plantGuardedIds, id]);
    });
  };

  const handleUnguardPlant = (id: number) => {
    unguardPlant(id.toString()).then(() => {
      console.log(plantGuardedIds.filter(plantId => plantId !== id));
      setPlantGuardedIds(plantGuardedIds.filter(plantId => plantId !== id));
    });
  };

  useEffect(() => {
    const changeGuardId = async () => {
      const guardedIds = guardians.map((guardian) => guardian.id);
      setPlantGuardedIds(guardedIds);
    }

    changeGuardId()
  }, [guardians]);

  if (loading || loadingGuardian) {
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
          {filteredPlants.map((plant: Plant) => (
            <article className="plantDetails flex" key={plant.id}>
              <div className="grow">
                <h4>{plant.name}</h4>
                <p>Espèce : <span>{plant.species.name}</span></p>
                <p>Status : <span>{plant.status.name}</span></p>
                <p>Adresse : <span>{plant.address.street}</span></p>
              </div>
              {plantGuard.includes(plant.id) ? (
                <div className="flex justify-center items-center">
                  <button
                    className="btn-secondary p-2"
                    onClick={() => handleUnguardPlant(plant.id)}
                  >
                    <FontAwesomeIcon icon={faSquareCheck} />
                  </button>
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  <button
                    className="btn-secondary p-2"
                    onClick={() => handleGuardPlant(plant.id)}
                  >
                    <FontAwesomeIcon icon={faSquareXmark} />
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
        <button
          className="btn-secondary p-4 mx-2 text-center"
          onClick={() => {
            plantIds.forEach(id => {
              if (!plantGuard.includes(Number(id))) {
                handleGuardPlant(Number(id));
              }
            });
          }}
        >
          Garder ces plantes
        </button>
      </div>

      <div
        className={
          modalState
            ? "absolute w-full h-full top-0 left-0 backdrop-blur-sm bg-white/30 flex flex-col justify-center items-center z-0"
            : "hidden"
        }
        onClick={() => setModalState(false)}
      ></div>
      <div
        className={
          modalState
            ? "absolute top-[20%] left-[5%] w-[90%] addPlant text-center p-4 z-20"
            : "hidden"
        }>
      </div>
    </>
  );
};