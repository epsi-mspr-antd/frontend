import './App.css'

import './../theme/button.class.css';

import './../theme/button.theme.css';
import './../theme/colors.theme.css';
import './../theme/state.theme.css';


import { BentoGeneric } from './BentoDesign/BentoGeneric.component';
import { HomeMainContent } from './Components/HomeContent/HomeMainContent.component';
import { HomeRightContent } from './Components/HomeContent/HomeRightContent.component';
import { Header } from './Components/Header/header.component';

function App() {
  return (
    <>
        <BentoGeneric 
        childHeader={<Header/>} 
        childMain={<HomeMainContent/>} 
        childRight={<HomeRightContent/>} 
        isBurgerMenu={true}
        isSVGRequired={true} />
    </>
  )
}

export default App
