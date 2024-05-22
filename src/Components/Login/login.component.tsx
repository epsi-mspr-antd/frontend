import { useNavigate } from 'react-router-dom';
import { BentoGeneric } from '../../BentoDesign/BentoGeneric.component';
import { AuthContext } from '../../Contexte/AuthContext';
import { signIn } from '../../utils/API/auth.service';
import { Header } from '../Header/header.component';
import './login.style.css';

import { useContext, useState } from 'react';

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
            const response = await signIn(formData);
            authContext.updateEmail(formData.email);
            authContext.updateAccessToken(response.data.access_token);
            authContext.updateRefreshToken(response.data.refresh_token);
            navigate('/account'); 
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error.message);
        } 
    };

    return(
        <>
            <BentoGeneric 
                childHeader={<Header/>}
                childMain={
                    <section className='h-full flex flex-col justify-end p-8 text-black'>
                        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                            <label htmlFor="email">Email :</label>
                            <input type="email" name="email" id="email" className='inputLogin' value={formData.email} onChange={handleChange} required />
                            <label htmlFor="password">Mot de passe :</label>
                            <input type="password" name="password" id="password" className='inputLogin' value={formData.password} onChange={handleChange} required />
                            <button type="submit" className="mt-8" id="btn_login_submit">Se connecter</button>
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
