import { Injectable } from '@angular/core';

import { Leaders } from '../shared/leader';

import { LEADER } from '../shared/leaders';

@Injectable()
export class LeaderService {

  constructor() { }
    
    getLeader(): Leader[]{
        return LEADER;
    }
    getFeaturedLeader(): Leader{
        return LEADER.filter((leader) => (leader.featured))[0];
    }

}
