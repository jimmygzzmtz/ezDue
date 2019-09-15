import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ProductivityModalPage } from '../productivity-modal/productivity-modal.page';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  tasks: any = [];
  delBool: boolean;
  notifBool: boolean;

  public language: string;

  constructor(public navCtrl: NavController, public modalController: ModalController, private storage: Storage, private localNotifications: LocalNotifications, private _translate: TranslateService){
    
    this.storage.get('tasksArr').then((val) => {
      if (val != "[]"){
       this.tasks = JSON.parse(val)
      }
      else{
       this.storage.set('tasksArr', JSON.stringify(this.tasks));
      }
    });

    this.storage.get('deleteBt').then((val) => {
      if (val != undefined){
       this.delBool = !val
      }
      else{
       this.storage.set('deleteBt', true);
      }
    });

    this.storage.get('notifBt').then((val) => {
      if (val != undefined){
       this.notifBool = val
      }
      else{
       this.storage.set('notifBt', false);
      }
    });

  }

  getCards() {
    if (this.tasks != undefined){
 
     var tasks2 = this.tasks;
     tasks2.sort((a: any, b: any) => {
        var aDate = new Date(a.date.valueOf());
        var bDate = new Date(b.date.valueOf());
        return aDate.getTime() - bDate.getTime();
      }); 
      return tasks2;
 
      } 
  }

  ionViewWillEnter(){
    this.language = "" + this._translate.currentLang

    this.storage.get('deleteBt').then((val) => {
      if (val != undefined){
       this.delBool = !val
      }
      else{
       this.storage.set('deleteBt', true);
      }
    });

    this.storage.get('notifBt').then((val) => {
      if (val != undefined){
       this.notifBool = val
      }
      else{
       this.storage.set('notifBt', false);
      }
    });
  }

  removeCard(card) {

    let index = this.tasks.indexOf(card);

        if(index > -1){
            this.tasks.splice(index, 1);
            this.storage.set('tasksArr', JSON.stringify(this.tasks));
        }

  }

  async logProductivity() {
    const modal = await this.modalController.create({
      component: ProductivityModalPage,
      componentProps: { 
      }
    });

    modal.onDidDismiss()
      .then((data) => {
          if (data.data != undefined){
            if (this.tasks == null){
              this.tasks = [];
              this.tasks.push({
                title: data.data.title,
                date: data.data.date
              })
            }
            else{
              this.tasks.push(data.data);
            }
            this.storage.set('tasksArr', JSON.stringify(this.tasks));

            if (this.notifBool == true){
              var d1 = new Date(data.data.date);

              d1.setHours(d1.getHours() - 1);

              var d2 = new Date(data.data.date);

              d2.setDate(d2.getDate() - 1);

              let currentDate = new Date();

              if(d1 > currentDate){
                
                this.localNotifications.schedule({
                  text: data.data.title,
                  trigger: {at: d1}
                });
                
              }

              if(d2 > currentDate){
                
                this.localNotifications.schedule({
                  text: data.data.title,
                  trigger: {at: d2}
                });
                
              }
            }
            
          }
    });

    await modal.present(); 

  }

}
