import "./TipsList.style.css";
import { useContext, useState } from "react";
import { Tip } from "../../../Interface/Tip/Tip.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faTrash,
  faEdit,
  faPlus,
  faRotateLeft,
  faShieldAlt,
  faSeedling,
  faCrown,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BentoGeneric } from "../../../BentoDesign/BentoGeneric.component";
import { AccountHeader } from "../../Account/AccountHeader/AccountHeader.component";
import { deletePlantTipByTipID } from "../../../utils/API/Tips/tips.service";
import { fecthTipsByPlantId } from "../../../utils/API/Tips/fetchTips.customHook";
import { AuthContext } from "../../../Contexte/AuthContext";
import { usePlantById } from "../../../utils/API/Plants/fetchPlantById";

export const TipsList = () => {
  const { plantId: plantIdParam } = useParams();
  const plantId = Number(plantIdParam);
  const { tips, loading: loadingTip } = fecthTipsByPlantId(plantId);
  const { plant, loading: loadingPlant } = usePlantById(plantId);
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);
  const [tipIdToDelete, setTipIdToDelete] = useState<number | null>(null);

  if (loadingTip || loadingPlant)
    return (
      <div>
        {" "}
        <span> Récupération des conseils </span>{" "}
      </div>
    );
  if (!tips || !plant)
    return (
      <div>
        {" "}
        <span> Aucun conseil n'a été trouvée </span>{" "}
      </div>
    );

  const handleBackClick = () => {
    navigate(`/plants/DetailsPlant/${plant.id}`);
  };

  const handleDelete = async () => {
    if (tipIdToDelete !== null) {
      await deletePlantTipByTipID(tipIdToDelete);
      console.log("Plante supprimée avec ID:", tipIdToDelete);
      setShowModal(false);
      setTipIdToDelete(null);
    }
  };

  const confirmDelete = (id: number) => {
    setTipIdToDelete(id);
    setShowModal(true);
  };

  const handleDeleteConfirmed = async () => {
    await handleDelete();
    window.location.reload();
  };

  return (
    <div className="relative w-full h-screen flex flex-col">
      <BentoGeneric
        childHeader={<AccountHeader />}
        childMain={
          <article className="flex flex-col h-full">
            <div className="flex flex-col h-full text-center text-sm">
              <h4 className="text-2xl mb-2 text-white">
                <FontAwesomeIcon icon={faLeaf} className="mr-2" />
                {plant.name}
              </h4>
              <div className="flex flex-col h-full text-center text-sm overflow-y-auto">
                {tips.map((tip: Tip, _index: number) => (
                  <div key={_index} className="detailsTip mb-4">
                    <p className="flex items-center justify-center">
                      {tip.user.roles.includes("GARDIAN") && (
                        <FontAwesomeIcon
                          icon={faShieldAlt}
                          className="mr-2 text-gray-500"
                        />
                      )}
                      {tip.user.roles.includes("BOTANIST") && (
                        <FontAwesomeIcon
                          icon={faSeedling}
                          className="mr-2 text-green-700"
                        />
                      )}
                      {tip.user.id === plant.user.id && (
                        <FontAwesomeIcon
                          icon={faCrown}
                          className="mr-2 text-red-700"
                        />
                      )}
                      <span className="text-2xl font-bold">
                        {tip.user.pseudo}
                      </span>
                    </p>
                    <p className="font-bold mt-4">
                      {(tip.user.id === plant.user.id && (
                        <strong className="colorTitle">Message : </strong>
                      )) || <strong className="colorTitle">Conseil : </strong>}
                      <span>{tip.description}</span>
                    </p>
                    <p className="text-right italic">
                      <span>
                        {new Date(tip.createdAt).toLocaleDateString("fr-FR")}
                      </span>
                    </p>
                    {tip.user.id === context.userID && (
                      <div className="flex justify-between w-full mt-4">
                        <Link
                          to={`/Tip/${plant.id}/EditTip/${tip.id}`}
                          className="btn-secondary flex-1 p-1 mx-2 text-center"
                        >
                          <FontAwesomeIcon icon={faEdit} className="mr-2" />
                          Éditer
                        </Link>
                        <button
                          className="btn-delete flex-1 p-1 mx-2 text-center"
                          onClick={() => confirmDelete(tip.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} className="mr-2" />
                          Supprimer
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between w-full my-8">
                <button
                  onClick={handleBackClick}
                  className="btn-back flex-1 p-4 my-6 mx-4 text-center"
                >
                  <FontAwesomeIcon icon={faRotateLeft} className="mr-2" />
                  Retour
                </button>
                <Link
                  to={`/Tip/${plantId}/AddTip`}
                  className="btn-secondary p-4 my-6 mx-4 text-center"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  {(plant.user.id === context.userID && (
                    <>Ajouter un message</>
                  )) || <>Ajouter un conseil</>}
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
                onClick={handleDeleteConfirmed}
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
