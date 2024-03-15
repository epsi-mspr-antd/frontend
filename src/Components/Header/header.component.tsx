import Logo from './../../../Ressources/SVG/Logo.svg';
import './header.style.css';


export function Header() {
    return (
    <>
            <span className='basis-[70%] text-center text-4xl'> AROSA-JE </span>
            <div className='basis-[25%] '>
                <img src={Logo} className='' alt='Logo' />
            </div>
    </>
    )
}