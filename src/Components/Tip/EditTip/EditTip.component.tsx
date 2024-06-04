import "./EditTip.style.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BentoGeneric } from "../../../BentoDesign/BentoGeneric.component";
import { AccountHeader } from "../../Account/AccountHeader/AccountHeader.component";
import { faRotateLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateTip } from "../../../utils/API/Tips/tips.service";
import { useTipById } from "../../../utils/API/Tips/fetchTips.customHook";

export const EditTip = () => {
  const { plantId: plantIdParam, tipId: tipIdParam } = useParams();
  const plantId = Number(plantIdParam);
  const tipId = Number(tipIdParam);
  const { tip: defaultTip, loading } = useTipById(tipId);
  const navigate = useNavigate();

  const [tip, setTip] = useState({
    id: 0,
    description: "",
    createdAt: "",
    updatedAt: "",
    user: {},
  });

  useEffect(() => {
    if (defaultTip) {
      setTip({
        id: defaultTip.id,
        description: defaultTip.description,
        createdAt: defaultTip.createdAt,
        updatedAt: defaultTip.updatedAt,
        user: defaultTip.user,
      });
    }
  }, [defaultTip]);

  const handleBackClick = () => {
    navigate(`/Tip/${plantId}/TipsList`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTip((prevTip) => ({
      ...prevTip,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedTipData: any = {
        description: tip.description,
      };

      // Utilisation de la fonction editPlant avec les données mises à jour
      await updateTip(
        updatedTipData,
        Number(tip.id) // Assurez-vous que plant.id est un nombre valide
      );

      // Redirection vers une autre page après la mise à jour par exemple
      navigate(`/Tip/${plantId}/TipsList`); // Redirige vers la page principale après la mise à jour
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la plante :", error);
      // Gérer l'erreur ici, par exemple rediriger vers une page d'erreur
      navigate("/error");
    }
  };

  if (loading)
    return (
      <div>
        {" "}
        <span> Récupération du conseil </span>{" "}
      </div>
    );
  if (!tip || tip.id === 0)
    return (
      <div>
        {" "}
        <span> Aucun conseil n'a été trouvée </span>{" "}
      </div>
    );

  return (
    <div className="relative w-full h-screen flex flex-col">
      <BentoGeneric
        childHeader={<AccountHeader />}
        childMain={
          <div className="flex flex-col gap-2 h-full text-center text-sm">
            <h3 className="text-2xl mb-2">
              Modification des informations <br /> du conseil
            </h3>
            <form
              onSubmit={handleSubmit}
              className="editTip flex flex-col rounded-lg border h-full"
            >
              <div className="text-left px-2 w-9/10 flex flex-col text-lg h-full">
                <label htmlFor="description">Description : </label>
                <textarea
                  id="description"
                  name="description"
                  value={tip.description}
                  maxLength={150}
                  onChange={handleChange}
                  className="mt-2.5 mb-4 rounded-2xl p-4 text-main-dark w-full box-border grow"
                />
              </div>
              <div className="flex justify-between w-full my-8">
                <button
                  onClick={handleBackClick}
                  className="btn-back flex-1 p-4 mx-2 text-center"
                >
                  <FontAwesomeIcon icon={faRotateLeft} className="mr-2" />
                  Retour
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1 p-4 mx-2 text-center"
                >
                  <FontAwesomeIcon icon={faSave} className="mr-2" />
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        }
        childRight={undefined}
        isBurgerMenu={true}
        isSVGRequired={false}
      />
    </div>
  );
};
