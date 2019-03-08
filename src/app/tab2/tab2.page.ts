import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ProductivityModalPage } from '../productivity-modal/productivity-modal.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  tasks: any = [];
  delBool: boolean;

  constructor(public navCtrl: NavController, public modalController: ModalController, private storage: Storage){
    
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
       this.storage.set('deleteBt', false);
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
    this.storage.get('deleteBt').then((val) => {
      if (val != undefined){
       this.delBool = !val
      }
      else{
       this.storage.set('deleteBt', false);
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
          }
    });

    await modal.present(); 

  }

}
