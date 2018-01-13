import { Injectable } from '@angular/core';

import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

@Injectable()
export class DishService {

  constructor() { }
    
    /*
        getDishes(): Promise<Dish[]>{  //it will give instant data if it can be fetched without delay
        return Promise.resolve(DISHES);
        }
        
        // else new is used as shown below
    */
    getDishes(): Observable<Dish[]>{
        return  Observable.of(DISHES).delay(2000);
    }
    getDish(id: number): Observable<Dish>{
        return Observable.of(DISHES.filter((dish) => (dish.id === id))[0]).delay( 2000);
    }
    getFeaturedDish(): Observable<Dish>{
        return Observable.of(DISHES.filter((dish) => dish.featured)[0]).delay( 2000);
    }
}
