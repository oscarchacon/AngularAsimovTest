import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnsusbscribeFunctionsService {

  constructor() { }

  unsubscribeSubscription(subscription: Subscription): void {
    if(subscription && !subscription.closed)
      subscription.unsubscribe();
  }
}
