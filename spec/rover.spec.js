const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  // Write code here!
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(100);
    expect(rover.position).toEqual(100);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });
  it("repsonse returned by receiveMessage contains the name of the message", function() {
    let rover = new Rover(100);
    let message = new Message('Message test', []);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual('Message test');
  });
  it("repsonse returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let rover = new Rover(100);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')]; 
    let message = new Message('Message test', commands);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(2);
  });
  it("responds correctly to the status check command", function() { 
    let rover = new Rover(100);
    let command = new Command('STATUS_CHECK');
    let message = new Message('Message test', [command]);
    let response = rover.receiveMessage(message);
    expect(response.results[0].roverStatus.position).toEqual(100);
    expect(response.results[0].roverStatus.mode).toEqual('NORMAL');
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
  });
  it("responds correctly to the mode change command", function() {
    let rover = new Rover(100);
    let command = new Command('MODE_CHANGE', 'LOW_POWER');
    let message = new Message('Message test', [command]);
    let response = rover.receiveMessage(message);
    expect(rover.mode).toEqual('LOW_POWER');
    expect(response.results[0].completed).toBe(true);
  });
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let rover = new Rover(100);
    rover.mode = 'LOW_POWER';
    let command = new Command('MOVE', 300);
    let message = new Message('Message test', [command]);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(false);
    expect(rover.position).toEqual(100);
  });
  it("responds with the postion for the move command", function() {
    let rover = new Rover(100);
    let command = new Command('MOVE', 300);
    let message = new Message('Message test', [command]);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);
    expect(rover.position).toEqual(300);
  });

});
