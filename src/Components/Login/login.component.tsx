import { BentoGeneric } from '../../BentoDesign/BentoGeneric.component';
import { Header } from '../Header/header.component';
import './login.style.css';

export const Login = () => {
    return(
        <>
            <BentoGeneric 
                childHeader={<Header/>}
                childMain={
                    <section className='flex flex-col justify-center'>
                        <form className='h-full flex flex-col justify-center gap-8'>
                            <label htmlFor="last_name" >Nom :</label>
                            <input type="text" />
                            <label htmlFor="first_name">Prénom :</label>
                            <input type="text" />
                            <label htmlFor="email">Email :</label>
                            <input type="email" />
                            <label htmlFor="password">Mot de passe :</label>
                            <input type="password" name="password" id="loginInputPassword" />
                            <label htmlFor="phone">N° de téléphone</label>
                            <input type="tel" name="phone" id="loginInputPhone" />
                        </form>
                </section>
                }
                childRight={undefined}
                isBurgerMenu={true}
                isSVGRequired={true}
            /> 
        </>
    )
}