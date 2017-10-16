import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LookupService } from 'app/_services';
import { HallOfFame } from 'app/_models/lookup.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  addSuccessMessage: string;
  form: FormGroup;
  showForm: boolean;
  allSub: Subscription[] = [];
  messageList= [];
  correctMessage: string;
  message: string;
  trialNumber: number;
  guessNumber: number;
  attempt: number = 0;

  constructor(private lookupService: LookupService,
  private fb: FormBuilder) {}

  ngOnInit() {
    this.guessNumber = Math.floor((Math.random() * 99) + 1);
    console.log(this.guessNumber);
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      'name' : ['',[Validators.required]]
    });
  }

  try() {
    if(this.trialNumber >= 100 || this.trialNumber <= 0) {
      return;
    }
    this.attempt++;
    this.correctMessage = '';
    this.message = '';
    if (this.trialNumber === this.guessNumber) {
      this.correctMessage = this.trialNumber + ' is correct answer';
      this.checkHallOfFame();
      return;
    } 
    
    if(this.trialNumber < this.guessNumber ) {
      this.message = this.trialNumber+ ' is incorrect. Try bigger number';
     
    } else if (this.trialNumber > this.guessNumber) {
      this.message = this.trialNumber+ ' is incorrect. Try smaller number';       
    }

    this.messageList.push(this.message);
  }

  checkHallOfFame() {
    let sub = this.lookupService.getHallOfFame().subscribe(resp=>{
      if(!resp || resp.length < 20 ) {
        this.showForm = true;
      }
      debugger;
      if(resp[19] && resp[19].NumberOfAttempts > this.trialNumber) {
        this.showForm = true;
      }


    });

    this.allSub.push(sub);
  }

  submitForm() {
    if(this.form.invalid) {
      return;
    }
    let body: HallOfFame = {
      Name: this.form.controls['name'].value,
      NumberOfAttempts: this.attempt,
      PlayTime: new Date().toISOString()      
    }
    let sub = this.lookupService.postOnHallOfFame(body).subscribe((resp)=>{
      console.log(resp);
      if(!resp|| resp.Name === null) {
        alert('Error saving. Please try again');
      } else {
        this.addSuccessMessage = resp.Name + ' have been added to hall of fame';
      }
    });

    this.allSub.push(sub);
  }

  retry() {
    this.attempt = 0;
    this.trialNumber = 0;
    this.message = '';
    this.correctMessage = '';
    this.messageList = [];
  }

  ngOnDestroy () {
    for (let sub of this.allSub) {
      sub.unsubscribe();
    }
  }
 
 
}
