import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
declare var require: any;
var events = require('events');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'nodetask';
  myForm!: FormGroup;
  formData: string = '';
  bellring: string = '';

  eventEmitter = new events.EventEmitter();

  myfun = function (username: string, password: string) {
    console.log('Creds: ' + username + ' ' + password);
  };

  myClick = () => {
    alert('Clicked ME!!');
    this.eventEmitter.on('alert', this.anotherAlert);
    this.eventEmitter.emit('alert', 'New Alert Window!');
  };

  anotherAlert = function (data: string) {
    alert(data);
  };

  ngOnInit(): void {
    this.myForm = new FormGroup({
      name: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.name);
    console.log('Password', form.value.password);
    this.eventEmitter.on('Login', this.myfun);
    this.eventEmitter.emit('Login', form.value.name, form.value.password);
  }

  onClick() {
    this.eventEmitter.on('click', this.myClick);
    this.eventEmitter.emit('click');
  }

  bellRingHandler1 = (who: string) => {
    if (who == 'Jason') {
      this.bellring = 'Jason At The Door';
      return;
    }
  };

  bellRingHandler2 = () => {
    console.log('\n');
    console.log('The Bell Ringing..... (Handler 2)');
    this.eventEmitter.addListener('nobodyIsAtHome', this.nobodyIsAtHomeHandler);
    this.eventEmitter.emit('nobodyIsAtHome');
  };

  nobodyIsAtHomeHandler = ()=>  {
    console.log("\n");
    console.log(" Sorry, Nobody is at home now, Please leave your message!")
 }

  onButtonClick() {
    this.eventEmitter.addListener('bellRing', this.bellRingHandler1);
    this.eventEmitter.addListener('bellRing', this.bellRingHandler2);
    this.eventEmitter.emit('bellRing', this.formData);
    
  }
  
}
