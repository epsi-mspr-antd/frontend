import { BentoGeneric } from '../../../BentoDesign/BentoGeneric.component';
import { AccountHeader } from '../AccountHeader/AccountHeader.component';
import './AccountHome.style.css';

import Settings from './../../../../Ressources/SVG/setting.svg';
import Properties from './../../../../Ressources/SVG/homes.svg';
import Plants from './../../../../Ressources/SVG/plants.svg';
import { Link } from 'react-router-dom';

export const AccountHome = () => {
    return (
        <>
            <BentoGeneric
                childHeader={<AccountHeader />}
                childMain={
                    <>
                        <section className='box h-full relative pt-4'>
                            <h4 className='absolute w-full text-center -top-4 text-3xl'> Bienvenue </h4>
                            <div className='h-full text-sm p-3 flex flex-col gap-4 text-center'>
                                <article> Ici vous pourrez retrouver toutes les informations relatives à votre compte</article>
                                <article> Ces données se partagent en 3 sections : </article>
                                <div className='flex flex-col gap-4 [&>*]:flex [&>*]:items-center justify-around p-2 h-full'>

                                    <article className='accountArticle'>
                                        <Link to='..' relative='route' className='w-16'>
                                            <h5> Paramètres</h5>
                                            <img src={Settings} alt="" />
                                        </Link>
                                        <div className='w-full flex flex-col'>
                                            <span> Paramètre de partage</span>
                                            <span> Paramètre du profil </span>

                                        </div>
                                    </article>

                                    <article className='accountArticle'>
                                        <Link to='properties' className='w-16'>
                                            <h5> Maisons </h5>
                                            <img src={Properties} alt="" />
                                        </Link>
                                        <span className='w-full'>
                                            Mes domiciles
                                        </span>
                                    </article>

                                    <article className='accountArticle'>
                                        <Link to='plants' className='w-16'>
                                        <h5> Plantes </h5>
                                        <img src={Plants} alt="" />
                                        </Link>
                                        <span className='w-full'>
                                            Mes plantes
                                        </span>
                                    </article>

                                </div>


                            </div>
                        </section>
                    </>
                }
                childRight={undefined}
                isBurgerMenu={true}
                isSVGRequired={false} />
        </>
    )
}