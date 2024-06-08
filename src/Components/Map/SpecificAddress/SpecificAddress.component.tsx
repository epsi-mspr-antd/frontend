import { BentoGeneric } from "../../../BentoDesign/BentoGeneric.component"
import { AccountHeader } from "../../Account/AccountHeader/AccountHeader.component"
import { SpecificAddressList } from "./SpecificAddressList.component"

export const SpecificAddress = () => {
    return (
        <BentoGeneric 
        childHeader={<AccountHeader/>} 
        childMain={<SpecificAddressList />} 
        childRight={undefined} 
        isBurgerMenu={true} 
        isSVGRequired={false}/>
    )
}