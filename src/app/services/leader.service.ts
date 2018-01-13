import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';

import { LEADER } from '../shared/leaders';

@Injectable()
export class LeaderService {

  constructor() { }
    
    getLeader(): Promise<Leader[]>{
        return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(()=> resolve(LEADER), 2000);
        });
    }
    getFeaturedLeader(): Promise<Leader>{
        return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(()=> resolve(LEADER.filter((leader) => (leader.featured))[0]), 2000);
        });
    }

}
