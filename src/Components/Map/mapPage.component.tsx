import { BentoGeneric } from "../../BentoDesign/BentoGeneric.component"
import { AccountHeader } from "../Account/AccountHeader/AccountHeader.component"
import Map from "./map.component";
import './map.style.css';

export const MapPage = () => {
    return (
        <BentoGeneric 
        childHeader={<AccountHeader/>} 
        childMain={<Map />} 
        childRight={undefined} 
        isBurgerMenu={true} 
        isSVGRequired={false}/>
    )
}