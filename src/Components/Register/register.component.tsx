import './register.style.css';
import { BentoGeneric } from '../../BentoDesign/BentoGeneric.component';
import { Header } from '../Header/header.component';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import { AuthContext } from '../../Contexte/AuthContext';
import { signUp } from '../../utils/API/Auth/auth.service';
import { AuthResponse } from '../../Interface/User/user.interface';
import { saveToLocalStorage } from '../../utils/localStorage/localStorage.service';

export const Register = () => {
    const authContext = useContext(AuthContext)
    const [formData, setFormData] = useState({
        pseudo: '',
        email: '',
        password: '',
    });

    const [isChecked, setIsChecked] = useState(false)

    const handleChecked = () => {
        setIsChecked(!isChecked)
    }

    const navigate = useNavigate();

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();        
        try {
            const response: AuthResponse = await signUp(formData);
            authContext.updateEmail(formData.email);
            authContext.updateAccessToken(response.data.access_token);
            authContext.updateRefreshToken(response.data.refresh_token);
            authContext.updateUserID(response.data.id);
            saveToLocalStorage('authContext', {
                email: formData.email,
                accessToken: response.data.access_token,
                refreshToken: response.data.refresh_token,
                userID: response.data.id
            });
            navigate('/account'); 
        } catch (error) {
            throw new Error('Erreur lors de l\'inscription')
        } 
    };

    return (
        <>
            <BentoGeneric
                childHeader={<Header />}
                childMain={
                    <section className='sectionRegister flex flex-col justify-center p-8 text-black mt-8'>
                        <form className='flex flex-col gap-2 text-center' onSubmit={handleSubmit}>
                            <label htmlFor="pseudo">Pseudo :</label>
                            <input type="input" name="pseudo" id="pseudo" className='inputRegister' value={formData.pseudo} onChange={handleChange} required />
                            <label htmlFor="email">Email :</label>
                            <input type="email" name="email" id="email" className='inputRegister' value={formData.email} onChange={handleChange} required />
                            <label htmlFor="password">Mot de passe :</label>
                            <input type="password" name="password" id="password" className='inputRegister' value={formData.password} onChange={handleChange} required />
                            <div className='flex'>
                                <input onClick={handleChecked} type="checkbox" name="" id="" />
                                <span>Veuillez accepter <a href='./../CGU/' className='colorLink'>nos conditions générales</a></span>
                            </div>

                            <button disabled={!isChecked} type="submit" className="btn-primary" id="btn_register_submit">S'enregistrer</button>
                        </form>
                    </section>
                }
                childRight={undefined}
                isBurgerMenu={true}
                isSVGRequired={true}
            />
        </>
    );
};
