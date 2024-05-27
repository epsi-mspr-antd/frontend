import { useContext } from 'react';
import { AuthContext } from '../../../Contexte/AuthContext';
import './NavigationMenu.style.css'
import { Link } from 'react-router-dom';


type Props = {
    isOpened: boolean,
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export const NavigationMenu:React.FC<Props> = ({isOpened, setIsOpened}) => {
    const authContext = useContext(AuthContext);
    const handleClick = () => {
        setIsOpened(!isOpened)
    }
    return (
        <>
            <nav className="navMenu absolute z-2 right-0 bottom-0 h-full w-[60%] flex flex-col justify-center text-center pl-8 py-6">
                {!authContext.accessToken ?
                    <ul className='flex flex-col h-full justify-around [&>*]:w-full [&>*]:py-4'>
                        <Link to={'/'} onClick={() => handleClick()}><li> Accueil </li></Link>
                        <Link to={'/login'} onClick={() => handleClick()}><li> Se connecter </li></Link>
                        <Link to={'/register'} onClick={() => handleClick()}><li> S'inscrire </li></Link>
                    </ul>
                    :
                    <ul className='flex flex-col h-full justify-around [&>*]:w-full '>
                        <Link to={'/'}><li> Accueil </li></Link>
                        <Link to={'/decouverte'} onClick={() => handleClick()}><li> Nous découvrir </li></Link>
                        <Link to={'/contact'} onClick={() => handleClick()}><li> Contact </li></Link>
                        <Link to={'/account'} onClick={() => handleClick()}><li> Mon compte </li></Link>
                        <Link to={'/register'} onClick={() => handleClick()}><li> Ma carte </li></Link>
                        <Link to={'/register'} onClick={() => handleClick()}><li> Se déconnecter </li></Link>
                    </ul>
                }

            </nav>
        </>
    )
}