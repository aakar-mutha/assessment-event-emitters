import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


declare var require: any;
var events = require('events');



@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css'],
})
export class FileuploadComponent implements OnInit {
  eventEmitter = new events.EventEmitter();
  maxListnersBefore: number = 0;
  maxListnmaxListnersAfter:number=0;

  maxListnersBefore1: number = 0;
  maxListnmaxListnersAfter1:number=0;


  myForm!: FormGroup;
  
  constructor() {}

  handler1 = () => {
    console.log('A');
    this.eventEmitter.removeListener('event', this.handler2);
  };

  handler2 = () => {
    console.log('B');
  };

  ngOnInit(): void {
    this.myForm = new FormGroup({
      number: new FormControl()
    });
  }

  onNumberClick() {
    this.eventEmitter.on('event', this.handler1);
    this.eventEmitter.on('event', this.handler2);
    this.eventEmitter.emit('event');
    this.eventEmitter.emit('event');
  }

  getMaxListners() {
    this.eventEmitter.on('test', () => console.log('Test from on'));
    
    this.eventEmitter.once('test', () => {
      console.log('getMaxListeners Before', this.eventEmitter.getMaxListeners());
      this.maxListnersBefore=this.eventEmitter.getMaxListeners();
      
      this.eventEmitter.setMaxListeners(Math.max(this.eventEmitter.getMaxListeners() - 1, 0));
      this.maxListnmaxListnersAfter=this.eventEmitter.getMaxListeners();
      
      console.log('getMaxListeners After', this.eventEmitter.getMaxListeners());
    });

    this.eventEmitter.emit('test');
    this.eventEmitter.emit('test');
  }
  onSubmit(form: FormGroup){
    this.eventEmitter.addListener('test2', () => console.log('Test from on 2'));
    this.eventEmitter.setMaxListeners(form.value.number);
    this.eventEmitter.on('test2', () => {
      
      //console.log('getMaxListeners Before', this.eventEmitter.getMaxListeners());
      this.maxListnersBefore1=this.eventEmitter.getMaxListeners();
      
      this.eventEmitter.setMaxListeners(Math.max(this.eventEmitter.getMaxListeners() - 1, 0));
      this.maxListnmaxListnersAfter1=this.eventEmitter.getMaxListeners();
      
      //console.log('getMaxListeners After', this.eventEmitter.getMaxListeners());
    });

    this.eventEmitter.emit('test2');
    this.eventEmitter.emit('test2');
    this.eventEmitter.emit('test2');
   
    console.log(this.eventEmitter.listeners('test2'));
    console.log(this.eventEmitter.listenerCount('test2'));
    

  }

}
