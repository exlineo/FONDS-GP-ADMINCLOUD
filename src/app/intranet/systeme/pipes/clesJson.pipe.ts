import { Pipe, PipeTransform } from '@angular/core';
/**
 * Fitre des objets. Permet de lister l'ensemble des clés/valeurs d'un objet/tableau
 */
@Pipe({
	name: 'clesJson'
})
export class ClesJsonPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}