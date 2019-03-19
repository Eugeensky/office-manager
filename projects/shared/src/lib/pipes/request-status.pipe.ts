import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requestStatus'
})
export class RequestStatusPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    switch (value) {
      case 0: {
        return 'Opened';
      }
      case 1: {
        return 'Accepted';
      }
      case 2: {
        return 'Rejected';
      }
      case 3: {
        return 'Done';
      }
      case 4: {
        return 'Closed';
      }
      default: {
        return 'Unknown';
      }
    }
  }

}
