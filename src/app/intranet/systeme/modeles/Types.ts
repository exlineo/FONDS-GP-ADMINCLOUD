import { NemaSerieModel } from "./documents-model";
/** Describe Collections */
export interface CollectionCloudI {
    idcollections?: any;
    title: string;
    alias: string;
    setname:string;
    description: string;
    typecollection: string;
    creator: string;
    funds?:string;
    languages?:any; // Set<string> puis Array<string>
    timecode?:string | number;
    publisher?:string;
    notices:any; // Set<string> puis Array<string>
    series:any; // Set<string> puis Array<string>
    selected?:boolean;
    draft:boolean;
}
/** Describe notices */
export interface NoticeCloudI {
  idnotices?:any;
  date?:any;
  prefix?:Array<string>;
  dc:any;
  nema?:any;
  media?:any;
  selected?:boolean;
}
/** Describe schemas from prefixs */
export class PrefixCloudI {
  id:string;
  prefix:string;
  schema:Array<string>;
  title:string;
}
/** Instatiante new Collection */
export class CollectionCloud implements CollectionCloudI{
  idcollections = '';
    title = '';
    alias = '';
    setname = '';
    description = '';
    typecollection = 'images';
    creator = '';
    language = new Set() as Set<string>;
    notices = new Set() as Set<string>;
    series = new Set() as Set<string>;
    draft:true;
}
