import { useState } from 'react';
import Hamburger from './.../../../../../Ressources/SVG/burger-menu-svgrepo-com.svg';
import { NavigationMenu } from './NavigationMenu/NavigationMenu.component';

export function BurgerMenu() {

    const [isOpened, setIsOpened] = useState(false)
    const handleClick = () => {
        setIsOpened(!isOpened)
        console.log('Graou')
    }

    return (
        <>
            <div className="p-1 absolute bottom-2 right-4 w-10 flex justify-center">
                <button onClick={handleClick}>
                    <img src={Hamburger} alt="Burger icon" />
                </button>
            </div>

            {isOpened ?
                <>
                    <button onClick={handleClick} className="absolute z-0 top-0 left-0 w-full h-full blur-xl bg-gray-500 opacity-50">
                    </button>
                    <div>
                        <NavigationMenu />
                    </div>
                </>
                :
                ''}
        </>
    )
}