import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  messageList= [];
  correctMessage: string;
  message: string;
  trialNumber: number;
  guessNumber: number;
  attempt: number = 0;

  ngOnInit() {
    this.guessNumber = Math.floor((Math.random() * 100) + 1);
  }

  try() {
    if(this.trialNumber >= 100 || this.trialNumber <= 0) {
      return;
    }
    this.attempt++;
    this.correctMessage = '';
    this.message = '';
    if (this.trialNumber === this.guessNumber) {
      this.correctMessage = this.trialNumber+ 'is correct answer';

    } else if(this.trialNumber < this.guessNumber ) {
      this.message = this.trialNumber+ ' is incorrect. Try bigger number';
     
    } else if (this.trialNumber > this.guessNumber) {
      this.message = this.trialNumber+ ' is incorrect. Try smaller number';       
    }

    this.messageList.push(this.message);
  }

  retry() {
    this.attempt = 0;
    this.trialNumber = 0;
    this.message = '';
    this.correctMessage = '';
    this.messageList = [];
  }
 

}
