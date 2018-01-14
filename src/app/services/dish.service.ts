import { Injectable } from '@angular/core';

import { Dish } from '../shared/dish';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'

import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable()
export class DishService {

  constructor(private http: Http, private processHTTPMsgService: ProcessHttpmsgService) { }
    
    /*
        getDishes(): Promise<Dish[]>{  //it will give instant data if it can be fetched without delay
        return Promise.resolve(DISHES);
        }
        
        // else new is used as shown below
    */
    getDishes(): Observable<Dish[]>{
        return  this.http.get(baseURL  + 'dishes')
            .map(res => { return this.processHTTPMsgService.extractData(res)})
            .catch(error => {return this.processHTTPMsgService.handleError(error)});
        //Observable.of(DISHES).delay(2000);
    }
    getDish(id: number): Observable<Dish>{
        return this.http.get(baseURL  + 'dishes/' + id).map(res => { return this.processHTTPMsgService.extractData(res)}).catch(error => {return this.processHTTPMsgService.handleError(error)});
        //Observable.of(DISHES.filter((dish) => (dish.id === id))[0]).delay( 2000);
    }
    getFeaturedDish(): Observable<Dish>{
        return this.http.get(baseURL  + 'dishes?featured=true').map(res => { return this.processHTTPMsgService.extractData(res)[0]}).catch(error => {return this.processHTTPMsgService.handleError(error)});
        //Observable.of(DISHES.filter((dish) => dish.featured)[0]).delay( 2000);
    }
    
    getDishIds() : Observable<number[]>{
        return this.getDishes()
            .map(dishes => {return dishes.map(dish => dish.id)}).catch(error => {return this.processHTTPMsgService.handleError(error)});
        //this.http.get(baseURL  + 'dishes?featured=true').map(res => { return this.processHTTPMsgService.extractData(res)});
        //Observable.of(DISHES.map(dish => dish.id));
    }
}
