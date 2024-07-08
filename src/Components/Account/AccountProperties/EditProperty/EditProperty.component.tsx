import { useState } from "react";
import { BentoGeneric } from "../../../../BentoDesign/BentoGeneric.component";
import { editAdress } from "../../../../utils/API/Address/address.service";
import { useLocation, useNavigate } from "react-router-dom";
import "./EditProperty.style.css";
import { Property } from "../../../../Interface/Properties/PropertiesList.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { AccountHeader } from "../../AccountHeader/AccountHeader.component";

export const EditProperty = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const property: Property = location.state;
  const [formState, setFormState] = useState({
    name: property.name,
    street: property.street,
    zip: property.zip,
    city: property.city,
    longitude: property.longitude,
    latitude: property.latitude,
  });

  const handleBackClick = () => {
    navigate(`/account/properties`);
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const address = {
      ...formState,
      longitude: parseFloat(formState.longitude),
      latitude: parseFloat(formState.latitude),
    };

    await editAdress(address, property.id);
    navigate("/account/properties");
  };

  return (
    <div className="relative w-full h-screen flex flex-col">
      <BentoGeneric
        childHeader={<AccountHeader />}
        childMain={
          <div className="flex flex-col gap-2 h-full text-center text-sm">
            <h3 className="text-2xl mb-2">Editer une adresse</h3>
            <div className="editProperty ">
              <div className="flex flex-col gap-y-2">
                <span>Nom : </span>
                <input
                  type="text"
                  className="px-2"
                  name="name"
                  id="name"
                  value={formState.name}
                  onChange={handleChange}
                />

                <span>Rue : </span>
                <input
                  type="text"
                  className="inputEditProperty"
                  name="street"
                  id="street"
                  value={formState.street}
                  onChange={handleChange}
                />

                <span>Code postal : </span>
                <input
                  type="text"
                  className="inputEditProperty"
                  name="zip"
                  id="zip"
                  value={formState.zip}
                  onChange={handleChange}
                />

                <span>Ville : </span>
                <input
                  type="text"
                  className="inputEditProperty"
                  name="city"
                  id="city"
                  value={formState.city}
                  onChange={handleChange}
                />

                <span>Longitude : </span>
                <input
                  type="number"
                  step="0.0001"
                  className="inputEditProperty"
                  name="longitude"
                  id="longitude"
                  value={formState.longitude}
                  onChange={handleChange}
                />

                <span>Latitude : </span>
                <input
                  type="number"
                  step="0.0001"
                  className="inputEditProperty"
                  name="latitude"
                  id="latitude"
                  value={formState.latitude}
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-between w-full mt-8">
                <button
                  onClick={handleBackClick}
                  className="btn-back flex-1 p-4 mx-2 text-center"
                >
                  <FontAwesomeIcon icon={faRotateLeft} className="mr-2" />
                  Retour
                </button>
                <button
                  type="submit"
                  className="btn-primary p-4 mx-2 text-center"
                  onClick={handleSubmit}
                >
                  <FontAwesomeIcon icon={faSave} className="mr-2" />
                  Enregistrer
                </button>
              </div>

              {/* <span className="flex justify-around">
            <button className="btn-primary p-2" onClick={handleSubmit}>
              Valider
            </button>
            <Link to={"/account/properties"} className="btn-secondary p-2">
              Annuler
            </Link>
          </span> */}
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
