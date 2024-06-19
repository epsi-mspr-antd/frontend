import "./AccoutMainSettings.style.css";
import { SettingsProfile } from "./SettingsComponents/Profil/settingsProfile.component";
export const AccountSettings = () => {
  return (
    <>
      <div className="mainContainer w-full max-h-[85%] flex flex-col text-center text-sm gap-6 overflow-y-auto">
        <SettingsProfile />
      </div>
    </>
  );
};
