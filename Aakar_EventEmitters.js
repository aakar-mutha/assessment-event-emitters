// importing eventemitter and fs
const { EventEmitter } = require("events");
var fs = require('fs');

// Basic Emitter
const firstEmitter = new EventEmitter();
firstEmitter.on("FirstEvent", () => {
    console.log("This is my first event from the first event emitter");
});

firstEmitter.emit('FirstEvent');
// Output
// This is my first event from the first event emitter

// ***********************************
// Emitter where we can pass data to 
// the event handler
// ***********************************

const secondEmitter = new EventEmitter();
secondEmitter.on("SecondEvent", (data) => {
    console.log('The entered email id is: ' + data);
})

secondEmitter.emit('SecondEvent', 'aakar@gmail.com');

// Output
//  The entered email id is: aakar@gmail.com


// ***********************************
// Emitter which reads files and 
// throws error if not present.
// ***********************************

const thirdEmitter = new EventEmitter();
thirdEmitter.on('start_read', function () {
    console.log("The read file operation is started.");
    fs.readFile('test.txt', 'utf8', function (err, data) {
        if (err) {
            thirdEmitter.emit('error',err);
        }
        else {
            thirdEmitter.emit('print_content', data);
        }
    });
});

thirdEmitter.on('print_content',function(data){
    console.log("The contents of the file are: ");
    console.log(data);
    thirdEmitter.emit('done');
});

thirdEmitter.on('error',function(type){
    console.log("We faced the following issue while reading from the file. "+type);
    thirdEmitter.emit('done');
});

thirdEmitter.on('done',function(){
    console.log("The read file operation is completed.");
});
thirdEmitter.emit('start_read');

// Output
// CASE 1 : file is NOT found
// The read file operation is started.
// We faced the following issue while reading from the file. undefined
// The read file operation is completed.

// CASE 2 : file is found
// The read file operation is started.
// These are the contents of the test.txt which is read by the event emitter.
// The read file operation is completed.


// ***********************************
// Emitter with remove emitter method.
// ***********************************


var forthEmitter = new EventEmitter();
var event1 = () => {
    console.log("Event 1");
    forthEmitter.removeListener('event', event2);
}

var event2 = () => {
    console.log("Event 2");
}

forthEmitter.addListener('event', event1);
forthEmitter.addListener('event', event2);

forthEmitter.emit('event');
// outputs 
// Event 1
// Event 2

forthEmitter.emit('event');
// outputs 
// Event 1
// We removed the second event from the event emitter and hence
// The event2 function is not called when we emit the event for the second time.

// ***********************************
// By default, 10 event listeners can be attached to an event 
// otherwise it shows a warning message.
// ***********************************
var ev1 = () => { console.log("Event 1"); }
var ev2 = () => { console.log("Event 2"); }
var ev3 = () => { console.log("Event 3"); }
var ev4 = () => { console.log("Event 4"); }
var ev5 = () => { console.log("Event 5"); }
var ev6 = () => { console.log("Event 6"); }
var ev7 = () => { console.log("Event 7"); }
var ev8 = () => { console.log("Event 8"); }
var ev9 = () => { console.log("Event 9"); }
var ev10 = () => { console.log("Event 10"); }
var ev11 = () => { console.log("Event 11"); }

var fifthEmitter = new EventEmitter();
fifthEmitter.addListener('event', ev1);
fifthEmitter.addListener('event', ev2);
fifthEmitter.addListener('event', ev3);
fifthEmitter.addListener('event', ev4);
fifthEmitter.addListener('event', ev5);
fifthEmitter.addListener('event', ev6);
fifthEmitter.addListener('event', ev7);
fifthEmitter.addListener('event', ev8);
fifthEmitter.addListener('event', ev9);
fifthEmitter.addListener('event', ev10);
fifthEmitter.addListener('event', ev11);

var sixthEmitter = new EventEmitter();
sixthEmitter.on('event', ev1);
sixthEmitter.on('event', ev2);
sixthEmitter.on('event', ev3);
sixthEmitter.on('event', ev4);
sixthEmitter.on('event', ev5);
sixthEmitter.on('event', ev6);
sixthEmitter.on('event', ev7);
sixthEmitter.on('event', ev8);
sixthEmitter.on('event', ev9);
sixthEmitter.on('event', ev10);

fifthEmitter.emit('event');
// Output
// Event 1
// Event 2
// Event 3
// Event 4
// Event 5
// Event 6
// Event 7
// Event 8
// Event 9
// Event 10
// Event 11
// MaxListenersExceededWarning

sixthEmitter.emit('event');
// Output
// Event 1
// Event 2
// Event 3
// Event 4
// Event 5
// Event 6
// Event 7
// Event 8
// Event 9
// Event 10

// ***********************************
// We can use the .once property to show the 
//  output only once if the event is emitted again.
// ***********************************

var seventhEmitter = new EventEmitter();
var event10 = () => {
    console.log("Event 10 is only going to be emitter once. \n");
}

seventhEmitter.once('events', event10);
seventhEmitter.emit('events');
// Output
// Event 10 is only going to be emitter once.
seventhEmitter.emit('events');
// Output
//
