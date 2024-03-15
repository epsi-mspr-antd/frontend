import { BentoGeneric } from '../../BentoDesign/BentoGeneric.component';
import './Account.style.css';
import { AccountHeader } from './AccountHeader/AccountHeader.component';
import { AccountSettings } from './AccountMain_Settings/AccountMainSettings.component';

// Add AccountHeader / Dynamic Main & Right / No Footer
export const Account = () => {
    return(
        <>
        <div className='w-full h-screen flex flex-col'>
        <BentoGeneric 
        childHeader={<AccountHeader/>} 
        childMain={<AccountSettings/>} 
        childRight={undefined} 
        isBurgerMenu={true} 
        isSVGRequired={false}/>
        </div>
        </>
    )
}