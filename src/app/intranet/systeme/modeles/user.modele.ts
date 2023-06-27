export interface UserModelI {
    _id: number;
    type: string;
    nom: string;
    prenom:string;
    email: string;
    pass: string;
    created?: number;
    updated?: number;
}
