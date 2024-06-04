import './Properties.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useAdresses } from "../../../utils/API/Address/fetchAddressUser";
import { Loading } from "../../Loading/Loading.component";
import { NoData } from "../../NoData/NoData.component";
import { Link } from "react-router-dom";
import { deleteUserAdressById } from '../../../utils/API/Address/address.service';

export const PropertiesList = () => {
    const { addresses, loading, refetch } = useAdresses();

    async function handleDelete(addressID: number): Promise<void> {
        await deleteUserAdressById(addressID)
        refetch()
    }

    return (
        <div className='flex flex-col gap-2 h-full text-center text-sm'>
            <h4 className='text-2xl mb-2'>Liste de propriétés</h4>
            <div className='flex flex-col h-[80%] p-2 gap-4 overflow-y-auto propertyBox'>
                {
                    loading ? <Loading /> : addresses.length === 0 ? <NoData /> : addresses.map(address => (
                        <div key={address.id} className='property'>
                            <div className='property-details'>
                                <button className='delete-button' onClick={() => handleDelete(address.id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                                <h5 className='text-center font-bold uppercase'> {address.name} </h5>
                                <p>Adresse : <span className='font-bold'>{address.street}</span></p>
                                <p>Code postal : <span className='font-bold'>{address.zip}</span></p>
                                <p>Ville : <span className='font-bold'>{address.city}</span></p>
                                <Link to={'/account/properties/EditProperty'} state={address} className='edit-button'>
                                    <FontAwesomeIcon icon={faEdit} />
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='flex justify-center my-4'>
                <Link to={'/account/properties/AddProperty'} className='btn-primary p-2'>Ajouter une propriété</Link>
            </div>
        </div>
    );
};
