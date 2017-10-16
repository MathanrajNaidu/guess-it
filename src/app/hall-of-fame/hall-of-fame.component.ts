import { Component, OnInit } from '@angular/core';
import { LookupService } from 'app/_services';
import { HallOfFame } from 'app/_models/lookup.model';

@Component({
  selector: 'app-hall-of-fame',
  templateUrl: './hall-of-fame.component.html',
  styleUrls: ['./hall-of-fame.component.css']
})
export class HallOfFameComponent implements OnInit {
  hallOfFame: HallOfFame[];
  message: string;

  constructor(private lookupService: LookupService) { }

  ngOnInit() {
    let sub = this.lookupService.getHallOfFame().subscribe(resp=>{
      if(resp.length <= 0) {
        this.message = 'Error Loading';
      } else {
        this.hallOfFame = resp;
      }
    })
  }

}
