import "./AccountHeader.style.css";
import "./../../../../Ressources/SVG/plants.svg";
import { Link } from "react-router-dom";

export const AccountHeader = () => {
  let IconsURL = {
    plants: "./../../../../Ressources/SVG/plants.svg",
    homes: "./../../../../Ressources/SVG/homes.svg",
    settings: "./../../../../Ressources/SVG/setting.svg",
  };
  const path = window.location.pathname;
  const activeClass = "pictureContainerActive",
    defaultClass = "pictureContainer";

  return (
    <>
      <header className="flex justify-around w-full p-2">
        <Link
          className={
            path.startsWith("/account/settings") ? activeClass : defaultClass
          }
          to={"/account/settings"}
        >
          <img src={IconsURL.settings} alt="" />
        </Link>
        <Link
          className={
            path.startsWith("/account/properties") ? activeClass : defaultClass
          }
          to={"/account/properties"}
        >
          <img src={IconsURL.homes} alt="" />
        </Link>
        <Link
          className={
            path.startsWith("/account/plants") ? activeClass : defaultClass
          }
          to={"/account/plants"}
        >
          <img src={IconsURL.plants} alt="" />
        </Link>
      </header>
    </>
  );
};
