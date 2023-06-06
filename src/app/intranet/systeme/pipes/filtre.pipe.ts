import { Pipe, PipeTransform } from '@angular/core';
import { CloudGetService } from '../services/cloud-get.service';
import { NoticeCloudI } from '../modeles/Types';

@Pipe({
	name: 'filtre'
})
export class FiltrePipe implements PipeTransform {
	public transform(values: any[], filter: any): any[] {
		if (!values || !values.length) return [];
		if (!filter) return values;

		if (typeof(filter)=='string') {
			return values.filter(v => {
				// Filtre sur le titre
				if (v.titre) {
					return v.titre.indexOf(filter) >= 0;
				}
				// Filtre sur la description
				if (v.description) {
					return v.description.indexOf(filter) >= 0;
				}
			});
		}
		if (typeof (filter) == 'number') {
			return values.filter(v => {
				// Filtre sur _id
				if (v._id) {
					return values.find(not => not._id == filter);
				}
			});
		}
	}
}
/* Get media URL */
@Pipe({
	name: 'mediaUrl'
})
export class MediaUrlPipe implements PipeTransform {
  // constructor(private get:CloudGetService){}
	public transform(notice:NoticeCloudI, s3:string): string {
		if (!notice) return 'assets/img/pictos/picto_media.png';
		if (!s3) return 'assets/img/pictos/picto_media.png';

		return s3 + notice.nema.set_name + '/' + notice.idnotices;
	}
}
