import "./DetailsPlant.style.css";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faEye,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BentoGeneric } from "../../../BentoDesign/BentoGeneric.component";
import { AccountHeader } from "../AccountHeader/AccountHeader.component";
import { deleteUserPlantById } from "../../../utils/API/Plants/APIPlants.service";

import { url } from "../../../utils/API/url";
import { usePlantById } from "../../../utils/API/Plants/fetchPlantById";
import { AuthContext } from "../../../Contexte/AuthContext";

export const DetailsPlant = () => {
  const { id: idParam } = useParams();
  const id = Number(idParam);

  const { plant, loading } = usePlantById(id);
  const [showModal, setShowModal] = useState(false);
  const [plantIdToDelete, setPlantIdToDelete] = useState<number | null>(null);
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  if (loading)
    return (
      <div>
        {" "}
        <span> Récupération des plantes </span>{" "}
      </div>
    );
  if (!plant)
    return (
      <div>
        {" "}
        <span> Aucune plante n'a été trouvée </span>{" "}
      </div>
    );

  const handleBackClick = () => {
    navigate(`/account/plants`);
  };

  const handleDelete = async () => {
    if (plantIdToDelete !== null) {
      await deleteUserPlantById(plantIdToDelete);
      console.log("Plante supprimée avec ID:", plantIdToDelete);
      setShowModal(false);
      setPlantIdToDelete(null);
    }
  };

  const confirmDelete = (id: number) => {
    setPlantIdToDelete(id);
    setShowModal(true);
  };

  const handleDeleteConfirmed = () => {
    handleDelete();
    navigate("/account/plants");
  };

  return (
    <div className="relative w-full h-screen flex flex-col">
      <BentoGeneric
        childHeader={<AccountHeader />}
        childMain={
          <article>
            <div className="flex flex-col h-full text-center text-sm">
              <h4 className="text-2xl mb-2">Détails de la plante</h4>

              <div className="detailsPlant flex flex-col overflow-y-auto max-h-[65vh]">
                <h4> {plant.name} </h4>
                <p className="DetailsSection">
                  {" "}
                  Espèce : <span> {plant.species.name} </span>
                </p>
                <p className="DetailsSection">
                  {" "}
                  État : <span> {plant.status.name} </span>
                </p>
                <p className="DetailsSection">
                  {" "}
                  Type d'adresse : <span> {plant.address.name} </span>
                </p>
                <p className="DetailsSection flex">
                  {" "}
                  Adresse :
                  <span className="ml-2">
                    <span> {plant.address.street} </span>
                    <br />
                    <span>{plant.address.zip}</span>
                    <br />
                    <span>{plant.address.city}</span>
                  </span>
                </p>
                {plant.image && (
                  <div className="DetailsSectionImg">
                    <img src={url + "/static/" + plant.image}></img>
                  </div>
                )}
                {plant.user.id === context.userID && (
                  <div className="flex justify-between w-full mt-8">
                    <Link
                      to={`/plants/EditPlant/${id}`}
                      className="btn-primary flex-1 p-4 mx-2 text-center"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-2" />
                      Éditer
                    </Link>
                    <button
                      className="btn-delete flex-1 p-4 mx-2"
                      onClick={() => confirmDelete(plant.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} className="mr-2" />
                      Supprimer
                    </button>
                  </div>
                )}
              </div>
              <div className="flex justify-between w-full mt-8">
                <button
                  onClick={handleBackClick}
                  className="btn-back flex-1 p-4 mt-4 mx-2 text-center"
                >
                  <FontAwesomeIcon icon={faRotateLeft} className="mr-2" />
                  Retour
                </button>
                <Link
                  to={`/Tip/${plant.id}/TipsList`}
                  className="btn-secondary flex-1 p-4 mt-4 mx-2 text-center"
                >
                  <FontAwesomeIcon icon={faEye} className="mr-2" />
                  Voir les conseils
                </Link>
              </div>
            </div>
          </article>
        }
        childRight={undefined}
        isBurgerMenu={true}
        isSVGRequired={false}
      />

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="modalDelete">
            <h2 className="text-xl font-bold mb-4">Confirmer la suppression</h2>
            <p>Êtes-vous sûr de vouloir supprimer cette plante ?</p>
            <div className="mt-6 flex justify-end">
              <button
                className="mr-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-black"
                onClick={() => setShowModal(false)}
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
                onClick={handleDeleteConfirmed} // Supprime la plante après confirmation
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
