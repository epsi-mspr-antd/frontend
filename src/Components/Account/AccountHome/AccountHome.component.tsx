import { BentoGeneric } from "../../../BentoDesign/BentoGeneric.component";
import { AccountHeader } from "../AccountHeader/AccountHeader.component";
import "./AccountHome.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faHome, faSeedling } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const AccountHome = () => {
  return (
    <div className="relative w-full h-screen flex flex-col">
      <BentoGeneric
        childHeader={<AccountHeader />}
        childMain={
          <div className="h-full flex flex-col gap-2 justify-end text-center text-sm">
            <section className="box relative pt-4">
              <h4 className="absolute w-full text-center -top-4 text-3xl">
                {" "}
                Bienvenue{" "}
              </h4>
              <div className="text-sm p-3 flex flex-col gap-4 text-center">
                <div className="flex flex-col gap-16 justify-around p-2 h-full">
                  <Link
                    className="btn-back flex-1 p-4 mx-2 text-center flex items-center justify-center"
                    to="settings"
                  >
                    <FontAwesomeIcon icon={faCog} className="mr-2 text-xl" />
                    <h5 className="text-xl"> Paramètres du profil</h5>
                  </Link>

                  <Link
                    className="btn-back flex-1 p-4 mx-2 text-center flex items-center justify-center"
                    to="properties"
                  >
                    <FontAwesomeIcon icon={faHome} className="mr-2 text-xl" />
                    <h5 className="text-xl"> Mes domiciles </h5>
                  </Link>

                  <Link
                    to="plants"
                    className="btn-back flex-1 p-4 mx-2 text-center flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faSeedling} className="text-xl" />
                    <h5 className="text-xl"> Mes plantes </h5>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        }
        childRight={undefined}
        isBurgerMenu={true}
        isSVGRequired={true}
      />
    </div>
  );
};
