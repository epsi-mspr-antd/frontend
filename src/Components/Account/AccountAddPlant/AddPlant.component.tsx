import "./AddPlant.style.css";
import { useState } from "react";
import { BentoGeneric } from "../../../BentoDesign/BentoGeneric.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { AccountHeader } from "../AccountHeader/AccountHeader.component";
import { Link, useNavigate } from "react-router-dom";
import { createPlant } from "../../../utils/API/Plants/APIPlants.service";
import { CreatePlant } from "../../../Interface/Plants/PlantsList.interface";
import { useAdresses } from "../../../utils/API/Address/fetchAddressUser";
import { fecthAllPlantSpecies } from "../../../utils/API/PlantSpecies/fetchPlantSpecies.customHook";
import { fectAllPlantStatus } from "../../../utils/API/PlantStatus/fetchPlantStatus.customHook";
import { Condition } from "../../../Interface/PlantStatus/PlantStatus.interface";

export const AddPlant = () => {
  const navigate = useNavigate();

  const { addresses, loading: addressesLoading } = useAdresses();
  const { species, loading: speciesLoading } = fecthAllPlantSpecies();
  const { statuses, loading: statusesLoading } = fectAllPlantStatus();

  const [plant, setPlant] = useState<CreatePlant>({
    name: "",
    speciesId: 0,
    statusId: 0,
    addressId: 0,
    pic: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPlant((prevPlant) => ({
      ...prevPlant,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setPlant((prevPlant) => ({
        ...prevPlant,
        pic: files[0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newPlantData: CreatePlant = {
        name: plant.name,
        speciesId: Number(plant.speciesId),
        statusId: Number(plant.statusId),
        addressId: Number(plant.addressId),
        pic: plant.pic,
      };

      // Utilisation de la fonction createPlant avec les données de la nouvelle plante
      await createPlant(newPlantData);

      // Redirection vers une autre page après la création par exemple
      navigate("/account/plants");
    } catch (error) {
      console.error("Erreur lors de la création de la plante :", error);
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
          <article className="flex flex-col gap-2 h-full text-center text-sm">
            <h4 className="text-2xl mb-2">Ajouter une plante</h4>
            <div className="addPlant">
              <form
                onSubmit={handleSubmit}
                className="inputAddPlant flex flex-col"
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
                      placeholder="Veuillez saisir le nom de votre plante"
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
                  <div className="addSectionImg">
                    <label>Télécharger une image de votre plante : </label>
                    <input type="file" onChange={handleFileChange} />
                  </div>
                </div>
                <div className="flex justify-between w-full">
                  <Link
                    to="./../"
                    className="btn-back flex-1 p-4 mx-2 text-center"
                  >
                    <FontAwesomeIcon icon={faRotateLeft} className="mr-2" />
                    Retour
                  </Link>
                  <button
                    type="submit"
                    className="btn-primary p-4 mx-2 text-center"
                  >
                    <FontAwesomeIcon icon={faSave} className="mr-2" />
                    Enregistrer
                  </button>
                </div>
              </form>
            </div>
          </article>
        }
        childRight={undefined}
        isBurgerMenu={true}
        isSVGRequired={false}
      />
    </div>
  );
};
