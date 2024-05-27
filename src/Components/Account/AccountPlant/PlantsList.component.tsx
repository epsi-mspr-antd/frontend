import './Plants.style.css';

// import useSWR from 'swr';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../Contexte/AuthContext';
import { usePlants } from '../../../utils/API/Plants/fetchPlantUser';
import { Plant } from '../../../Interface/Plants/PlantsList.interface';

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const PlantLists = () => {
    const [modalState, setModalState] = useState(false)
    const { accessToken } = useContext(AuthContext);


    const { plants, loading } = usePlants(accessToken);

    

    if (loading) return (<div> <span> Récupération des plantes </span> </div>)
    if (!plants) return (<div> <span> Aucune plante n'a été trouvée </span> </div>)



    return (
        <>
            <div className='flex flex-col gap-2 h-full text-center text-sm'>
                <h4 className='text-2xl mb-2'> Plants List</h4>
                <div className='flex flex-col h-[80%] p-2 gap-4 overflow-y-auto plantsBox'>
                    {
                        plants.map((plant: Plant) => {
                            return (
                                <article className='flex flex-col'>
                                    <h4> {plant.name} </h4>
                                    <span> Espèce : <span> {plant.species.name} </span></span>
                                    <span> Status : <span> {plant.status.name} </span></span>
                                </article>
                            )
                        })
                    }
                </div>
                <div className='flex justify-center my-4'>
                    <button className='btn-primary p-2'> Ajouter une plante</button>
                </div>
            </div>


            <div className={modalState ? 'absolute w-full h-full top-0 left-0 backdrop-blur-sm bg-white/30 flex flex-col justify-center items-center z-0' : 'hidden'} onClick={() => setModalState(false)}>
            </div>
            <div className={modalState ? "absolute top-[20%] left-[5%] w-[90%] addPlant text-center p-4 z-20" : 'hidden'}>
                <div className='flex flex-col gap-6 mt-2'>
                    <h4 className="w-full text-lg "> Ajouter une plante </h4>
                    <div className='flex flex-col gap-y-3'>
                        <span> Nom : </span>
                        <input type="text" className='px-2 inputAddPlant' name="" id="" />


                        <span> Espèce : </span>
                        <input type="text" className='px-2 inputAddPlant' name="" id="" />


                        <span> Etat : </span>
                        <input type="text" className='px-2 inputAddPlant' name="" id="" />
                    </div>

                    <span className='flex justify-around'>
                        <button className='btn-primary p-2'>Valider</button>
                        <button className='btn-secondary p-2' onClick={() => setModalState(false)}>Annuler</button>
                    </span>
                </div>
            </div>
        </>
    )
}