import { useState } from "react";
import { BentoGeneric } from "../../../../BentoDesign/BentoGeneric.component"
import { Header } from "../../../Header/header.component"
import { editAdress } from "../../../../utils/API/Address/address.service";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './../Properties.style.css';
import { Property } from "../../../../Interface/Properties/PropertiesList.interface";



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
        latitude: property.latitude
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        const address = {
            ...formState,
            longitude: parseFloat(formState.longitude),
            latitude: parseFloat(formState.latitude)
        };

        await editAdress(address, property.id);
        navigate('/account/properties');
    };


    return (
        <>
            <BentoGeneric
            childHeader={<Header/>}
            childMain={
                <div className='flex flex-col p-2 text-center h-full overflow-y-auto rounded-xl formCreateAdress editAddressContainer'>
                    <h4 className="w-full text-lg font-bold mb-2">Editer une adresse</h4>
                    <div className='flex flex-col gap-y-2'>
                        <div>
                            <span>Nom </span>
                            <input type="text" className='px-2' name="name" id="name" value={formState.name} onChange={handleChange} />
                        </div>

                        <div>
                            <span>Rue </span>
                            <input type="text" className='px-2' name="street" id="street" value={formState.street} onChange={handleChange} />
                        </div>

                        <div>
                            <span>Code postal </span>
                            <input type="text" className='px-2' name="zip" id="zip" value={formState.zip} onChange={handleChange} />
                        </div>

                        <div>
                            <span>Ville </span>
                            <input type="text" className='px-2' name="city" id="city" value={formState.city} onChange={handleChange} />
                        </div>

                        <div>
                            <span>Longitude </span>
                            <input type="number" step="0.0001" className='px-2' name="longitude" id="longitude" value={formState.longitude} onChange={handleChange} />
                        </div>

                        <div>
                            <span>Latitude </span>
                            <input type="number" step="0.0001" className='px-2' name="latitude" id="latitude" value={formState.latitude} onChange={handleChange} />
                        </div>

                    </div>

                    <span className='flex justify-around'>
                        <button className='btn-primary p-2' onClick={handleSubmit}>Valider</button>
                        <Link to={'./account/properties'} className='btn-secondary p-2'>Annuler</Link>
                    </span>
                </div>
            }
            childRight={undefined} 
            isBurgerMenu={true}
            isSVGRequired={false}/>
        </>
    )
}