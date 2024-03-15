import './Plants.style.css';
import { PlantsList } from '../../../Interface/Plants/PlantsList.interface';

import useSWR from 'swr';
import { useState } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const PlantLists = () => {

    const [modalState, setModalState] = useState(false)
    const { data, error } = useSWR('http://localhost:3000/exemple', fetcher);

    const openModal = () => {
        setModalState(true)
    }


    if (error) return <div>Une erreur s'est produite lors du chargement des données.</div>;
    if (!data) return <div>Chargement en cours...</div>;
    console.log('My data : ', data)

    return (
        <>
            <div className='flex flex-col gap-2 h-full text-center text-sm'>
                <h4 className='text-2xl mb-2'> Plants List</h4>
                <div className='flex flex-col h-[80%] p-2 gap-4 overflow-y-auto plantsBox'>
                    {data.map((plant: PlantsList) => {
                        return (
                            <>
                                <article key={plant.id} className='flex flex-col py-2 px-4 plantBox'>
                                    <span className='flex justify-between items-center'>
                                        <span className='justify-self-end'> ID: {plant.id}</span>
                                        <h5 className=''> {plant.name} </h5>
                                        <button className='editPlant p-1'> Edit </button>
                                    </span>
                                    <span> Etat : {plant.status.name} </span>

                                </article>
                            </>
                        )
                    })}
                </div>
                <div className='flex justify-center my-4'>
                    <button onClick={() => openModal()} className='btn-primary p-2'> Ajouter une plante</button>
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