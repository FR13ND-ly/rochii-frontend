import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumByField',
  standalone: true,
})
export class SumByFieldPipe implements PipeTransform {
  transform(array: any, field: string): any[] {
    return array.reduce((sum: any, obj: any) => sum + (obj[field] || 0), 0);
  }
}
