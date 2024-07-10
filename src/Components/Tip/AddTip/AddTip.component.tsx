import "./AddTip.style.css";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BentoGeneric } from "../../../BentoDesign/BentoGeneric.component";
import { AccountHeader } from "../../Account/AccountHeader/AccountHeader.component";
import { faRotateLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createTip } from "../../../utils/API/Tips/tips.service";
import { CreateTip } from "../../../Interface/Tip/Tip.interface";
import { usePlantById } from "../../../utils/API/Plants/fetchPlantById";

export const AddTip = () => {
  const navigate = useNavigate();
  const { plantId: plantIdParam } = useParams();
  const plantId = Number(plantIdParam);
  const { plant, loading } = usePlantById(plantId);

  const [tip, setTip] = useState<CreateTip>({
    description: "",
    plantId: plantId,
    pic: null,
  });

  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );

  const handleBackClick = () => {
    navigate(`/tip/${plantId}/TipsList`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTip((prevTip) => ({
      ...prevTip,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files !== null ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setTip((prevTip) => ({
          ...prevTip,
          pic: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newTipData: CreateTip = {
        description: tip.description,
        plantId: plantId,
        pic: tip.pic,
      };

      await createTip(newTipData);

      navigate(`/Tip/${plantId}/TipsList`);
    } catch (error) {
      console.error("Erreur lors de la création du conseil :", error);
      navigate("/error");
    }
  };

  if (loading) {
    return (
      <div>
        <span>Récupération de la plante </span>
      </div>
    );
  }

  if (!plant) {
    return (
      <div>
        <span>La plante n'a pas été trouvée</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen flex flex-col">
      <BentoGeneric
        childHeader={<AccountHeader />}
        childMain={
          <div className="flex flex-col gap-2 h-full text-center text-sm">
            <h3 className="text-2xl mb-2">Ajout d'un conseil</h3>
            <form
              onSubmit={handleSubmit}
              className="editTip flex flex-col rounded-lg border h-full overflow-y-auto"
            >
              <div className="text-left px-2 w-9/10 flex flex-col text-lg h-full">
                <label htmlFor="description">Description : </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Veuillez saisir votre nouveau conseil à prodiger à cette plante pour qu'elle puisse s'épanouir à nouveau !"
                  maxLength={150}
                  value={tip.description}
                  onChange={handleChange}
                  className="mt-2.5 mb-4 rounded-2xl p-4 text-main-dark w-full box-border grow"
                />
              </div>

              <div className="text-left px-2 w-9/10 flex flex-col text-lg h-full">
                <label>Télécharger une image de votre plante : </label>
                <input type="file" onChange={handleFileChange} />
                {imagePreview && (
                  <div className="text-left px-2 w-9/10 flex flex-col text-lg h-full">
                    <label>Prévisualisation de votre image : </label>
                    <img
                      src={imagePreview.toString()}
                      alt="Prévisualisation"
                      style={{ maxWidth: "100%", maxHeight: "400px" }}
                    />
                  </div>
                )}
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
