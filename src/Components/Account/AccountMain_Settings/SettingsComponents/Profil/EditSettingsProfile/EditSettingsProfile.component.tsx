import "./EditSettingsProfile.style.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { BentoGeneric } from "../../../../../../BentoDesign/BentoGeneric.component";
import { AccountHeader } from "../../../../AccountHeader/AccountHeader.component";
import { User } from "../../../../../../Interface/User/user.interface";
import { updateUser } from "../../../../../../utils/API/User/user.service";

export const EditSettingsProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user: User = location.state;

  console.log("location.state" + location.state);

  const [formState, setFormState] = useState({
    id: user.id,
    pseudo: user.pseudo,
    email: user.email,
    // password: user.password,
  });

  const handleBackClick = () => {
    navigate(`/account/settings`);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const user = {
      ...formState,
      pseudo: String(formState.pseudo),
      email: String(formState.email),
      // password: String(formState.password),
    };

    await updateUser(user.id);
    navigate("/account/properties");
  };

  return (
    <div className="relative w-full h-screen flex flex-col">
      <BentoGeneric
        childHeader={<AccountHeader />}
        childMain={
          <div className="flex flex-col gap-2 h-full text-center text-sm">
            <h3 className="text-2xl mb-2">Modifcation de votre profil</h3>
            <div className="editUser justify-end">
              <form
                onSubmit={handleSubmit}
                className="inputEditUser flex flex-col"
              >
                <div className="inputEditForm">
                  <div className="form-group">
                    <label htmlFor="name">Pseudo : </label>
                    <input
                      type="text"
                      id="pseudo"
                      name="pseudo"
                      value={user.pseudo}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Email : </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                    />
                  </div>
                  {/* <div className="form-group">
                    <label htmlFor="name">Mot de passe : </label>
                    <input
                      type="text"
                      id="password"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                    />
                  </div> */}

                  <div className="flex justify-between w-full mt-8">
                    <button
                      onClick={handleBackClick}
                      className="btn-back flex-1 p-4 mx-2 text-center"
                    >
                      <FontAwesomeIcon icon={faRotateLeft} className="mr-2" />
                      Retour
                    </button>
                    <button
                      type="submit"
                      className="btn-primary p-4 mx-2 text-center"
                    >
                      <FontAwesomeIcon icon={faSave} className="mr-2" />
                      Enregistrer
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        }
        childRight={undefined}
        isBurgerMenu={true}
        isSVGRequired={false}
      />
    </div>
  );
};
