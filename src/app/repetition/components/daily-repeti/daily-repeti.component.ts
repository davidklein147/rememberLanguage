import { Component, OnInit } from '@angular/core';
import { Lavels, RepetitionData } from 'src/app/inputs/classes/repetitionData';
import { HttpService } from 'src/app/services/http.service';
import { RepeSerService } from '../../repe-ser.service';
import { SingleWord, DailyList } from '../../repeClass';

@Component({
  selector: 'app-daily-repeti',
  templateUrl: './daily-repeti.component.html',
  styleUrls: ['./daily-repeti.component.css']
})
export class DailyRepetiComponent implements OnInit {

  dailyList: DailyList[];
  singleWord: SingleWord;
  displayTranslateWord:boolean;

  constructor(private repeSer: RepeSerService, private http: HttpService) {
    
  }

  ngOnInit(): void {
    this.repeSer.getDailyListFromServer();
    this.repeSer.getDailyList().subscribe(data => {
      this.dailyList = data;
    })
  }
  
  singleWordDisplay():void{
    this.displayTranslateWord =false
    this.singleWord = new SingleWord(this.dailyList[this.repeSer.counter])
  }
  
  setNextRepeDate(score:number){
    var repeDate = new RepetitionData(this.dailyList[this.repeSer.counter].TranslateWordId,this.dailyList[this.repeSer.counter].Type);
    repeDate.setLavel(this.dailyList[this.repeSer.counter].Lavel, score ,new Lavels());
    repeDate.setDateByLavel(new Lavels());
    repeDate.score = score;
    console.log(repeDate);
    this.http.postWithToken("repetition/nextdate", repeDate).subscribe()
    this.repeSer.counter++;
    this.singleWordDisplay()

  }

  next():void{
    this.repeSer.counter++;
    this.singleWordDisplay()
  }

  beck():void{
    this.repeSer.counter--;
    this.singleWordDisplay()
  }


}