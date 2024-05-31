import { Link } from "react-router-dom";
import { BentoGeneric } from "../../BentoDesign/BentoGeneric.component"
import { Header } from "../Header/header.component"
import './CGU.style.css';


export const CGU = () => {
    return (
        <>
            <BentoGeneric
                childHeader={<Header />}
                childMain={
                    <article className="w-full h-full flex flex-col text-center gap-4 CGUContainer p-2 overflow-y-auto">
                        <h3 className="mt-2 font-bold"> Conditions Général d'Utilisation </h3>
                        <div className="flex flex-col gap-4">
                            <p>Bienvenue sur notre application ! En utilisant notre service, vous acceptez les conditions générales d'utilisation décrites ci-dessous. Veuillez les lire attentivement.</p>

                            <h4 className="font-bold">1. Acceptation des Conditions</h4>
                            <p>En accédant ou en utilisant notre application, vous acceptez d'être lié par les présentes Conditions Générales d'Utilisation ("CGU"). Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser notre service.</p>

                            <h4>2. Utilisation des Données Personnelles</h4>
                            <h5 className="ml-2 underline">A. Adresse Email</h5>
                            <p>En vous inscrivant sur notre application, vous consentez à ce que nous collections et utilisions votre adresse email. Cette information peut être partagée avec des partenaires de confiance dans le but d'améliorer nos services, d'envoyer des communications importantes, et de faciliter la connexion et l'interaction avec d'autres utilisateurs.</p>

                            <h5 className="ml-2 underline">B. Position Géographique</h5>
                            <p>En utilisant notre application, vous acceptez que nous collections et utilisions vos données de localisation. Ces informations peuvent être partagées avec des partenaires de confiance pour vous fournir des services personnalisés et améliorer votre expérience utilisateur, notamment en facilitant la mise en relation avec des utilisateurs proches de votre position géographique.</p>

                            <h4>3. Interaction et Échange avec d'Autres Utilisateurs</h4>
                            <p>Notre application met en avant l'échange et la discussion avec d'autres utilisateurs. En utilisant notre service, vous acceptez de :</p>
                            <ul>
                                <li>Respecter les autres utilisateurs et maintenir une conduite appropriée dans toutes les interactions.</li>
                                <li>Ne pas partager de contenu offensant, illégal ou inapproprié.</li>
                                <li>Utiliser les fonctionnalités de discussion et d'échange de manière respectueuse et constructive.</li>
                            </ul>

                            <h4>4. Protection des Données</h4>
                            <p>Nous nous engageons à protéger vos données personnelles. Nous mettons en place des mesures de sécurité appropriées pour protéger vos informations contre tout accès non autorisé, modification, divulgation ou destruction.</p>

                            <h4>5. Modifications des CGU</h4>
                            <p>Nous nous réservons le droit de modifier ces CGU à tout moment. Toute modification sera publiée sur notre application et, si nécessaire, notifiée par email. Il est de votre responsabilité de consulter régulièrement ces CGU pour être informé des éventuelles modifications.</p>

                            <h4>6. Contact</h4>
                            <p>Pour toute question ou préoccupation concernant ces CGU ou la manière dont nous utilisons vos données personnelles, veuillez nous contacter à l'adresse suivante : support@notreapplication.com.</p>

                            <p>En utilisant notre application, vous reconnaissez avoir lu, compris et accepté les présentes Conditions Générales d'Utilisation.</p>

                            <p>Merci d'utiliser notre service !</p>
                            <Link className="btn-primary" id="btn_register_submit" to={"./../register/"}>Retour</Link>
                        </div>
                    </article>
                }
                childRight={undefined}
                isBurgerMenu={true}
                isSVGRequired={true} />
        </>
    )
}