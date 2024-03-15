import './HomeMainContent.style.css';

export function HomeMainContent() {
    return (
        <>
        
            <section className='h-full flex flex-col justify-center gap-8 text-center'>
                <article className='mainArticle'>
                    <h1 className='text-left text-xl'> Nos services </h1>
                    <span className='detailsSpan text-sm text-left'>
                         <ul className='flex flex-col mt-2 gap-2 pl-2'>
                            <li> Faites garder vos plantes par un voisin </li>
                            <li> Obtenir des conseils par des spécialistes </li>
                        </ul>
                    </span>
                </article>
                <article className='mainArticle flex flex-col gap-3'>
                <h1 className='text-left text-xl'> Se connecter !</h1>
                <span className='detailsSpan text-sm text-left'> <button> Connexion </button> / <button> Inscription </button> </span>
                </article>
            </section>
  
        </>
    )
}