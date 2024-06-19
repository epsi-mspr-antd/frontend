export interface ErrorAPI {
    success: false,
    message: "Erreur lors de l'appel",
    error: any
}

export interface SuccessResponse {
    success: true,
    message: "Appel réussi",
}

export interface SuccessResponseWithData<T> {
    success: true,
    message: "Appel réussi",
    data: T
}