import "./Properties.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAdresses } from "../../../utils/API/Address/fetchAddressUser";
import { Loading } from "../../Loading/Loading.component";
import { NoData } from "../../NoData/NoData.component";
import { Link, useNavigate } from "react-router-dom";
import { deleteUserAdressById } from "../../../utils/API/Address/address.service";
import { useState } from "react";

export const PropertiesList = () => {
  const { addresses, loadingAddresses, refetch } = useAdresses();
  const [showModal, setShowModal] = useState(false);
  const [addressIdToDelete, setUserIdToDelete] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (addressIdToDelete !== null) {
      await deleteUserAdressById(addressIdToDelete);
      console.log("Plante supprimée avec ID:", addressIdToDelete);
      setShowModal(false);
      setUserIdToDelete(null);
    }
  };

  const confirmDelete = (id: number) => {
    setUserIdToDelete(id);
    setShowModal(true);
  };

  const handleDeleteConfirmed = () => {
    handleDelete();
    navigate("/account/properties");
    refetch();
  };

  if (loadingAddresses)
    return (
      <div>
        <span> Récupération des adresses </span>
      </div>
    );

  if (!addresses)
    return (
      <div>
        <span> Aucune adresse n'a été trouvée </span>
      </div>
    );

  return (
    <>
      <div className="flex flex-col gap-2 h-full text-center text-sm">
        <h4 className="text-2xl mb-2">Liste des propriétés</h4>
        <div className="flex flex-col h-[80%] p-2 gap-4 overflow-y-auto propertyBox">
          {loadingAddresses ? (
            <Loading />
          ) : addresses.length === 0 ? (
            <NoData />
          ) : (
            addresses.map((address) => (
              <div key={address.id} className="property">
                <div className="property-details">
                  <h5 className="text-center font-bold uppercase">
                    {" "}
                    {address.name}{" "}
                  </h5>
                  <p>
                    Adresse :{" "}
                    <span className="font-bold">{address.street}</span>
                  </p>
                  <p>
                    Code postal :{" "}
                    <span className="font-bold">{address.zip}</span>
                  </p>
                  <p>
                    Ville : <span className="font-bold">{address.city}</span>
                  </p>
                  <div className="flex justify-between w-full mt-8">
                    <Link
                      to={`/account/properties/EditProperty`}
                      state={address}
                      className="btn-primary flex-1 p-4 mx-2 text-center"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-2" />
                      Éditer
                    </Link>
                    <button
                      className="btn-delete flex-1 p-4 mx-2"
                      onClick={() => confirmDelete(address.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} className="mr-2" />
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <Link
          to={"/account/properties/AddProperty"}
          className="btn-back p-4 mx-2 text-center"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Ajouter une propriété
        </Link>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="modalDelete">
            <h2 className="text-xl font-bold mb-4">Confirmer la suppression</h2>
            <p>Êtes-vous sûr de vouloir supprimer cette adresse ?</p>
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
    </>
  );
};
