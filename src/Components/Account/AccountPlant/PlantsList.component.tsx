import "./Plants.style.css";

// import useSWR from 'swr';
import { useState } from "react";
import { usePlants } from "../../../utils/API/Plants/fetchPlantUser";
import { Plant } from "../../../Interface/Plants/PlantsList.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const PlantLists = () => {
  const [modalState, setModalState] = useState(false);

  const { plants, loading } = usePlants();

  if (loading)
    return (
      <div>
        {" "}
        <span> Récupération des plantes </span>{" "}
      </div>
    );
  if (!plants)
    return (
      <div>
        {" "}
        <span> Aucune plante n'a été trouvée </span>{" "}
      </div>
    );

  return (
    <>
      <div className="flex flex-col gap-2 h-full text-center text-sm">
        <h4 className="text-2xl mb-2">Listes des plantes</h4>
        <div className="flex flex-col h-[80%] p-2 gap-4 overflow-y-auto plantBox">
          {plants.map((plant: Plant) => {
            return (
              <article className="plantDetails flex">
                <div className="grow">
                  <h4> {plant.name} </h4>
                  <p>
                    {" "}
                    Espèce : <span> {plant.species.name} </span>
                  </p>
                  <p>
                    {" "}
                    Status : <span> {plant.status.name} </span>
                  </p>
                  <p>
                    {" "}
                    Adresse : <span> {plant.address.street} </span>
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <Link
                    to="DetailsPlant"
                    state={plant}
                    className="view-button mr-4"
                  >
                    <FontAwesomeIcon size="2x" icon={faEye} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
        <button className="btn-secondary p-4 my-4 mx-2">
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Ajouter une plante
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
        }
      >
        <div className="flex flex-col gap-6 mt-2">
          <h4 className="w-full text-lg "> Ajouter une plante </h4>
          <div className="flex flex-col gap-y-3">
            <span> Nom : </span>
            <input type="text" className="px-2 inputAddPlant" name="" id="" />

            <span> Espèce : </span>
            <input type="text" className="px-2 inputAddPlant" name="" id="" />

            <span> Etat : </span>
            <input type="text" className="px-2 inputAddPlant" name="" id="" />
          </div>

          <span className="flex justify-around">
            <button className="btn-primary p-2">Valider</button>
            <button
              className="btn-secondary p-2"
              onClick={() => setModalState(false)}
            >
              Annuler
            </button>
          </span>
        </div>
      </div>
    </>
  );
};
