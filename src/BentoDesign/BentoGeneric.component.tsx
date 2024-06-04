import React from "react";
import { BurgerMenu } from "../Components/BurgerMenu/burgerMenu.component";
import { Bento3 } from "../Interface/Bento3.interface";
import "./BentoGeneric.style.css";

export const BentoGeneric: React.FC<Bento3> = ({
  childHeader = "",
  childMain = "",
  childRight = "",
  isBurgerMenu = true,
  isSVGRequired = false,
}) => {
  const svgClass = isSVGRequired ? "mainContentBox " : "";

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-between">
        <div className="header flex items-center ">
          {childHeader ? childHeader : ""}
        </div>
        <div
          className={svgClass + "w-full overflow-y-auto basis-10/12 flex p-2"}
        >
          <main className="w-full overflow-hidden p-2">
            {childMain ? childMain : ""}
          </main>

          {childRight ? (
            <>
              <section className="h-full basis-3/12">{childRight}</section>
            </>
          ) : (
            ""
          )}
        </div>
        {isBurgerMenu ? <BurgerMenu /> : ""}
      </div>
    </>
  );
};
