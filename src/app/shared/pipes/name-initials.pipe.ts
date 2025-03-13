import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameInitials',
  standalone: true
})
export class NameInitialsPipe implements PipeTransform {

  transform(name: string, ...args: unknown[]): string {
    if(name) {
      let parts = name.split(' ');
      let initials = '';
      for (var i = 0; i < parts.length; i++) {
        if (parts[i].length > 0 && parts[i] !== '') {
          initials += parts[i][0];
        }
      }
      return initials;
    }
    return name;
  }

}
