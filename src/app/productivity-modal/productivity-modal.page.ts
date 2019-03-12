import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-productivity-modal',
  templateUrl: './productivity-modal.page.html',
  styleUrls: ['./productivity-modal.page.scss'],
})
export class ProductivityModalPage implements OnInit {

  taskString: any;

  dateRegex: any = [/(for)?\s*(today|tomorrow|in a day|in \d+ days|next week|in a week|in \d+ weeks|next month|in a month|in \d+ months|next year|in a year|in \d+ years)/ig, 
    /(for|on)?\s*(next)?\s*(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/ig,
    /(for|on)?\s*(january \d+|february \d+|march \d+|april \d+|may \d+|june \d+|july \d+|august \d+|september \d+|october \d+|november \d+|december \d+)/ig];

  hourRegex: any = [/(at)?\s*((\d+):(\d+)\s*(am|pm))/ig, /(at)?\s*((\d+):(\d+))/ig,
    /(at)?\s*((\d+)\s*(am|pm))/ig, /at\s*(\d+)/ig];

  constructor(public modalController: ModalController, public alertController: AlertController, private storage: Storage ) {
    
   
  }

  ngOnInit() {
  }

  dismiss(){
    this.modalController.dismiss();
  }

  async save(){

    if (this.taskString != undefined){
      var title = this.taskString;
      var date;
      var hour;
  
      for (let i = 0; i < this.dateRegex.length; i++){
        let result = this.taskString.match(this.dateRegex[i]);
        title = title.replace(result, '').trim();
        if (date == undefined && result != null){
          date = result[0];
        }   
      }
  
      for (let i = 0; i < this.hourRegex.length; i++){
        let result = this.taskString.match(this.hourRegex[i]);
        title = title.replace(result, '').trim();
        if (hour == undefined && result != null){
          hour = result[0];
        }
      }
  
      if(date != undefined){
        date = this.stringToDate(date);
      }
      if(date == undefined){
        date = new Date;
      }
    
      if(hour != undefined){
        date = this.stringToTime(hour, date);
      }
  
      title = makeUpper(title);
  
      var task = {
        title: title,
        date: date,
      }
      
      this.modalController.dismiss(task);
    }
    else{
      const alert = await this.alertController.create({
        header: 'Please input the task',
        buttons: [
          {
              text: 'OK'
          }
      ]
      });
      await alert.present();
    }

    function makeUpper(newTitle) {
      return newTitle.replace(/\w\S*/g, function(newTitle2){
          return newTitle2.charAt(0).toUpperCase() + newTitle2.substr(1).toLowerCase();
      });
    }
    
  }


  stringToDate(date){
    var newDate = new Date;
    var result = new Date(newDate.valueOf());

    if(date.match(/today/i)){
      return newDate;
    }

    if(date.match(/tomorrow|in a day/i)){
      result.setDate(result.getDate() + 1);
      newDate = result;
      return newDate;
    }

    if(date.match(/in \d+ days/i)){
      result.setDate(result.getDate() + +date.match(/\d+/));
      newDate = result;
      return newDate;
    }

    if(date.match(/next week|in a week/i)){
      result.setDate(result.getDate() + 7);
      newDate = result;
      return newDate;
    }

    if(date.match(/in \d+ weeks/i)){
      result.setDate(result.getDate() + (+date.match(/\d+/)*7));
      newDate = result;
      return newDate;
    }

    if(date.match(/next month|in a month/i)){
      result.setMonth(result.getMonth() + 1);
      newDate = result;
      return newDate;
    }

    if(date.match(/in \d+ months/i)){
      result.setMonth(result.getMonth() + (+date.match(/\d+/)));
      newDate = result;
      return newDate;
    }

    if(date.match(/next year|in a year/i)){
      result.setFullYear(result.getFullYear() + 1);
      newDate = result;
      return newDate;
    }

    if(date.match(/in \d+ years/i)){
      result.setFullYear(result.getFullYear() + (+date.match(/\d+/)));
      newDate = result;
      return newDate;
    }

    if(date.match(/monday/i)){
      return dayMatch(1);
    }

    if(date.match(/tuesday/i)){
      return dayMatch(2);
    }

    if(date.match(/wednesday/i)){
      return dayMatch(3);
    }

    if(date.match(/thursday/i)){
      return dayMatch(4);
    }

    if(date.match(/friday/i)){
      return dayMatch(5);
    }

    if(date.match(/saturday/i)){
      return dayMatch(6);
    }

    if(date.match(/sunday/i)){
      return dayMatch(7);
    }

    if(date.match(/january \d+/i)){
      return monthMatch(0);
    }
    if(date.match(/february \d+/i)){
      return monthMatch(1);
    }
    if(date.match(/march \d+/i)){
      return monthMatch(2);
    }
    if(date.match(/april \d+/i)){
      return monthMatch(3);
    }
    if(date.match(/may \d+/i)){
      return monthMatch(4);
    }
    if(date.match(/june \d+/i)){
      return monthMatch(5);
    }
    if(date.match(/july \d+/i)){
      return monthMatch(6);
    }
    if(date.match(/august \d+/i)){
      return monthMatch(7);
    }
    if(date.match(/september \d+/i)){
      return monthMatch(8);
    }
    if(date.match(/october \d+/i)){
      return monthMatch(9);
    }
    if(date.match(/november \d+/i)){
      return monthMatch(10);
    }
    if(date.match(/december \d+/i)){
      return monthMatch(11);
    }

    function monthMatch(index) {
      if((+newDate.getMonth() == index && +newDate.getDate() > +date.match(/\d+/)) || +newDate.getMonth() > index){
        newDate.setFullYear(+newDate.getFullYear() + 1);
      }  
      newDate.setMonth(index);
      newDate.setDate(+date.match(/\d+/));
      return newDate;
    } 

    function dayMatch(index) {
      newDate.setDate(newDate.getDate() + (index+(7-newDate.getDay())) % 7);
      return newDate;
    } 

  }

  stringToTime(hour, date){
    
    var hourNum = +(hour.match(/\d+/))
    var minNum = 0;

    if(hour.match(/:/)){
      let copyHour = hour.valueOf();
      copyHour = copyHour.substring(copyHour.match(/:/).index + 1);
      minNum = +(copyHour.match(/\d+/));
    }

    if(hour.match(/pm/)){
      hourNum = hourNum + 12;
    }

    let newDate = new Date;

    if(+newDate.getHours() > hourNum && newDate.getDate() == date.getDate() && newDate.getMonth() == date.getMonth() && newDate.getFullYear() == date.getFullYear()){
      var result = new Date(date.valueOf());
      result.setDate(result.getDate() + 1);
      date = result;
    }


    date.setHours(hourNum,minNum,0,0);

    return date;
  }

}
