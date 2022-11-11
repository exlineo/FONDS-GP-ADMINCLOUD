import { NemaSerieModel } from "./documents-model";

export interface CollectionCloudI {
    idcollections?: any;
    title: string;
    alias: string;
    setname:string;
    description: string;
    mediatype: string;
    creator: string;
    funds?:string;
    lang?: string;
    timecode?:string | number;
    publisher?:string;
    notices:Array<string>;
    series:Array<string>;
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
export class CollectionCloud implements CollectionCloudI{
  idcollections = '';
    title = '';
    alias = '';
    setname = '';
    description = '';
    mediatype = 'images';
    creator = '';
    lang = 'fr_FR';
    notices = [];
    series = [];
}
