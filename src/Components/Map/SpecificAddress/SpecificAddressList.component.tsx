import "./SpecificAddress.style.css";
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { Plant } from "../../../Interface/Plants/PlantsList.interface";
import { guardPlant, unguardPlant } from "../../../utils/API/PlantGuardians/APIPlantGuardians.service";
import { getPlantById } from "../../../utils/API/Plants/APIPlants.service";
import { Loading } from "../../Loading/Loading.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";

export const SpecificAddressList = () => {
  const { ids } = useParams();
  const [plantFetch, setPlantFetch] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(false);
  const [refetchReset, setRefetchReset] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPlants = async () => {
      setLoading(true);
      const plantIds = ids ? ids.split(',') : [];
      const promises = plantIds.map(async (id) => await getPlantById(Number(id)));
      const results = await Promise.all(promises);
      const fetchedPlants = results.map((result) => result.data);
      setPlantFetch(fetchedPlants);
      setLoading(false);
    };
    fetchPlants();
  }, [ids, refetchReset]);

  async function guardAllPlant() {
    setLoading(true);
    for (let plant of plantFetch) {
      plant.guard === null ? await guardPlant(plant.id) : '';
    }
    setLoading(false);
  }

  async function unguardAllPlant() {
    setLoading(true);
    for (let plant of plantFetch) {
      plant.guard !== null ? await unguardPlant(plant.id) : '';
    };
    setLoading(false);
  }

  if (loading) {
    return <Loading />;
  }

  if (!plantFetch) {
    return <div className="h-full flex justify-center plantDetails items-center"><span>Aucune données</span></div>;
  }

  if (error) {
    return <div className="h-full flex justify-center plantDetails items-center"><span>Erreur</span></div>;
  }

  return (
    <>
      <div className="flex flex-col gap-2 h-full text-center text-sm">
        <h4 className="text-2xl mb-2">Liste des plantes</h4>
        <div className="flex flex-col h-[80%] p-2 gap-4 overflow-y-auto plantBox">
          {plantFetch.map((plant: Plant) => (
            <article className="relative plantDetails flex" key={plant.id}>
              {plant.guard === null ? <div className="absolute w-6 h-6 rounded-full bg-red-500 bottom-4 right-7"></div> : <div className="absolute w-6 h-6 rounded-full bg-green-500 bottom-4 right-7"></div>}
              <div className="grow">
                <h4>{plant.name}</h4>
                <p>Espèce : <span>{plant.species.name}</span></p>
                <p>Status : <span>{plant.status.name}</span></p>
                <p>Adresse : <span>{plant.address.street}</span></p>
                <p>Propriétaire : <span> {plant.user.pseudo.toUpperCase()} </span></p>
              </div>
              <Link
                to={`/plants/DetailsPlant/${plant.id}`}
                className="mr-4">
                <FontAwesomeIcon size="2x" icon={faEye} />
              </Link>
            </article>
          ))}
        </div>

        {plantFetch.every(plant => plant.guard === null) ?
          <button
            className="btn-back p-4 mx-2 text-center"
            onClick={async () => {
              try {
                await guardAllPlant();
              } catch (error) {
                console.error(error);
                setError(true);
              } finally {
                setRefetchReset(!refetchReset);
              }
            }} >
            Garder ces plantes
          </button>
          :
          <button
            className="btn-back p-4 mx-2 text-center"
            onClick={async () => {
              try {
                await unguardAllPlant();
              } catch (error) {
                console.error(error);
                setError(true);
              } finally {
                setRefetchReset(!refetchReset);
              }
            }} >
            Libérer ces plantes
          </button>
        }
      </div>
    </>
  );
};