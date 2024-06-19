import "./HomeMainContent.style.css";
import Picture from "./../../../Ressources/SVG/logoMap.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Contexte/AuthContext";
import { logOut } from "../../utils/API/Auth/auth.service";
import { removeFromLocalStorage } from "../../utils/localStorage/localStorage.service";

export function HomeMainContent() {
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    logOut();
    authContext.updateAccessToken("");
    authContext.updateEmail("");
    authContext.updateRefreshToken("");
    authContext.updateUserID(0);
    removeFromLocalStorage("authContext");
  };

  return (
    <>
      <section className="h-full flex flex-col justify-center gap-8 text-center">
        <div className="HomeMain flex-col overflow-hidden">
          <img className="ImgHomeMain" src={Picture} alt="Logo Arosa-je" />
          <h1>AROSA-JE</h1>
          <p>
            Des plantes heureuses,<br></br> un esprit tranquille.
          </p>
        </div>
        <article className="mainArticle">
          <h1 className="text-left text-2xl"> Nos services : </h1>
          <p className="text-left">
            Chez Arosa-je, nous vous aidons à prendre soin de vos plantes grâce
            à des conseils de botanistes experts et un service de garde
            communautaire avec partage de photos et astuces.
          </p>
        </article>

        {!authContext.accessToken ? (
          <div className="flex justify-between w-full mt-2 mb-4">
            <Link className="btn-back flex-1 p-4 mx-2 text-center" to="/login">
              Connexion
            </Link>
            <Link
              className="btn-back flex-1 p-4 mx-2 text-center"
              to="/register"
            >
              Inscription
            </Link>
          </div>
        ) : (
          <Link
            className="btn-back p-4 mx-2 text-center"
            to={"/"}
            onClick={() => handleLogout()}
          >
            Se déconnecter
          </Link>
        )}
      </section>
    </>
  );
}
