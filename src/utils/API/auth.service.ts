import { AuthUser } from "../../Interface/User/user.interface";

const url: string = 'http://localhost:3000';

export const signUp = async (data: AuthUser) => {
    const urlRegister = url + '/auth/signup';

    try {
        const response = await fetch(urlRegister, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        return result

    } catch (error) {
        console.error('Erreur lors de l\'appel API:', error);
        throw error;
    }
};
