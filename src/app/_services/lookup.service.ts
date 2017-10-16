import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { BaseService } from "app/_services";
import { Observable } from "rxjs/Observable";
import { HallOfFame } from 'app/_models/lookup.model';

@Injectable()
export class LookupService {
  base: BaseService;
  baseUrl: string = 'http://localhost:51260/api'; 

  constructor(public http: Http) {
    this.base = new BaseService(http);  
  }

  getHallOfFame(): Observable< HallOfFame[]> {
    let url = this.baseUrl + '/HallOfFames';
    return this.base.get(false, url).map((resp: HallOfFame[])=> resp);
  }

  postOnHallOfFame(body:HallOfFame) {
    let url = this.baseUrl + '/HallOfFames';
    return this.base.post(false, url, body);
  }

}
