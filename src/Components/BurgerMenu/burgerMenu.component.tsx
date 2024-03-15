import { useState } from 'react';
import Hamburger from './.../../../../../Ressources/SVG/burger-menu-svgrepo-com.svg';
import { NavigationMenu } from './NavigationMenu/NavigationMenu.component';
import { Link } from 'react-router-dom';
import Logo from './../../../Ressources/SVG/logoBackground.svg';
import Map from './../../../Ressources/SVG/map.svg';


export function BurgerMenu() {

    const [isOpened, setIsOpened] = useState(false)
    const handleClick = () => {
        setIsOpened(!isOpened)
    }

    return (
        <>
            <footer className='w-full flex justify-between items-center pb-3 px-2'>
                <Link to=".." className='w-20'>
                    <img src={Logo} className='' alt='Logo' />
                </Link>
                <Link to="/map" className='w-14'>
                    <img src={Map} className='' alt='Logo' />
                </Link>
                <div className="w-14 flex justify-center start-end">
                    <button onClick={handleClick}>
                        <img src={Hamburger} alt="Burger icon" />
                    </button>
                </div>
            </footer>

            {isOpened ?
                <>
                    <button onClick={handleClick} className="absolute z-0 top-0 left-0 w-full h-full blur-xl bg-gray-500 opacity-50">
                    </button>
                    <div>
                        <NavigationMenu isOpened={isOpened} setIsOpened={setIsOpened} />
                    </div>
                </>
                :
                ''}
        </>
    )
}