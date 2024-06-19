import { useNavigate } from 'react-router-dom';
import { BentoGeneric } from '../../BentoDesign/BentoGeneric.component';
import { AuthContext } from '../../Contexte/AuthContext';
import { Header } from '../Header/header.component';
import { signIn } from '../../utils/API/Auth/auth.service';
import './login.style.css';

import { useContext, useState } from 'react';
import { AuthResponse } from '../../Interface/User/user.interface';
import { saveToLocalStorage } from '../../utils/localStorage/localStorage.service';

export const Login = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',       
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();        
        try {
            const response: AuthResponse = await signIn(formData);
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
            throw new Error('Erreur à la connexion')
        } 
    };

    return(
        <>
            <BentoGeneric 
                childHeader={<Header/>}
                childMain={
                    <section className='p-8 text-black h-full'>
                        <div className='flex justify-center flex-col-reverse h-full p-2'>
                            <form className='formLogin p-4 flex flex-col gap-4' onSubmit={handleSubmit}>
                                <label htmlFor="email">Email :</label>
                                <input type="email" name="email" id="email" className='inputLogin p-2' value={formData.email} onChange={handleChange} required />
                                <label htmlFor="password">Mot de passe :</label>
                                <input type="password" name="password" id="password" className='inputLogin p-2' value={formData.password} onChange={handleChange} required />
                                <button type="submit" className="mt-8 btn-primary" id="btn_login_submit">Se connecter</button>
                            </form>
                        </div>
                    </section>
                }
                childRight={undefined}
                isBurgerMenu={true}
                isSVGRequired={true}
            /> 
        </>
    );
};
