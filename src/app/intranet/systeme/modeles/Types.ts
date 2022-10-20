import { NemaSerieModel } from "./documents-model";
import { DocumentModel } from "./documents-model";

export interface SetCloudI {
    idsets?:string | number;
    title:string;
    alias:string;
    funds:string;
    origin:{dir:string,url:string};
    description?:string;
    date?:string | number;
    creator?:string;
    manager?:string;
    documents:Array<DocumentModel>;
    prefix:Array<string>;
}
export interface CollectionCloudI {
    idcollections?: any;
    title: string;
    alias: string;
    description: string;
    type: string;
    creator: string;
    funds?:string;
    language?: string;
    date?:string | number;
    group?: Array<string>;
    notices?:Array<string>;
    series?:Array<NemaSerieModel>;
    selected?:boolean;
}
export interface NoticeCloudI {
  idnotices?:any;
  date?:any;
  prefix?:string | Array<string>;
  dublincore:any;
  nemateria:any;
  media:any;
  selected?:boolean;
}
