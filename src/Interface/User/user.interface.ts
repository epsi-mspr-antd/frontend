export interface AuthUser {
    "email": string,
    "password": string
}

export interface AuthResponse {
    data: {
        access_token: string,
        refresh_token: string
    }
}
export interface User {
    id: number;
    email: string;
    roles: string[];
}

export interface UsersList {
    data: User[];
}

