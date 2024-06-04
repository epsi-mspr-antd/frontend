import "./EditPlant.style.css";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { url } from "../../../utils/API/url";
import { BentoGeneric } from "../../../BentoDesign/BentoGeneric.component";
import { AccountHeader } from "../AccountHeader/AccountHeader.component";
import { faRotateLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { editPlant } from "../../../utils/API/Plants/APIPlants.service";
import { CreatePlant } from "../../../Interface/Plants/PlantsList.interface";
import { AuthContext } from "../../../Contexte/AuthContext";
import { useAdresses } from "../../../utils/API/Address/fetchAddressUser";
import { fecthAllPlantSpecies } from "../../../utils/API/PlantSpecies/fetchPlantSpecies.customHook";
import { fectAllPlantStatus } from "../../../utils/API/PlantStatus/fetchPlantStatus.customHook";
import { Condition } from "../../../Interface/PlantStatus/PlantStatus.interface";

export const EditPlant = () => {
  const { addresses, loading: addressesLoading } = useAdresses();
  const { species, loading: speciesLoading } = fecthAllPlantSpecies();
  const { statuses, loading: statusesLoading } = fectAllPlantStatus();
  const navigate = useNavigate();
  const location = useLocation();

  const [plant, setPlant] = useState({
    id: "",
    name: "",
    speciesId: 0,
    species: "",
    statusId: 0,
    status: "",
    addressId: 0,
    pic: null,
  });

  useEffect(() => {
    if (location.state) {
      setPlant({
        id: location.state.id || "",
        name: location.state.name || "",
        speciesId: location.state.species ? location.state.species.id : "",
        species: location.state.species ? location.state.species.name : "",
        statusId: location.state.status ? location.state.status.id : "",
        status: location.state.status ? location.state.status.name : "",
        addressId: location.state.address ? location.state.address.id : "",
        pic: location.state.image || "",
      });
    } else {
      // Gérer le cas où location.state est null ou non défini
      console.error("Erreur : location.state est null ou non défini");
      // Redirection vers une page d'erreur par exemple
      navigate("/error");
    }
  }, [location.state, navigate]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPlant((prevPlant) => ({
      ...prevPlant,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!location.state) {
        throw new Error("location.state est null ou non défini");
      }

      const updatedPlantData: CreatePlant = {
        name: plant.name,
        speciesId: Number(plant.speciesId),
        statusId: Number(plant.statusId),
        addressId: Number(plant.addressId),
        pic: plant.pic,
      };

      // Utilisation de la fonction editPlant avec les données mises à jour
      await editPlant(
        updatedPlantData,
        Number(plant.id) // Assurez-vous que plant.id est un nombre valide
      );

      // Redirection vers une autre page après la mise à jour par exemple
      navigate("account/plants"); // Redirige vers la page principale après la mise à jour
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la plante :", error);
      // Gérer l'erreur ici, par exemple rediriger vers une page d'erreur
      navigate("/error");
    }
  };

  if (addressesLoading || speciesLoading || statusesLoading) {
    return (
      <div>
        <span>Récupération des adresses et des espèces</span>
      </div>
    );
  }

  if (!addresses) {
    return (
      <div>
        <span>Aucune adresse n'a été trouvée</span>
      </div>
    );
  }

  if (!species) {
    return (
      <div>
        <span>Aucune espèce n'a été trouvée</span>
      </div>
    );
  }

  if (!statuses) {
    return (
      <div>
        <span>Aucun état deplante n'a été trouvée</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen flex flex-col">
      <BentoGeneric
        childHeader={<AccountHeader />}
        childMain={
          <div className="flex flex-col gap-2 h-full text-center text-sm">
            <h3 className="text-2xl mb-2">
              Modifcation des informations <br></br> de la plante
            </h3>
            <div className="editPlant">
              <form
                onSubmit={handleSubmit}
                className="inputEditPlant flex flex-col"
              >
                <div className="inputEditForm">
                  <div className="form-group">
                    <label htmlFor="name">Nom : </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={plant.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="speciesId">
                      Sélectionner l'espèce de la plante :{" "}
                    </label>
                    <select
                      id="speciesId"
                      name="speciesId"
                      value={plant.speciesId}
                      onChange={handleChange}
                      className="mt-3"
                    >
                      <option value="">Sélectionner une espèce</option>
                      {species.map((specy) => (
                        <option key={specy.id} value={specy.id}>
                          {`${specy.name}`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="statusId">
                      Sélectionner l'état de votre plante :{" "}
                    </label>
                    <select
                      id="statusId"
                      name="statusId"
                      value={plant.statusId}
                      onChange={handleChange}
                      className="mt-3"
                    >
                      <option value="">Sélectionner un état</option>
                      {statuses.map((status: Condition) => (
                        <option key={status.id} value={status.id}>
                          {`${status.name}`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="addressId">
                      Sélectionner une adresse :{" "}
                    </label>
                    <select
                      id="addressId"
                      name="addressId"
                      value={plant.addressId}
                      onChange={handleChange}
                      className="mt-3"
                    >
                      <option value="">Sélectionner une adresse</option>
                      {addresses.map((address) => (
                        <option key={address.id} value={address.id}>
                          {`${address.street}, ${address.zip} ${address.city}`}
                        </option>
                      ))}
                    </select>
                  </div>
                  {plant.pic && (
                    <div className="form-group mt-5">
                      <div className="form-group">
                        <label>Télécharger une nouvelle image : </label>
                        <input type="file" /*onChange={handleFileChange}*/ />
                      </div>
                      {plant.pic && (
                        <div className="form-group">
                          <label>Image actuelle : </label>
                          <img src={`${url}/static/${plant.pic}`} alt="Plant" />
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex justify-between w-full mt-8">
                    <button
                      onClick={handleBackClick}
                      className="btn-secondary flex-1 p-4 mx-2 text-center"
                    >
                      <FontAwesomeIcon icon={faRotateLeft} className="mr-2" />
                      Retour
                    </button>
                    <button
                      type="submit"
                      className="btn-primary p-4 mx-2 text-center"
                    >
                      <FontAwesomeIcon icon={faSave} className="mr-2" />
                      Enregistrer
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        }
        childRight={undefined}
        isBurgerMenu={true}
        isSVGRequired={false}
      />
    </div>
  );
};
