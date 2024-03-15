import './register.style.css';
import { BentoGeneric } from '../../BentoDesign/BentoGeneric.component';
import { Header } from '../Header/header.component';
import { useState } from 'react';


export const Register = () => {
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        email: '',
        password: '',
        phone: ''
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // TODO
    };

    return(
        <>
            <BentoGeneric 
                childHeader={<Header/>}
                childMain={
                    <section className='sectionRegister h-full flex flex-col justify-end p-8 text-black'>
                        <form className='flex flex-col' onSubmit={handleSubmit}>
                            <label htmlFor="last_name">Nom :</label>
                            <input type="text" name="lastName" id="lastName" className='inputRegister' value={formData.lastName} onChange={handleChange} required />
                            <label htmlFor="first_name">Prénom :</label>
                            <input type="text" name="firstName" id="firstName" className='inputRegister' value={formData.firstName} onChange={handleChange} required />
                            <label htmlFor="email">Email :</label>
                            <input type="email" name="email" id="email" className='inputRegister' value={formData.email} onChange={handleChange} required />
                            <label htmlFor="password">Mot de passe :</label>
                            <input type="password" name="password" id="password" className='inputRegister' value={formData.password} onChange={handleChange} required />
                            <label htmlFor="phone">N° de téléphone :</label>
                            <input type="tel" name="phone" id="phone" className='inputRegister' value={formData.phone} onChange={handleChange} required />
                            <button type="submit" className="btn-primary" id="btn_register_submit">S'enregister</button>
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

// const Register = () => {
//     const [lastName, setLastName] = useState(String)
//         const handleChange = () => {
//             setLastName(String),
//             console.log(lastName)
//         }
