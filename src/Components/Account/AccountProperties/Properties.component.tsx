import { BentoGeneric } from "../../../BentoDesign/BentoGeneric.component"
import { AccountHeader } from "../AccountHeader/AccountHeader.component"
import { PropertiesList } from "./PropertiesList.component"
import './Properties.style.css'


export const Properties = () => {
    return(
        <>
        <BentoGeneric 
        childHeader={<AccountHeader/>}
        childMain={<PropertiesList/>} 
        childRight={undefined}
        isBurgerMenu={true}
        isSVGRequired={false} />
        </>
    )
}