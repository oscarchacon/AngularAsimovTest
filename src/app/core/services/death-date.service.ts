import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { DeathDate } from './death-date';

@Injectable({
  providedIn: 'root'
})
export class DeathDateService {

  private endPoint: string;

  constructor(private base: BaseService) {
    this.endPoint = 'DeathDate';
  }

  getAllDates(year?: number, month?: number): Observable<any> {
    if (year != null && month != null) {
      const params = {
        year,
        month
      };

      return this.base.get(this.endPoint, params);
    }

    return this.base.get(this.endPoint);
  }

  saveNewDate(deathDate: DeathDate): Observable<any> {
    return this.base.post(this.endPoint, deathDate);
  }

  updateDate(deathDate: DeathDate): Observable<any> {
    return this.base.put(`${this.endPoint}/${deathDate.id}`, deathDate);
  }

  deleteDate(deathDate: DeathDate | string): Observable<any> {
    if (typeof deathDate === 'string') {
      return this.base.delete(`${this.endPoint}/${deathDate}`);
    }
    return this.base.delete(`${this.endPoint}/${deathDate.id}`);
  }
}
