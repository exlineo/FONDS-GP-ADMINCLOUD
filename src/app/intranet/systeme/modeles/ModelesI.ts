export interface CloudConfigI {
    collections?:string;
    idconfigurations:string;
    notices?:string;
    oaipmh?:string;
    xmp?:string;
    s3?:{idconfigurations:string, url:string};
    schemas?:any;
}
export interface FiltreI {
  _id?: string | number;
  titre: string;
  alias: string;
  prefix?:Array<string>;
  description: string;
  createur?: string;
  date?: string;
  metadonnees?:Array<string>;
}
export interface FiltrePipeI {
  libre:string;
  dateDebut:string;
  dateFin:string;
  type:string;
}
export interface UserI {
  _id: number;
  type: string;
  nom: string;
  prenom:string;
  email: string;
  pass: string;
  created?: number;
  updated?: number;
}
