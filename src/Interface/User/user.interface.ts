export interface AuthUser {
    "email": string,
    "password": string
}

export interface AuthResponse {
    data: {
        id: number,
        access_token: string,
        refresh_token: string
    }
}
export interface User {
    id: number;
    email: string;
    pseudo: string;
    roles: string[];
}

export interface UsersList {
    data: User[];
}

export interface AuthContext {
    userID: number,
    accessToken: string,
    refreshToken: string,
    email: string
}
