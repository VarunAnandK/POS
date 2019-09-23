import { formatDate } from '@angular/common';

export class apphelper {

    public static GetCurrentDate(): string {
      return formatDate(new Date(), 'yyyy-MM-dd', 'en-us');
    }
    public static GetCurrentYear(): string {
      return formatDate(new Date(), 'yyyy', 'en-us');
    }
    public static GetCurrentMonth(): string {
      return formatDate(new Date(), 'MM', 'en-us');
    }
    public static FormatData(Datevalue : Date): string {
      return formatDate(Datevalue, 'yyyy-MM-dd', 'en-us');;
    }
}
