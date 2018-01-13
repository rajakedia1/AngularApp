import { Injectable } from '@angular/core';

import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';


@Injectable()
export class DishService {

  constructor() { }
    
    /*
        getDishes(): Promise<Dish[]>{  //it will give instant data if it can be fetched without delay
        return Promise.resolve(DISHES);
        }
        
        // else new is used as shown below
    */
    getDishes(): Promise<Dish[]>{
        return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(()=> resolve(DISHES), 2000);
        });
    }
    getDish(id: number): Promise<Dish>{
        return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(()=> resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
        });
    }
    
    getFeaturedDish(): Promise<Dish>{
        return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(()=> resolve(DISHES.filter((dish) => (dish.featured))[0]), 2000);
        });
    }
}
