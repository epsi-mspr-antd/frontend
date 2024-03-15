import './NavigationMenu.style.css'
import { Link } from 'react-router-dom';

export const NavigationMenu = () => {
    const isLogIn = false;
    return (
        <>
            <nav className="navMenu absolute z-2 right-0 bottom-0 h-full w-[60%] flex flex-col justify-center text-center pl-8 py-6">
                {!isLogIn ?
                    <ul className='flex flex-col h-full justify-around [&>*]:w-full [&>*]:py-4'>
                        <Link to={'/'}><li> Accueil </li></Link>
                        <Link to={'/decouverte'}><li> Nous découvrir </li></Link>
                        <Link to={'/register'}><li> S'inscrire </li></Link>
                        <Link to={'/account/plants'}><li> Mes plantes </li></Link>
                        <Link to={'/account/settings'}><li> Mon compte </li></Link>
                        <Link to={'/account/properties'}><li> Mes propriétés </li></Link>
                    </ul>
                    :
                    <ul className='flex flex-col h-full justify-around [&>*]:w-full '>
                        <Link to={'/'}><li> Accueil </li></Link>
                        <Link to={'/decouverte'}><li> Nous découvrir </li></Link>
                        <Link to={'/services'}><li> Nos services </li></Link>
                        <Link to={'/contact'}><li> Contact </li></Link>
                        <Link to={'/login'}><li> Mon compte </li></Link>
                        <Link to={'/register'}><li> Ma carte </li></Link>
                        <Link to={'/register'}><li> Se déconnecter </li></Link>
                    </ul>
                }

            </nav>
        </>
    )
}