import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchTerm: string): any {
    return searchTerm
      ? items.filter(item => item.text.toLowerCase().includes(searchTerm.toLowerCase()))
      : items;
  }

}
