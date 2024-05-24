import './settingsSharing.style.css';

export const SettingsSharing = () => {
    return (
        <div className="flex flex-col justify-around p-4 text-xl">
            <h4 className="my-2"> Partage de données </h4>
            <span className='text-start text-xl'>En acceptant le partage, vous acceptez que les autres utilisateurs voient vos informations</span>

            <section className="mt-4 flex flex-col gap-4 text-start pl-2">
                <h4 id='settingsSharing'> Option de partage : </h4>
                <div className="grid grid-cols-[15px_1fr] gap-4">
                    <input type="checkbox" name="" id="" />
                    <span> Public / Private Account </span>
                    <input type="checkbox" name="" id="" />
                    <span> Email </span>
                    <input type="checkbox" name="" id="" />
                    <span> UserName </span>
                    <input type="checkbox" name="" id="" />
                    <span> All homes </span>
                    <input type="checkbox" name="" id="" />
                    <span> Specific home </span>
                </div>
            </section>
        </div>
    )
}