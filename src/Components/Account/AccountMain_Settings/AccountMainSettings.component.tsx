import { AccountPanelRouter } from '../../../Service/AccountServices/AccountSettings.service';
import { Routes } from '../../../Interface/AccountRoutes/AccountRouter.interface';
import './AccoutMainSettings.style.css';
import { SettingsProfile } from './SettingsComponents/Profil/settingsProfile.component';
import { SettingsSharing } from './SettingsComponents/Partage/settingsSharing.component';
import { useState } from 'react';

export const AccountSettings = () => {
    let router = new AccountPanelRouter(),
        routes = Routes,
        [currentRoute, setCurrentRoute] = useState(router.router.activeRouteIs)

    const switchRoute = (route: Routes) => {
        router.switchToRoute(route)
        setCurrentRoute(router.router.activeRouteIs)
    }




    return (
        <>
            <div className="mainContainer w-full max-h-[85%] flex flex-col text-center text-sm gap-6 overflow-y-auto">

                {
                    currentRoute === routes.Settings ? <SettingsProfile/> :
                        currentRoute === routes.Sharing ? <SettingsSharing/> :
                            ""
                }
            </div>
            <div className='flex justify-around mt-4'>
                {currentRoute === routes.Settings ?
                    <button className='btn-active px-6 py-4 text-xl' onClick={() => switchRoute(routes.Sharing)}> Voir Paramètres </button> :
                    <button className='btn-active px-6 py-4 text-xl' onClick={() => switchRoute(routes.Settings)}> Voir Profil </button>
                }
            </div>

        </>
    )
}