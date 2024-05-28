import { BentoGeneric } from "../../BentoDesign/BentoGeneric.component";
import { Header } from "../Header/header.component";
import "./404.style.css";

export const Error404 = () => {
    return(
        <>
        <BentoGeneric 
                childHeader={<Header/>}
                childMain={
                    <section className='sectionRegister flex flex-col justify-center p-8 text-black mt-8'>
                        <div className='Container404'>
                            <h1>404</h1>
                           <div className="flex justify-center w-full h-40">
                                <img src="./../../../Ressources/Pictures/Logo404.png" alt="Image d'une plante grimacante"></img>
                           </div>
                            <p>Oops ! La page que vous recherchez est introuvable.</p>
                            <p>Il semble que nous ne trouvons pas ce que vous cherchez.</p>
                            <a className="flex justify-center btn-primary" href="/">Retour à l'accueil</a>
                        </div>
                    </section>
                }
                childRight={undefined}
                isBurgerMenu={true}
                isSVGRequired={true}
            /> 
        </>
    )
}