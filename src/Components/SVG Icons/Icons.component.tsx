
export function Icons({ size = '40px' }) {
    let IconsURL = {
        plants: './../../../../Ressources/SVG/plants.svg',
        homes: './../../../../Ressources/SVG/homes.svg',
        settings: './../../../../Ressources/SVG/setting.svg'
    }

    return (
        <>
            <img src={IconsURL.settings} alt="" className={size} />
            <img src={IconsURL.homes} alt="" className={size} />
            <img src={IconsURL.plants} alt="" className={size} />
        </>
    )
}
