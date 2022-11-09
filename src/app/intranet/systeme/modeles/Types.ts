import { NemaSerieModel } from "./documents-model";

export interface CollectionCloudI {
    idcollections?: any;
    title: string;
    alias: string;
    set:string;
    description: string;
    type: string;
    creator: string;
    funds?:string;
    language?: string;
    date?:string | number;
    who:string;
    group?: Array<string>;
    notices:Array<string>;
    series:Array<NemaSerieModel>;
    selected?:boolean;
}
export interface NoticeCloudI {
  idnotices?:any;
  date?:any;
  prefix?:Array<string>;
  dublincore:any;
  nemateria?:any;
  media?:any;
  selected?:boolean;
}
