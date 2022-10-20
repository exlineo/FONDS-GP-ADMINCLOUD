import { NemaSerieModel } from "./documents-model";
import { DocumentModel } from "./documents-model";

export interface SetI {
    _id?:string | number;
    titre:string;
    alias:string;
    fonds:string;
    origine:{dir:string,url:string};
    description?:string;
    date?:string | number;
    createur?:string;
    gestionnaire?:string;
    documents:Array<DocumentModel>;
    prefix:Array<string>;
}
export interface CollectionI {
    _id?: any;
    titre: string;
    alias: string;
    description: string;
    type: string;
    createur: string;
    fonds?:string;
    langue?: string;
    date?:string | number;
    groupe?: Array<string>;
    notices?:Array<string>;
    series?:Array<NemaSerieModel>;
    selected?:boolean;
}
export interface NoticeI {
  _id?:any;
  date?:any;
  prefix?:string | Array<string>;
  metadonnees:any;
  selected?:boolean;
}
