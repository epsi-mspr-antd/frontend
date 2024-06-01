import './App.css';

import './../theme/button.class.css';

import './../theme/button.theme.css';
import './../theme/colors.theme.css';
import './../theme/state.theme.css';

import { BentoGeneric } from './BentoDesign/BentoGeneric.component';
import { HomeMainContent } from './Components/HomeContent/HomeMainContent.component';
import { HomeRightContent } from './Components/HomeContent/HomeRightContent.component';
import { Header } from './Components/Header/header.component';

import { App as CapacitorApp } from '@capacitor/app';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const handleBackButton = (_: any) => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        CapacitorApp.exitApp();
      }
    };

    CapacitorApp.addListener('backButton', handleBackButton);

    return () => {
      CapacitorApp.removeAllListeners();
    };
  }, []);

  return (
    <>
      <BentoGeneric
        childHeader={<Header />}
        childMain={<HomeMainContent />}
        childRight={<HomeRightContent />}
        isBurgerMenu={true}
        isSVGRequired={true}
      />
    </>
  );
}

export default App;
