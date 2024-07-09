import "./settingsProfile.style.css";
import Picture from "./../../../../../../Ressources/Pictures/Demo/perso1.svg";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../../Contexte/AuthContext";
import { logOut } from "../../../../../utils/API/Auth/auth.service";
import { removeFromLocalStorage } from "../../../../../utils/localStorage/localStorage.service";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fecthUserById } from "../../../../../utils/API/User/fetchUser.customHook";

export const SettingsProfile = () => {
  const authContext = useContext(AuthContext);
  const { user, loadingUser } = fecthUserById();

  const handleLogout = () => {
    logOut();
    authContext.updateAccessToken("");
    authContext.updateEmail("");
    authContext.updateRefreshToken("");
    authContext.updateUserID(0);
    removeFromLocalStorage("authContext");
  };

  if (loadingUser) {
    return (
      <div>
        <span>Récupération de l'utilisateur</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <span>Aucun utilisateur n'a été trouvé</span>
      </div>
    );
  }

  return (
    <>
      <div className="h-screen flex flex-col gap-2 text-center text-sm m-4">
        <h4 className="text-2xl mb-2">Mon profil</h4>
        <div className="flex flex-col items-center justify-end mt-2 text-2xl p-2 gap-4 settingsBox">
          <img
            // className="imgProfil"
            src={Picture}
            alt="Profil picture"
            className="max-w-64 rounded-full mt-4"
          />

          <div className="flex flex-col gap-2 mb-4">
            <section className="flex gap-2">
              <p className="px-2 rounded-md w-full text-lg">{user.pseudo}</p>
            </section>
            <section className="flex gap-2">
              <p className="px-2 rounded-md w-full text-lg">{user.email}</p>
            </section>
            <div className="flex justify-between w-full mt-8">
              <Link
                className="btn-primary p-4 mx-2 text-center text-lg"
                to="/account/settings/EditSettingsProfile"
                state={user}
              >
                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                Modifier
              </Link>
              <Link
                className="btn-delete p-4 mx-2 text-lg"
                to={"/"}
                onClick={() => handleLogout()}
              >
                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                Supprimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
