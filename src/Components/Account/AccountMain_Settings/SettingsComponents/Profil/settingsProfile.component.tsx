import './settingsProfile.style.css';
import Picture from './../../../../../../Ressources/Pictures/Demo/sulliman.jpg'
import Edit from './../../../../../../Ressources/SVG/setting.svg'
import { useState } from 'react';

export const SettingsProfile = () => {
    let [emailInput, setEmailInput] = useState(true)
    let [pwdInput, setPwdInput] = useState(true)
    let [telInput, setTelInput] = useState(true)

    return (
        <>
            <div>

                <h4 className=' w-full text-center text-4xl '> Profil </h4>

                <div className='flex flex-col items-center mt-2 text-2xl p-2 gap-4'>
                    <h5> {"Jhon"} </h5>
                    <section className='imgProfil overflow-hidden'>
                        <img src={Picture} alt="Picture" />
                    </section>

                    <div className='flex flex-col gap-6 mb-4'>
                        <section className='flex gap-2'>
                            <input className='px-2 rounded-md w-full text-lg' type='text' disabled={pwdInput} placeholder={"Jhon Doe"} />
                            <img src={Edit} alt="" onClick={() => setPwdInput(!pwdInput)} className='w-8' />
                        </section>
                        <section className='flex gap-2'>
                            <input className='rounded-md px-2 w-full text-lg' type="text" disabled={emailInput} placeholder={"jhon.doe@gmail.com"} />
                            <img src={Edit} alt="" onClick={() => setEmailInput(!emailInput)} className='w-8' />
                        </section>
                        <section className='flex gap-2'>
                            <input className='px-2 rounded-md w-full text-lg' type="tel" disabled={telInput} placeholder={"07 86 45 32 14"} />
                            <img src={Edit} alt="" onClick={() => setTelInput(!telInput)} className='w-8' />
                        </section>
                        <section className='flex gap-2'>
                            <input className='px-2 rounded-md w-full text-lg' type='password' disabled={pwdInput} placeholder={"********"} />
                            <img src={Edit} alt="" onClick={() => setPwdInput(!pwdInput)} className='w-8' />
                        </section>
                    </div>
                </div>
            </div>
        </>

    )
}