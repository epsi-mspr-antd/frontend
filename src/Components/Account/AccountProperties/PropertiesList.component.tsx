import { useState } from "react"
import './Properties.style.css';

export const PropertiesList = () => {
    const [modalState, setModalState] = useState(false)

    const openModal = () => {
        setModalState(true)
    }


    return(
        <>
              <div className='flex flex-col gap-2 h-full text-center text-sm'>
                <h4 className='text-2xl mb-2'> Liste de propriétés</h4>
                <div className='flex flex-col h-[80%] p-2 gap-4 overflow-y-auto propertyBox'>
                   
                </div>
                <div className='flex justify-center my-4'>
                    <button onClick={() => openModal()} className='btn-primary p-2'> Ajouter une propriété</button>
                </div>
            </div>


            <div className={modalState ? 'absolute w-full h-full top-0 left-0 backdrop-blur-sm bg-white/30 flex flex-col justify-center items-center z-0' : 'hidden'} onClick={() => setModalState(false)}>
            </div>
            <div className={modalState ? "absolute top-[20%] left-[5%] w-[90%] addProperty text-center p-4 z-20" : 'hidden'}>
                <div className='flex flex-col gap-6 mt-2'>
                    <h4 className="w-full text-lg "> Ajouter une propriété </h4>
                    <div className='flex flex-col gap-y-3'>
                        <span> Nom : </span>
                        <input type="text" className='px-2 inputAddProperty' name="" id="" />


                        <span> Espèce : </span>
                        <input type="text" className='px-2 inputAddProperty' name="" id="" />


                        <span> Etat : </span>
                        <input type="text" className='px-2 inputAddProperty' name="" id="" />
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