import { useState, useEffect } from "react";
import './Properties.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Property } from "../../../Interface/Properties/PropertiesList.interface";

export const PropertiesList = () => {
    const [modalState, setModalState] = useState(false);
    const [properties, setProperties] = useState<Property[]>([]);

    useEffect(() => {
        // Simuler la récupération des données
        const fetchedData = {
            "data": [
                {
                    "id": 16,
                    "street": "3 Chemin de la pipe",
                    "zip": "69002",
                    "city": "Lyon",
                    "longitude": 1,
                    "latitude": 1.5
                },
                {
                    "id": 17,
                    "street": "5 Rue du Soleil",
                    "zip": "75001",
                    "city": "Paris",
                    "longitude": 2,
                    "latitude": 2.5
                }
            ]
        };

        setProperties(fetchedData.data);
    }, []);

    const openModal = () => {
        setModalState(true);
    };

    const handleDelete = (id: number) => {
        // Ajoutez ici la logique de suppression
        console.log('Adresse supprimée avec ID:', id);
    };

    const handleEdit = (id: number) => {
        // Ajoutez ici la logique d'édition
        console.log('Édition de l\'adresse avec ID:', id);
    };

    return (
        <>
            <div className='flex flex-col gap-2 h-full text-center text-sm'>
                <h4 className='text-2xl mb-2'>Liste de propriétés</h4>
                <div className='flex flex-col h-[80%] p-2 gap-4 overflow-y-auto propertyBox'>
                    {properties.length > 0 ? (
                        properties.map(property => (
                            <div key={property.id} className='property'>
                                <div className='property-details'>
                                    <button className='delete-button' onClick={() => handleDelete(property.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    <p>Adresse : <span className='font-bold'>{property.street}</span></p>
                                    <p>Code postal : <span className='font-bold'>{property.zip}</span></p>
                                    <p>Ville : <span className='font-bold'>{property.city}</span></p>
                                    <button className='edit-button' onClick={() => handleEdit(property.id)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
                <div className='flex justify-center my-4'>
                    <button onClick={openModal} className='btn-primary p-2'>Ajouter une propriété</button>
                </div>
            </div>

            <div className={modalState ? 'absolute w-full h-full top-0 left-0 backdrop-blur-sm bg-white/30 flex flex-col justify-center items-center z-0' : 'hidden'} onClick={() => setModalState(false)}>
            </div>
            <div className={modalState ? "absolute top-[20%] left-[5%] w-[90%] addProperty text-center p-4 z-20" : 'hidden'}>
                <div className='flex flex-col gap-6 mt-2'>
                    <h4 className="w-full text-lg">Ajouter une propriété</h4>
                    <div className='flex flex-col gap-y-3'>
                        <span>Nom :</span>
                        <input type="text" className='px-2 inputAddProperty' name="" id="" />

                        <span>Espèce :</span>
                        <input type="text" className='px-2 inputAddProperty' name="" id="" />

                        <span>Etat :</span>
                        <input type="text" className='px-2 inputAddProperty' name="" id="" />
                    </div>

                    <span className='flex justify-around'>
                        <button className='btn-primary p-2'>Valider</button>
                        <button className='btn-secondary p-2' onClick={() => setModalState(false)}>Annuler</button>
                    </span>
                </div>
            </div>
        </>
    );
};
