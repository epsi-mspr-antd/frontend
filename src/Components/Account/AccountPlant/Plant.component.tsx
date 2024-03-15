import { BentoGeneric } from "../../../BentoDesign/BentoGeneric.component"
import { AccountHeader } from "../AccountHeader/AccountHeader.component"
import { PlantLists } from "./PlantsList.component"

export const Plants = () => {
    return(
        
        <div className="relative w-full h-screen flex flex-col">
        <BentoGeneric 
        childHeader={<AccountHeader/>}
        childMain={<PlantLists/>} 
        childRight={undefined}
        isBurgerMenu={true}
        isSVGRequired={false} />
        </div>
    )
}