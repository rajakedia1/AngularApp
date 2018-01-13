import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';

import { LEADER } from '../shared/leaders';

@Injectable()
export class LeaderService {

  constructor() { }
    
    getLeader(): Promise<Leader[]>{
        return Promise.resolve(LEADER);
    }
    getFeaturedLeader(): Promise<Leader>{
        return Promise.resolve(LEADER.filter((leader) => (leader.featured))[0]);
    }

}
