import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';

import { LEADER } from '../shared/leaders';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
@Injectable()
export class LeaderService {

  constructor() { }
    
    /* using Promise
    getLeader(): Promise<Leader[]>{
        return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(()=> resolve(LEADER), 2000);
        });
    }
    */
    
    getLeader(): Observable<Leader[]>{
        return Observable.of(LEADER).delay(2000);
    }
    
    getFeaturedLeader(): Observable<Leader>{
        return Observable.of(LEADER.filter((leader) => (leader.featured))[0]).delay(2000);
    }

}
