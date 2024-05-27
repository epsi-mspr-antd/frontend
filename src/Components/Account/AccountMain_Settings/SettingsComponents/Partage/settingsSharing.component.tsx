import './settingsSharing.style.css';

export const SettingsSharing = () => {
    return (
        <div className="flex flex-col justify-around p-4 text-xl">
            <h4 className="my-2"> Partage de données </h4>
            <span className='text-start text-xl'>En acceptant le partage, vous acceptez que les autres utilisateurs voient vos informations</span>

            <section className="mt-4 flex flex-col gap-4 text-start pl-2">
                <h4 id='settingsSharing'> Option de partage : </h4>
                <div>
                    <span>Compte :</span>
                    <div className='flex justify-around'>
                        <div>
                            <span>Public </span>
                            <input type="radio" name="accountType" id="public" />
                        </div>
                        <div>
                            <span>Privé </span>
                            <input type="radio" name="accountType" id="private" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-4 flex flex-col gap-4 text-start pl-2">
                <div className="grid grid-cols-[15px_1fr] gap-4">
                    <input type="checkbox" name="" id="" />
                    <span> Email </span>
                    <input type="checkbox" name="" id="" />
                    <span> Nom et Prénom </span>
                    <input type="checkbox" name="" id="" />
                    <span> Adresse principale </span>
                    <input type="checkbox" name="" id="" />
                    <span> Mes adresses </span>
                </div>
            </section>


        </div>
    )
}